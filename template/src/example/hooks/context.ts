import {useWallet, WalletState} from "./keplr";
import {Coin, SigningStargateClient} from "@cosmjs/stargate";
import {SigningCosmWasmClient} from "@cosmjs/cosmwasm-stargate";
import {STAKING_DENOM} from "../config";
import {useBalance, useSigningClient, useSigningStargateClient} from "./cosmjs";
import {useEffect, useMemo, useState} from "react";

export type ConnectKeplr = (ShouldSuggestChain: boolean) => void;

export interface NetworkContext {
  wallet: WalletState;
  sgClient?: SigningStargateClient;
  cwClient?: SigningCosmWasmClient;
  balance: Coin;
}

export interface ValidationState {
  placeholder: string;
  isSubmitDisabled: boolean;
  isInputDisabled: boolean;
}

export const defaultNetworkContext = {
  wallet: {connected: false},
  balance: {amount: "", denom: STAKING_DENOM},
}

export function useNetworkContext(): [NetworkContext, ConnectKeplr] {
  const [wallet, connect] = useWallet();
  const cwClient = useSigningClient(wallet.signer);
  const sgClient = useSigningStargateClient(wallet.signer);
  const balance = useBalance(wallet.address, sgClient);

  const context: NetworkContext = useMemo(() => ({
    wallet,
    sgClient,
    cwClient,
    balance,
  }), [balance, cwClient, sgClient, wallet]);
  return [context, connect];
}

export function useValidation(context: NetworkContext): ValidationState {
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true);
  const [isInputDisabled, setIsInputDisabled] = useState<boolean>(true);

  const defaultPlaceholder = "Write your message here";
  const noWalletPlaceholder = "\"Connect Wallet\" to say hello!"
  const noFundsPlaceholder = "Get tokens from the faucet!";
  const [placeholder, setPlaceholder] = useState<string>(defaultPlaceholder);
  useEffect(() => {
    let errorPlaceholder = noWalletPlaceholder;
    const {wallet, balance} = context;

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
  }, [setIsSubmitDisabled, context])

  return {
    placeholder,
    isSubmitDisabled,
    isInputDisabled,
  };
}
