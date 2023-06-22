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
    return String(
      (
        Number(this[TradeItemInputNames.Amount]) *
        Number(this[TradeItemInputNames.BuyPrice])
      ).toFixed(2)
    );
  }

  get recieved(): string {
    return String(
      (
        Number(this[TradeItemInputNames.Amount]) *
        Number(this[TradeItemInputNames.SellPrice])
      ).toFixed(2)
    );
  }

  get difference(): string {
    return String((Number(this.recieved) - Number(this.spend)).toFixed(2));
  }
}
