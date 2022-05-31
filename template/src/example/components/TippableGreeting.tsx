import React, {useCallback, useContext} from "react";
import {WalletState} from "../hooks/keplr";
import {STAKING_DENOM} from "../config";
import {Coin, SigningStargateClient} from "@cosmjs/stargate";
import {NetworkContext} from "../hooks/context";

export interface TippableGreetingProps {
  context: React.Context<NetworkContext>;
  address: string;
  greeting: string;
}

const TippableGreeting: React.FC<TippableGreetingProps> = ({context, address, greeting}) => {
  const {wallet, sgClient, balance} = useContext<NetworkContext>(context);
  const sendTip = useCallback((address: string) => {
    if (typeof wallet === "undefined") {
      return;
    }

    const halfBalance = (BigInt(balance.amount) / BigInt(2)).toString(10);
    const toSend = [{amount: halfBalance, denom: STAKING_DENOM}];

    sgClient?.sendTokens(wallet.address!, address, toSend, "auto");
  }, [wallet, balance.amount, sgClient]);

  return <div className="flex relative w-max p-6 overflow-hidden rounded-lg bg-white" key={address}>
    <div className="space-x-4"></div>
    <img className="w-6 relative -top-2" src="/assets/quote.svg" alt="quote icon"/>
    <span className="mx-2">
      {greeting}
    </span>
    <img className="w-6 rotate-180 relative top-2" src="/assets/quote.svg" alt="quote icon"/>
    {wallet?.connected && <div
        className="absolute flex justify-center items-center ml-0 top-0 left-0 w-full h-full transition opacity-0 hover:opacity-100 bg-opacity-0 hover:bg-opacity-90 bg-white cursor-pointer"
        onClick={() => {
          sendTip(address)
        }}>
      <button className="flex space-x-2">
        <span className="font-extrabold text-xl">Tip</span>
        <img src="/assets/fetch_logo_outline.svg" alt="fetch logo"/>
      </button>
    </div>}
  </div>
}
export default TippableGreeting;
