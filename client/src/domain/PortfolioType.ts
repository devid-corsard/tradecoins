import { UUID } from "crypto";
import { TradeItemType } from "./TradeItemType";

export type PortfolioItemType = {
    name: string;
    id: UUID;
    data: Array<TradeItemType>;
};

type PortfilioType = Array<PortfolioItemType>;

export default PortfilioType;
