import {OfflineSigner} from "@cosmjs/proto-signing";
import {OfflineDirectSigner} from "@cosmjs/proto-signing/build/signer";

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
