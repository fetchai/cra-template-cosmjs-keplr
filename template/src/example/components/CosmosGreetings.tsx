import {Greeting, useGreetings} from "../hooks/contract";
import React from "react";
import {CosmWasmClient} from "@cosmjs/cosmwasm-stargate";
import TippableGreeting from "./TippableGreeting";
import {Coin, SigningStargateClient} from "@cosmjs/stargate";
import {WalletState} from "../hooks/keplr";

export interface GreetingsProps {
  cwClient?: CosmWasmClient;
  sgClient?: SigningStargateClient;
  wallet?: WalletState;
  balance: Coin;
}

const CosmosGreetings: React.FC<GreetingsProps> = ({wallet, sgClient, cwClient, balance}) => {
  const greetings = useGreetings(cwClient);

  return <div className="flex flex-col items-center">
    <label className="font-semibold mb-2">Greetings from the <span className="text-blue-500">Cosmos</span>:</label>
    <div className="flex flex-col items-center space-y-4">
      {greetings.map(([addr, greeting]: Greeting) => {
        const _addr = new TextDecoder().decode(new Uint8Array(addr));
        return <TippableGreeting key={_addr} address={_addr} greeting={greeting} wallet={wallet} sgClient={sgClient} balance={balance}/>
      })}
    </div>
  </div>
}
export default CosmosGreetings;
