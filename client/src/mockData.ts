import { PortfolioItemType } from "./domain/PortfolioType";
import { TradeItemType } from "./domain/TradeItemType";

export const mockPortfolio: PortfolioItemType[] = [
    {
        name: "btc",
        id: crypto.randomUUID(),
        data: [
            new TradeItemType(crypto.randomUUID(), "0.002", "24000", "25000"),
            new TradeItemType(crypto.randomUUID(), "0.003", "23000", "23500"),
        ],
    },
    {
        name: "ltc",
        id: crypto.randomUUID(),
        data: [
            new TradeItemType(crypto.randomUUID(), "10", "98", "0"),
            new TradeItemType(crypto.randomUUID(), "10", "64", "76"),
        ],
    },
];
