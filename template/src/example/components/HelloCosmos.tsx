import React, {SyntheticEvent, useCallback, useEffect, useState} from "react";
import {sayHello} from "../api/greetings";
import Button from "./Button";
import Input from "./Input";
import Link from "./Link";
import CosmosGreetings from "./CosmosGreetings";
import {defaultNetworkContext, NetworkContext, useNetworkContext, useValidation} from "../hooks/context";
import {formatCoin} from "../utils";

const networkContext = React.createContext<NetworkContext>(defaultNetworkContext);

export const HelloCosmos: React.FC<{}> = () => {
  const [message, setMessage] = useState<string>("");
  const [networkContextValue, connectKeplr] = useNetworkContext();
  const {placeholder, isSubmitDisabled, isInputDisabled} = useValidation(networkContextValue);
  const {wallet, cwClient, balance} = networkContextValue;

  // TODO: refactor
  const _sayHello = useCallback(async () => {
    // TODO: confirmation
    if (typeof wallet === "undefined") {
      return;
    }
    await sayHello(wallet, cwClient, message);
  }, [wallet, cwClient, message])

  const _setMessage = useCallback((event: SyntheticEvent): void => {
    // @ts-ignore
    setMessage(event.target.value);
  }, [setMessage]);

  const faucetInfo = <div className="my-2 space-y-2">
    <div>Use the <Link href="https://explore-dorado.fetch.ai/">testnet faucet</Link> to get tokens.</div>
    <div><span className="font-semibold">Address:</span> {wallet.address}</div>
    <div><span className="font-semibold">Balance:</span> {formatCoin(balance)}</div>
  </div>

  return <networkContext.Provider value={networkContextValue}>
    <div className="flex flex-col items-center mt-8">
      <header className="w-max py-8 container font-extrabold text-6xl">
        <span className="mb-2">Welcome! Say,</span>
        <br/>
        <span className="text-blue-500">"Hello Cosmos"</span>
      </header>
      <section className="w-full space-y-8 py-8 flex flex-col items-center bg-[#FFF8F2]">
        <div className="flex md:flex-row sm:flex-col container md:space-x-8 sm:space-y-8">
          <div className="flex-1 flex flex-col md:items-end sm:items-center md:text-left sm:text-center">
            <div>
            <span className="font-semibold">
              Nice one, you've generated a react dApp!
            </span>
              <br/>
              <div className="max-w-lg">
                Write a message to let the cosmos know how easy it was to set up.
                Greetings are stored in a smart contract on <Link href="https://docs.fetch.ai/ledger_v2/networks/"
                                                                  target="_blank">Fetch.ai
                testnet (Dorado)</Link> which is queried to populate the messages below.
                Read what other users have to say about their experience!
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col md:items-start sm:items-center">
            <div className="lg:space-x-4 md:space-y-4 md:space-x-0 sm:space-x-4">
              <Input type="textarea"
                     placeholder={placeholder}
                     onChange={_setMessage}
                     value={message}
                     disabled={isInputDisabled}
              ></Input>
              {wallet.connected && <Button
                  onClick={_sayHello}
                  disabled={isSubmitDisabled}>
                Submit
              </Button>}
              {!wallet.connected && <Button
                  onClick={() => connectKeplr(true)}
                  disabled={wallet.connected}>
                Connect Wallet
              </Button>}
            </div>
            {wallet.connected && faucetInfo}
          </div>
        </div>
        <CosmosGreetings context={networkContext}/>
        <footer>
          You can find more information at <Link href="https://docs.fetch.ai">docs.fetch.ai</Link>.
        </footer>
      </section>
    </div>
  </networkContext.Provider>
};
