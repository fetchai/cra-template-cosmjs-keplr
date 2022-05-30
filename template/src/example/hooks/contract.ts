import {CosmWasmClient} from "@cosmjs/cosmwasm-stargate";
import {useEffect, useState} from "react";
import {CONTRACT_ADDRESS, POLLING_INTERVAL_MS, RPC_ENDPOINT} from "../config";

const getGreetingsQuery = {"get_greetings": {}};
// TODO: move
export type Greeting = [[44], string];

export function useGreetings(client?: CosmWasmClient): Greeting[] {
  const [greetings, setGreetings] = useState<Greeting[]>([]);
  const [_client, setClient] = useState<CosmWasmClient | undefined>(client);

  useEffect(() => {
    if (typeof _client === "undefined") {
      CosmWasmClient.connect(RPC_ENDPOINT).then(setClient);
      return // skip query if we know we already need to re-render.
    }

    const update = () => {
      _client!.queryContractSmart(CONTRACT_ADDRESS, getGreetingsQuery)
        .then((res) => {
          setGreetings(res.greetings);
        })
        .catch((error) => {
          throw error
        });
    }

    const intervalId = setInterval(update, POLLING_INTERVAL_MS);
    update();

    // Clear interval on unmount.
    return () => clearInterval(intervalId);
  }, [_client]);

  return greetings;
}
