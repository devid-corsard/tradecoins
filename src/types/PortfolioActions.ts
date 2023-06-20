export const enum PortfolioActionsEnum {
  getPortfolio = "GET_PORTFOLIO",
  updateName = "UPDATE_NAME",
  updateAmount = "UPDATE_AMOUNT",
  updateBuyPrice = "UPDATE_BUY_PRICE",
  updateSellPrice = "UPDATE_SELL_PRICE",
  addNewTrade = "ADD_NEW_TRADE",
  copyTrade = "COPY_TRADE",
  deleteTrade = "DELETE_TRADE",
  addNewPortfolioItem = "ADD_NEW_PITEM",
  deletePortfolioItem = "DELETE_PITEM",
}

export type GetPortfolioAction = {
  type: PortfolioActionsEnum.getPortfolio;
  payload: { id: string };
};
export type UpdateNameAction = {
  type: PortfolioActionsEnum.updateName;
  payload: { id: string; value: string };
};
export type UpdateAmountAction = {
  type: PortfolioActionsEnum.updateAmount;
  payload: { id: string; value: string };
};
export type UpdateBuyPriceAction = {
  type: PortfolioActionsEnum.updateBuyPrice;
  payload: { id: string; value: string };
};
export type UpdateSellPriceAction = {
  type: PortfolioActionsEnum.updateSellPrice;
  payload: { id: string; value: string };
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
  | UpdateAmountAction
  | UpdateBuyPriceAction
  | UpdateSellPriceAction
  | AddNewTradeAction
  | CopyTradeAction
  | DeleteTradeAction
  | AddNewPortfolioItemAction
  | DeletePortfolioItemAction;
