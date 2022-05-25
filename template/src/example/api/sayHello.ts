import { toUtf8 } from "@cosmjs/encoding";
import {MsgExecuteContractEncodeObject} from "@cosmjs/cosmwasm-stargate";
import {MsgExecuteContract} from "@cosmjs/cosmwasm-stargate/build/codec/cosmwasm/wasm/v1beta1/tx";
import {defaultBech32Config, detectKeplr, getKeplrSigner, Keplr} from "../signers/keplr/keplr";
import {CHAIN_ID, CHAIN_NAME, COIN_NAME, CONTRACT_ADDRESS, REST_ENDPOINT, RPC_ENDPOINT, STAKING_DENOM} from "../config";

const initKeplr = async (keplr: Keplr) => {
  try {
    await keplr.enable(CHAIN_ID);
  } catch (e) {
    // propose the chain for testing
    await keplr.experimentalSuggestChain({
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
    });
  }
};

export const sayHello = async (greeting: string): Promise<void> => {

  const [keplr] = detectKeplr();
  if (keplr === undefined) {
    throw new Error("Keplr not present in system");
  }

  // TODO: init on click connect wallet button
  initKeplr(keplr);

  const { SigningCosmWasmClient } = await import("@cosmjs/cosmwasm-stargate");

  // const { SigningCosmWasmClient, isDeli } = await import("@cosmjs/cosmwasm-stargate");
  const [signer] = await getKeplrSigner(keplr);
  const client = await SigningCosmWasmClient.connectWithSigner(
    RPC_ENDPOINT,
    signer
  );

  const key = await keplr.getKey(CHAIN_ID);
  const address = key.bech32Address;

  try {
    // const resp = await client.execute(nativeAddress, RECONCILIATION_CONTRACT);
    const executeContractMsg: MsgExecuteContractEncodeObject = {
      typeUrl: "/cosmwasm.wasm.v1beta1.MsgExecuteContract",
      value: MsgExecuteContract.fromPartial({
        sender: address,
        contract: CONTRACT_ADDRESS,
        msg: toUtf8(
          JSON.stringify({
            say_hello: { greeting },
          })
        ),
        funds: [],
      }),
    };
    const result = await client.signAndBroadcast(
      address,
      [executeContractMsg],
      {
        amount: [],
        gas: "330000",
      }
    );

    // TODO: handle result!

    // const { isBroadcastTxFailure } = await import(
    //   "@cosmjs/stargate/build/stargateclient"
    //   );
    //
    // if (isBroadcastTxFailure(result)) {
    //   console.warn(
    //     `Reconciliation Submit Failure: ${result.code} ${result.transactionHash}`
    //   );
    //
    //   throw new Error("Failed to submit contract registration");
    // }
  } catch (e) {
    throw e;
  }
}
