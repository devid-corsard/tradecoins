export enum TradeItemInputNames {
  Amount = "amount",
  BuyPrice = "buy_price",
  SellPrice = "sell_price",
}

export class TradeItemDto {
  id = "0";
  [TradeItemInputNames.Amount]: string;
  [TradeItemInputNames.BuyPrice]: string;
  [TradeItemInputNames.SellPrice]: string;
  constructor(id: string, a = "", b = "", s = "") {
    this[TradeItemInputNames.Amount] = a;
    this[TradeItemInputNames.BuyPrice] = b;
    this[TradeItemInputNames.SellPrice] = s;
    this.id = id;
  }
  get spend(): string {
    const spend =
      Number(this[TradeItemInputNames.Amount]) *
      Number(this[TradeItemInputNames.BuyPrice]);
    if (spend === 0) return "";
    let afterDotNum = 2;
    if (spend < 1) afterDotNum = 8;
    return String(spend.toFixed(afterDotNum));
  }

  get recieved(): string {
    const recieved =
      Number(this[TradeItemInputNames.Amount]) *
      Number(this[TradeItemInputNames.SellPrice]);
    if (recieved === 0) return "";
    let afterDotNum = 2;
    if (recieved < 1) afterDotNum = 8;
    return String(recieved.toFixed(afterDotNum));
  }

  get difference(): string {
    const difference = Number(this.recieved) - Number(this.spend);
    let afterDotNum = 2;
    if (difference < 1 && difference > -1) afterDotNum = 8;
    return String(difference.toFixed(afterDotNum));
  }
}
