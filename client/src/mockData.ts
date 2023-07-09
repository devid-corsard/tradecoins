import { TradeItemDto } from "./dto/TradeItemDto";
import PortfolioItemType from "./types/PortfolioItemType";

export const mockPortfolio: PortfolioItemType[] = [
  {
    name: "btc",
    id: crypto.randomUUID(),
    data: [
      new TradeItemDto(crypto.randomUUID(), "0.002", "24000", "25000"),
      new TradeItemDto(crypto.randomUUID(), "0.003", "23000", "23500"),
    ],
  },
  {
    name: "ltc",
    id: crypto.randomUUID(),
    data: [
      new TradeItemDto(crypto.randomUUID(), "10", "98", "0"),
      new TradeItemDto(crypto.randomUUID(), "10", "64", "76"),
    ],
  },
];
