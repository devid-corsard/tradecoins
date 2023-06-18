export const enum PortfolioActionsEnum {
  getPortfolio = 'GET_PORTFOLIO',
  updateName = 'UPDATE_NAME',
  updateAmount = 'UPDATE_AMOUNT',
  updateBuyPrice = 'UPDATE_BUY_PRICE',
  updateSellPrice = 'UPDATE_SELL_PRICE',
  addNewTrade = 'ADD_NEW_TRADE',
  copyTrade = 'COPY_TRADE',
  deleteTrade = 'DELETE_TRADE',
  addNewPortfolioItem = 'ADD_NEW_PITEM',
  deletePortfolioItem = 'DELETE_PITEM',
}

type GetPortfolio = {
  type: PortfolioActionsEnum.getPortfolio,
  payload: { id: string }
};
type UpdateName = {
  type: PortfolioActionsEnum.updateName,
  payload: { id: string, value: string }
};
type UpdateAmount = {
  type: PortfolioActionsEnum.updateAmount,
  payload: { id: string, value: string }
};
type UpdateBuyPrice = {
  type: PortfolioActionsEnum.updateBuyPrice,
  payload: { id: string, value: string }
};
type UpdateSellPrice = {
  type: PortfolioActionsEnum.updateSellPrice,
  payload: { id: string, value: string }
};
type AddNewTrade = {
  type: PortfolioActionsEnum.addNewTrade,
  payload: { id: string }
};
type CopyTrade = {
  type: PortfolioActionsEnum.copyTrade,
  payload: { id: string }
};
type DeleteTrade = {
  type: PortfolioActionsEnum.deleteTrade,
  payload: { id: string }
};
type AddNewPortfolioItem = {
  type: PortfolioActionsEnum.addNewPortfolioItem
};
type DeletePortfolioItem = {
  type: PortfolioActionsEnum.deletePortfolioItem,
  payload: { id: string }
};

export type PortfolioActions =
  | GetPortfolio
  | UpdateName
  | UpdateAmount
  | UpdateBuyPrice
  | UpdateSellPrice
  | AddNewTrade
  | CopyTrade
  | DeleteTrade
  | AddNewPortfolioItem
  | DeletePortfolioItem;
