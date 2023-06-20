import { Dispatch } from "react";
import PortfolioItemType from "./PortfolioItemType";
import { PortfolioActionTypesUnion } from "./PortfolioActions";

export type PortfolioContextType = {
  portfolio: PortfolioItemType[];
  dispatch: Dispatch<PortfolioActionTypesUnion>;
};
