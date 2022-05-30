import {Coin, GasPrice, SigningStargateClient, StargateClient} from "@cosmjs/stargate";
import {useCallback, useEffect, useState} from "react";
import {FAUCET_URL, GAS_PRICE, POLLING_INTERVAL_MS, RPC_ENDPOINT, STAKING_DENOM} from "../config";
import {OfflineSigner} from "@cosmjs/proto-signing";
import {SigningCosmWasmClient} from "@cosmjs/cosmwasm-stargate";

export function useSigningClient(signer?: OfflineSigner): SigningCosmWasmClient |
  undefined {
  const [client, setClient] = useState<SigningCosmWasmClient>();

  useEffect(() => {
    if (typeof signer === "undefined") {
      return undefined;
    }

    SigningCosmWasmClient
      .connectWithSigner(RPC_ENDPOINT, signer)
      .then(setClient);
  }, [signer]);

  return client;
}

export function useBalance(address?: string, client?: StargateClient): Coin {
  const [balance, setBalance] = useState<Coin>({amount: "", denom: STAKING_DENOM});

  useEffect(() => {
    if (typeof address === "undefined" || address === "") {
      return;
    }

    if (typeof client === "undefined") {
      return;
    }

    const update = () => {
      client.getBalance(address, STAKING_DENOM)
        .then(setBalance)
        .catch((error) => {
          throw error;
        });
    }
    const intervalId = setInterval(update, POLLING_INTERVAL_MS);
    update();

    // Clear interval on unmount.
    return () => clearInterval(intervalId);
  }, [address, client]);

  return balance;
}

export function useSigningStargateClient(signer?: OfflineSigner): SigningStargateClient | undefined {
  const [client, setClient] = useState<SigningStargateClient>();

  useEffect(() => {
    if (typeof signer === "undefined") {
      return
    }

    const gasPrice = GasPrice.fromString(GAS_PRICE + STAKING_DENOM);
    SigningStargateClient.connectWithSigner(RPC_ENDPOINT, signer, {gasPrice}).then(setClient);
  }, [setClient, signer]);

  return client;
}

export function useFaucet() {
  return useCallback((address: string = "") => {
    if (address === "") {
      return; // skip fetch
    }

    fetch(FAUCET_URL, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      mode: "no-cors",
      body: JSON.stringify({address}),
    }).then((res: Response) => {
      // TODO: handle failure
    });
  }, []);
}
