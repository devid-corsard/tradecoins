export enum TradeItemInputNames {
  Amount = "amount",
  BuyPrice = "buy_price",
  SellPrice = "sell_price",
}

type TradeItemType = {
  id: string;
  spend: string;
  recieved: string;
  difference: string;
  [TradeItemInputNames.Amount]: string;
  [TradeItemInputNames.BuyPrice]: string;
  [TradeItemInputNames.SellPrice]: string;
};
export default TradeItemType;
