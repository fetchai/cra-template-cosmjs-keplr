import {MsgExecuteContractEncodeObject, SigningCosmWasmClient} from "@cosmjs/cosmwasm-stargate";
import {OfflineSigner} from "@cosmjs/proto-signing";
import {MsgExecuteContract} from "@cosmjs/cosmwasm-stargate/build/codec/cosmwasm/wasm/v1beta1/tx";
import {toUtf8} from "@cosmjs/encoding";

export interface ExecContractArgs {
  client: SigningCosmWasmClient;
  signer: OfflineSigner;
  contract: string;
  sender: string;
  // TODO: tighter typing.
  request: any;
}

export async function execContract({client, contract, sender, request}: ExecContractArgs) {
  try {
    // const resp = await client.execute(nativeAddress, RECONCILIATION_CONTRACT);
    const executeContractMsg: MsgExecuteContractEncodeObject = {
      typeUrl: "/cosmwasm.wasm.v1beta1.MsgExecuteContract",
      value: MsgExecuteContract.fromPartial({
        sender,
        contract,
        msg: toUtf8(
          JSON.stringify(request)
        ),
        funds: [],
      }),
    };
    const result = await client.signAndBroadcast(
      sender,
      [executeContractMsg],
      {
        amount: [],
        gas: "330000",
      }
    );

    // TODO: handle result!

    // const { isBroadcastTxFailure } = await import(
    //   "@cosmjs.ts/stargate/build/stargateclient"
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
