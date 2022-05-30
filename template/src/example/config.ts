import {defaultBech32Config} from "./signers/keplr/keplr";

type ChainConfig = {
  chainId: string;
  chainName: string;
  rpcEndpoint: string;
  restEndpoint: string;
  contractAddress: string;
  coinName: string;
  stakingDenom: string;
  faucetUrl: string;
  gasPrice: string;
};

// TODO: allow overrides
const CHAIN_CONFIG: ChainConfig = {
  chainId: "localnet",
  chainName: "LocalNet",
  coinName: "TESTFET",
  rpcEndpoint: "http://127.0.0.1:26657",
  restEndpoint: "http://127.0.0.1:1317",
  contractAddress: "fetch1km2yj8eqwetxua05uy9yxaa45x6skzsg65hjfyp3ummwe6sx840qlr4jeu",
  stakingDenom: "atestfet",
  faucetUrl: "https://faucet-dorado.t-v3-london.fetch-ai.com/api/v3/claims",
  gasPrice: "5000000000",
};

export const POLLING_INTERVAL_MS = 3000;
export const CHAIN_ID = CHAIN_CONFIG.chainId;
export const CHAIN_NAME = CHAIN_CONFIG.chainName;
export const RPC_ENDPOINT = CHAIN_CONFIG.rpcEndpoint;
export const REST_ENDPOINT = CHAIN_CONFIG.restEndpoint;
export const CONTRACT_ADDRESS = CHAIN_CONFIG.contractAddress;
export const COIN_NAME = CHAIN_CONFIG.coinName;
export const STAKING_DENOM = CHAIN_CONFIG.stakingDenom;
export const FAUCET_URL = CHAIN_CONFIG.faucetUrl;
export const GAS_PRICE = CHAIN_CONFIG.gasPrice;

export const KEPLR_CHAIN_CONFIG = {
  alternativeBIP44s: [],
  bech32Config: defaultBech32Config("fetch"),
  beta: false,
  bip44: {
    coinType: 118,
  },
  chainId: CHAIN_ID,
  chainName: CHAIN_NAME,
  coinType: 118,
  currencies: [
    {
      coinDenom: COIN_NAME,
      coinMinimalDenom: STAKING_DENOM,
      coinDecimals: 18,
    },
  ],
  features: [],
  feeCurrencies: [
    {
      coinDenom: COIN_NAME,
      coinMinimalDenom: STAKING_DENOM,
      coinDecimals: 18,
    },
  ],
  gasPriceStep: {
    low: 0,
    average: 5000000000,
    high: 6250000000,
  },
  rest: REST_ENDPOINT,
  rpc: RPC_ENDPOINT,
  stakeCurrency: {
    coinDenom: COIN_NAME,
    coinMinimalDenom: STAKING_DENOM,
    coinDecimals: 18,
    coinGeckoId: "fetch-ai",
  },
};
