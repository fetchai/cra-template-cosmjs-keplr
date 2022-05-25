import React, {SyntheticEvent, useCallback, useEffect, useState} from "react";
import {
  sayHello
} from "../api/greetings";
import Button from "./Button";
import Input from "./Input";
import {useBalance, useSigningClient, useSigningStargateClient} from "../hooks/cosmjs";
import {useWallet} from "../hooks/keplr";
import Link from "./Link";


// TODO: move
import {Coin} from "@cosmjs/stargate";
import CosmosGreetings from "./CosmosGreetings";

function formatCoin(coin: Coin): string {
  // TODO: improve
  return `${coin.amount} ${coin.denom}`;
}

export const HelloCosmos: React.FC<{}> = () => {
  const [message, setMessage] = useState<string>("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true);
  const [isInputDisabled, setIsInputDisabled] = useState<boolean>(true);
  const [wallet, connect] = useWallet();
  // const getFunds = useFaucet();

  const cwClient = useSigningClient(wallet.signer);

  const sgClient = useSigningStargateClient(wallet.signer);
  const balance = useBalance(wallet.address, sgClient);

  const _sayHello = useCallback(async () => {
    // TODO: confirmation
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

  // TODO: move
  const defaultPlaceholder = "Write your message here";
  const noWalletPlaceholder = "\"Connect Wallet\" to say hello!"
  const noFundsPlaceholder = "Get tokens from the faucet!";
  const [placeholder, setPlaceholder] = useState<string>(defaultPlaceholder);
  useEffect(() => {
    let errorPlaceholder = noWalletPlaceholder;

    if (wallet.connected) {
      if (BigInt(balance.amount) > BigInt(0)) {
        setPlaceholder(defaultPlaceholder);
        setIsSubmitDisabled(false);
        setIsInputDisabled(false);
        return
      } else {
        errorPlaceholder = noFundsPlaceholder
      }
    }
    setPlaceholder(errorPlaceholder)
    setIsSubmitDisabled(true);
    setIsInputDisabled(true);
  }, [wallet.connected, setIsSubmitDisabled, balance.amount])

  return <div className="flex flex-col items-center mt-8">
    <header className="w-max py-8 container font-extrabold text-6xl">
      <span className="mb-2">Welcome! Say,</span>
      <br/>
      <span className="text-blue-500">"Hello Cosmos"</span>
    </header>
    <section className="w-full space-y-8 py-8 flex flex-col items-center bg-[#FFF8F2]">
      <div className="flex container space-x-8">
        <div className="flex-1">
            <span className="font-semibold">
              Nice One, you've generated a react dApp!
            </span>
          <br/>
          <span>
              Write a message to let the cosmos know how easy it was to set up.
              This will be stored in a testnet smart contract and populates the messages below.
              Read what other users have to say!
            </span>
        </div>
        <div className="flex-1 flex flex-col">
          <div className="space-x-4">
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
                onClick={() => connect(true)}
                disabled={wallet.connected}>
              Connect Wallet
            </Button>}
          </div>
          {wallet.connected && faucetInfo}
        </div>
      </div>
      <CosmosGreetings wallet={wallet} cwClient={cwClient} sgClient={sgClient} balance={balance}/>
      <footer>
        You can find more information at <Link href="https://docs.fetch.ai">docs.fetch.ai</Link>.
      </footer>
    </section>
  </div>
};
