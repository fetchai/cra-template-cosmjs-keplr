type ChainConfig = {
  chainId: string;
  chainName: string;
  rpcEndpoint: string;
  restEndpoint: string;
  contractAddress: string;
  coinName: string;
  stakingDenom: string;
};

// TODO: allow overrides
const CHAIN_CONFIG: ChainConfig = {
  chainId: "localnet",
  chainName: "LocalNet",
  coinName: "TESTFET",
  rpcEndpoint: "http://127.0.0.1:26657",
  restEndpoint: "http://127.0.0.1:1317",
  contractAddress: "fetch1qxxlalvsdjd07p07y3rc5fu6ll8k4tmetpha8n",
  stakingDenom: "atestfet",
};

export const CHAIN_ID = CHAIN_CONFIG.chainId;
export const CHAIN_NAME = CHAIN_CONFIG.chainName;
export const RPC_ENDPOINT = CHAIN_CONFIG.rpcEndpoint;
export const REST_ENDPOINT = CHAIN_CONFIG.restEndpoint;
export const CONTRACT_ADDRESS = CHAIN_CONFIG.contractAddress;
export const COIN_NAME = CHAIN_CONFIG.coinName;
export const STAKING_DENOM = CHAIN_CONFIG.stakingDenom;
