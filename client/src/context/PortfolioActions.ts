import { UUID } from "crypto";
import PortfilioType from "../domain/PortfolioType";
import { TradeItemInputNames } from "../domain/TradeItemType";
import { PortfolioItemCreated } from "../dto/PortfolioDto";

export const enum PortfolioActionsEnum {
    getPortfolio = "GET_PORTFOLIO",
    setPortfolio = "SET_PORTFOLIO",
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
export type SetPortfolioAction = {
    type: PortfolioActionsEnum.setPortfolio;
    payload: { value: PortfilioType };
};
export type UpdateNameAction = {
    type: PortfolioActionsEnum.updateName;
    payload: { id: UUID; value: string };
};
export type UpdateTradeInput = {
    type: PortfolioActionsEnum.updateTradeInput;
    payload: { id: UUID; value: string; valueName: TradeItemInputNames };
};
export type AddNewTradeAction = {
    type: PortfolioActionsEnum.addNewTrade;
    payload: { id: UUID; newItemId: UUID };
};
export type CopyTradeAction = {
    type: PortfolioActionsEnum.copyTrade;
    payload: { id: UUID; copyId: UUID };
};
export type DeleteTradeAction = {
    type: PortfolioActionsEnum.deleteTrade;
    payload: { id: UUID };
};
export type AddNewPortfolioItemAction = {
    type: PortfolioActionsEnum.addNewPortfolioItem;
    payload: PortfolioItemCreated;
};
export type DeletePortfolioItemAction = {
    type: PortfolioActionsEnum.deletePortfolioItem;
    payload: { id: UUID };
};

export type PortfolioActionTypesUnion =
    | GetPortfolioAction
    | SetPortfolioAction
    | UpdateNameAction
    | UpdateTradeInput
    | AddNewTradeAction
    | CopyTradeAction
    | DeleteTradeAction
    | AddNewPortfolioItemAction
    | DeletePortfolioItemAction;

export const enum PortfolioActionTypesEnum {
    GetPortfolioAction,
    UpdateNameAction,
    UpdateTradeInput,
    AddNewTradeAction,
    CopyTradeAction,
    DeleteTradeAction,
    AddNewPortfolioItemAction,
    DeletePortfolioItemAction,
}
