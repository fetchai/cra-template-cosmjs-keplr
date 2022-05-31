import {Coin} from "@cosmjs/stargate";

export function formatCoin(coin: Coin): string {
  return `${coin.amount} ${coin.denom}`;
}
