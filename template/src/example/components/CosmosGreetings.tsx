import {Greeting, useGreetings} from "../hooks/contract";
import React, {useContext} from "react";
import TippableGreeting from "./TippableGreeting";
import {NetworkContext} from "../hooks/context";

export interface GreetingsProps {
  context: React.Context<NetworkContext>;
}

const CosmosGreetings: React.FC<GreetingsProps> = ({context}) => {
  const {cwClient} = useContext<NetworkContext>(context);
  const greetings = useGreetings(cwClient);

  return <div className="flex flex-col items-center">
    <label className="font-semibold mb-2">Greetings from the <span className="text-blue-500">Cosmos</span>:</label>
    <div className="flex flex-col items-center space-y-4">
      {greetings.map(([addr, greeting]: Greeting) => {
        const addrString = new TextDecoder().decode(new Uint8Array(addr));
        return <TippableGreeting key={addrString} context={context} address={addrString} greeting={greeting}/>
      })}
    </div>
  </div>
}
export default CosmosGreetings;
