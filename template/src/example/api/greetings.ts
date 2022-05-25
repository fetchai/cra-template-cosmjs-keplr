import {SigningCosmWasmClient} from "@cosmjs/cosmwasm-stargate";
import {CONTRACT_ADDRESS} from "../config";
import {execContract} from "./exec";
import {WalletState} from "../hooks/keplr";

export async function sayHello(wallet: WalletState, client: SigningCosmWasmClient | undefined, greeting: string): Promise<void> {
  if (!wallet.connected) {
    throw new Error("wallet is not connected");
  }

  if (typeof client === "undefined") {
    throw new Error("no cosmwasm client provided");
  }

  try {
    await execContract({
      client,
      signer: wallet.signer!,
      sender: wallet.address!,
      contract: CONTRACT_ADDRESS,
      request: {
        say_hello: {greeting},
      },
    });
  } catch (error) {
    throw error;
  }
}


