import { UUID } from "crypto";

type TradeItemDto = {
    id: UUID;
    amount: string;
    buy_price: string;
    sell_price: string;
};

export type PortfolioItemDto = {
    name: string;
    id: UUID;
    data: Array<TradeItemDto>;
};

type PortfilioDto = { info: string; data: Array<PortfolioItemDto> };

export type PortfolioItemCreated = {
    parent_id: UUID;
    child_id: UUID;
};

export type TradeItemCreated = {
    id: UUID;
};

export default PortfilioDto;
