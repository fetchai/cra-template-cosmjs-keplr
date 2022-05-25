import { OfflineSigner } from "@cosmjs/proto-signing";
import { OfflineDirectSigner } from "@cosmjs/proto-signing/build/signer";
import {
  AccountData,
  AminoSignResponse,
  OfflineAminoSigner,
  StdSignDoc,
} from "@cosmjs/amino";
import { CHAIN_ID } from "../../config";

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

export interface Bech32Config {
  readonly bech32PrefixAccAddr: string;
  readonly bech32PrefixAccPub: string;
  readonly bech32PrefixValAddr: string;
  readonly bech32PrefixValPub: string;
  readonly bech32PrefixConsAddr: string;
  readonly bech32PrefixConsPub: string;
}

export interface Currency {
  readonly coinDenom: string;
  readonly coinMinimalDenom: string;
  readonly coinDecimals: number;
  readonly coinGeckoId?: string;
  readonly coinImageUrl?: string;
}

export interface BIP44 {
  readonly coinType: number;
}

export interface ChainInfo {
  readonly rpc: string;
  readonly rest: string;
  readonly chainId: string;
  readonly chainName: string;
  readonly stakeCurrency: Currency;
  readonly walletUrl?: string;
  readonly walletUrlForStaking?: string;
  readonly bip44: BIP44;
  readonly alternativeBIP44s?: BIP44[];
  readonly bech32Config: Bech32Config;
  readonly currencies: Currency[];
  readonly feeCurrencies: Currency[];
  readonly coinType?: number;
  readonly gasPriceStep?: {
    low: number;
    average: number;
    high: number;
  };
  readonly features?: string[];
  readonly beta?: boolean;
}

export interface Key {
  readonly name: string;
  readonly algo: string;
  readonly pubKey: Uint8Array;
  readonly address: Uint8Array;
  readonly bech32Address: string;
  readonly isNanoLedger?: boolean;
}

export interface Keplr {
  readonly version: string;

  enable(chainId: string): Promise<void>;

  experimentalSuggestChain(config: ChainInfo): Promise<void>;

  getKey(chainId: string): Promise<Key>;

  getOfflineSigner(chainId: string): OfflineSigner & OfflineDirectSigner;
  getOfflineSignerOnlyAmino?: (chainId: string) => OfflineSigner;
}

export type KeplrVersion = "fetch" | "keplr" | "fetch-legacy" | "unknown";

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
    throw new Error("Unknown keplr version, unable to generate signer");
  }

  return [signer, aminoOnly];
}
