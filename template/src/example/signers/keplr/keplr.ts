import {OfflineSigner} from "@cosmjs/proto-signing";
import {AccountData, AminoSignResponse, OfflineAminoSigner, StdSignDoc,} from "@cosmjs/amino";
import {
  CHAIN_ID,
  CHAIN_NAME,
  COIN_NAME,
  KEPLR_CHAIN_CONFIG,
  REST_ENDPOINT,
  RPC_ENDPOINT,
  STAKING_DENOM
} from "../../config";
import {Bech32Config, Keplr, KeplrVersion, Key} from "./types";

export function defaultBech32Config(
  mainPrefix: string,
  validatorPrefix: string = "val",
  consensusPrefix: string = "cons",
  publicPrefix: string = "pub",
  operatorPrefix: string = "oper"
): Bech32Config {
  return {
    bech32PrefixAccAddr: mainPrefix,
    bech32PrefixAccPub: mainPrefix + publicPrefix,
    bech32PrefixValAddr: mainPrefix + validatorPrefix + operatorPrefix,
    bech32PrefixValPub:
      mainPrefix + validatorPrefix + operatorPrefix + publicPrefix,
    bech32PrefixConsAddr: mainPrefix + validatorPrefix + consensusPrefix,
    bech32PrefixConsPub:
      mainPrefix + validatorPrefix + consensusPrefix + publicPrefix,
  };
}

export function detectKeplr(): [Keplr | undefined, KeplrVersion] {
  // if (process.browser) {
    // @ts-ignore
    if (typeof window.keplr !== "undefined") {
      // @ts-ignore
      const keplr: Keplr = window.keplr;

      let version: KeplrVersion = "unknown";
      if (keplr.version.startsWith("0.8") || keplr.version.startsWith("0.9")) {
        version = "keplr";
      } else if (keplr.version.startsWith("0.2")) {
        version = "fetch";
      } else if (keplr.version.startsWith("0.1")) {
        version = "fetch-legacy";
      }

      return [keplr, version];
    }
  // }

  return [undefined, "unknown"];
}

class KeplrSignerAdapter implements OfflineAminoSigner {
  private signer: OfflineAminoSigner;

  constructor(signer: any) {
    this.signer = signer;
  }

  getAccounts(): Promise<readonly AccountData[]> {
    return this.signer.getAccounts();
  }

  signAmino(
    signerAddress: string,
    signDoc: StdSignDoc
  ): Promise<AminoSignResponse> {
    return this.signer.signAmino(signerAddress, signDoc);
  }
}

export async function getKeplrSigner(
  keplr: Keplr
): Promise<[OfflineSigner, boolean]> {
  const key = await keplr.getKey(CHAIN_ID);
  let aminoOnly = false;
  let signer: OfflineSigner | undefined;
  if (
    key.isNanoLedger !== undefined &&
    keplr.getOfflineSignerOnlyAmino !== undefined
  ) {
    if (key.isNanoLedger) {
      signer = keplr.getOfflineSignerOnlyAmino(CHAIN_ID);
      aminoOnly = true;
    } else {
      signer = keplr.getOfflineSigner(CHAIN_ID);
    }
  } else {
    // force the signer to be amino
    signer = new KeplrSignerAdapter(keplr.getOfflineSigner(CHAIN_ID));
    aminoOnly = true;
  }

  if (signer === undefined) {
    throw new Error("Unknown keplr.ts version, unable to generate signer");
  }

  return [signer, aminoOnly];
}

// TODO: refactor
export async function initKeplr(shouldSuggestChain?: boolean): Promise<Keplr> {
  const [keplr] = detectKeplr();
  if (keplr === undefined) {
    throw new Error("Keplr not present in system");
  }

  try {
    await keplr.enable(CHAIN_ID);
  } catch (error) {
    if (!shouldSuggestChain) {
      throw error;
    }

    // propose the chain for approval
    await keplr.experimentalSuggestChain(KEPLR_CHAIN_CONFIG);
  }

  return keplr;
}
