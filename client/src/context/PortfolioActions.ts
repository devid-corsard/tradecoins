import { TradeItemInputNames } from "../dto/TradeItemDto";

export const enum PortfolioActionsEnum {
    getPortfolio = "GET_PORTFOLIO",
    updateName = "UPDATE_NAME",
    updateTradeInput = "UPDATE_TRADE_INPUT",
    addNewTrade = "ADD_NEW_TRADE",
    copyTrade = "COPY_TRADE",
    deleteTrade = "DELETE_TRADE",
    addNewPortfolioItem = "ADD_NEW_PITEM",
    deletePortfolioItem = "DELETE_PITEM",
}

export type GetPortfolioAction = {
    type: PortfolioActionsEnum.getPortfolio;
};
export type UpdateNameAction = {
    type: PortfolioActionsEnum.updateName;
    payload: { id: string; value: string };
};
export type UpdateTradeInput = {
    type: PortfolioActionsEnum.updateTradeInput;
    payload: { id: string; value: string; propName: TradeItemInputNames };
};
export type AddNewTradeAction = {
    type: PortfolioActionsEnum.addNewTrade;
    payload: { id: string };
};
export type CopyTradeAction = {
    type: PortfolioActionsEnum.copyTrade;
    payload: { id: string };
};
export type DeleteTradeAction = {
    type: PortfolioActionsEnum.deleteTrade;
    payload: { id: string };
};
export type AddNewPortfolioItemAction = {
    type: PortfolioActionsEnum.addNewPortfolioItem;
};
export type DeletePortfolioItemAction = {
    type: PortfolioActionsEnum.deletePortfolioItem;
    payload: { id: string };
};

export type PortfolioActionTypesUnion =
    | GetPortfolioAction
    | UpdateNameAction
    | UpdateTradeInput
    | AddNewTradeAction
    | CopyTradeAction
    | DeleteTradeAction
    | AddNewPortfolioItemAction
    | DeletePortfolioItemAction;
