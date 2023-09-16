import { UUID } from "crypto";

export enum TradeItemInputNames {
    Amount = "amount",
    BuyPrice = "buy_price",
    SellPrice = "sell_price",
}

export class TradeItemType {
    id: UUID;
    [TradeItemInputNames.Amount]: string;
    [TradeItemInputNames.BuyPrice]: string;
    [TradeItemInputNames.SellPrice]: string;
    constructor(id: UUID, a = "", b = "", s = "") {
        this[TradeItemInputNames.Amount] = a;
        this[TradeItemInputNames.BuyPrice] = b;
        this[TradeItemInputNames.SellPrice] = s;
        this.id = id;
    }
    private get spendNum(): number {
        return (
            Number(this[TradeItemInputNames.Amount]) *
            Number(this[TradeItemInputNames.BuyPrice])
        );
    }

    private get recievedNum(): number {
        return (
            Number(this[TradeItemInputNames.Amount]) *
            Number(this[TradeItemInputNames.SellPrice])
        );
    }

    get spend(): string {
        const spend = this.spendNum;
        if (spend === 0) return "";
        let afterDotNum = 2;
        if (spend < 0.01) afterDotNum = 8;
        return String(spend.toFixed(afterDotNum));
    }

    get recieved(): string {
        const recieved = this.recievedNum;
        if (recieved === 0) return "";
        let afterDotNum = 2;
        if (recieved < 0.01) afterDotNum = 8;
        return String(recieved.toFixed(afterDotNum));
    }

    get difference(): string {
        const difference = this.recievedNum - this.spendNum;
        if (difference === 0) return "0.00";
        let afterDotNum = 2;
        if (difference < 0.1 && difference > -0.1) afterDotNum = 8;
        return String(difference.toFixed(afterDotNum));
    }
    update(key: TradeItemInputNames, value: string) {
        this[key] = value;
    }
}
