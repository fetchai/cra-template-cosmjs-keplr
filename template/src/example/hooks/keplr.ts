import {Keplr} from "../signers/keplr/types";
import {OfflineSigner} from "@cosmjs/proto-signing";
import {useCallback, useState} from "react";
import {initKeplr} from "../signers/keplr/keplr";
import {CHAIN_ID} from "../config";

export interface WalletState {
  connected: boolean;
  keplr?: Keplr;
  signer?: OfflineSigner;
  address?: string;
}

const initialWalletState = {
  connected: false,
}

// TODO: refactor types
export function useWallet(): [WalletState, (shouldSuggestChain?: boolean) => void] {
  const [wallet, setWallet] = useState<WalletState>(initialWalletState);

  const connectKeplr = useCallback(async (shouldSuggestChain?: boolean) => {
    try {
      const keplr = await initKeplr(shouldSuggestChain);
      const key = await keplr.getKey(CHAIN_ID);
      setWallet({
        keplr,
        connected: !!keplr,
        signer: keplr.getOfflineSigner(CHAIN_ID),
        address: key.bech32Address,
      });
    } catch (error) {
      throw error;
    }
  }, [setWallet]);

  return [wallet, connectKeplr];
}
