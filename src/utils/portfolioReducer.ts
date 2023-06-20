import { INITIAL_PORTFOLIO } from "../context/inits";
import { mockPortfolio } from "../mockData";
import {
  AddNewPortfolioItemAction,
  AddNewTradeAction,
  CopyTradeAction,
  DeletePortfolioItemAction,
  DeleteTradeAction,
  GetPortfolioAction,
  PortfolioActionsEnum,
  UpdateAmountAction,
  UpdateBuyPriceAction,
  UpdateNameAction,
  UpdateSellPriceAction,
} from "../types/PortfolioActions";
import PortfolioItemType from "../types/PortfolioItemType";
import TradeData from "../types/TradeDataType";

type Portfolio = PortfolioItemType[];

const portfolioReducerHandler = {
  [PortfolioActionsEnum.getPortfolio]: (
    _state: Portfolio,
    action: GetPortfolioAction
  ): Portfolio => {
    if (action.payload.id === "testId") {
      return mockPortfolio;
    }
    return INITIAL_PORTFOLIO;
  },
  [PortfolioActionsEnum.copyTrade]: (
    state: Portfolio,
    action: CopyTradeAction
  ): Portfolio => {
    state.forEach((portfolioItem: PortfolioItemType) => {
      portfolioItem.data.forEach((tradeItem: TradeData) => {
        if (tradeItem.id === action.payload.id) {
          portfolioItem.data.push({
            ...tradeItem,
            id: action.payload.id + "cp",
          });
        }
      });
    });
    return [...state];
  },
  [PortfolioActionsEnum.updateName]: (
    state: Portfolio,
    action: UpdateNameAction
  ): Portfolio => {
    if (action.payload.id === "testId") {
      return [...mockPortfolio];
    }
    return state;
  },
  [PortfolioActionsEnum.addNewTrade]: (
    state: Portfolio,
    action: AddNewTradeAction
  ): Portfolio => {
    if (action.payload.id === "testId") {
      return [...mockPortfolio];
    }
    return state;
  },
  [PortfolioActionsEnum.deleteTrade]: (
    state: Portfolio,
    action: DeleteTradeAction
  ): Portfolio => {
    if (action.payload.id === "testId") {
      return [...mockPortfolio];
    }
    return state;
  },
  [PortfolioActionsEnum.updateAmount]: (
    state: Portfolio,
    action: UpdateAmountAction
  ): Portfolio => {
    if (action.payload.id === "testId") {
      return [...mockPortfolio];
    }
    return state;
  },
  [PortfolioActionsEnum.updateBuyPrice]: (
    state: Portfolio,
    action: UpdateBuyPriceAction
  ): Portfolio => {
    if (action.payload.id === "testId") {
      return [...mockPortfolio];
    }
    return state;
  },
  [PortfolioActionsEnum.updateSellPrice]: (
    state: Portfolio,
    action: UpdateSellPriceAction
  ): Portfolio => {
    if (action.payload.id === "testId") {
      return [...mockPortfolio];
    }
    return state;
  },
  [PortfolioActionsEnum.addNewPortfolioItem]: (
    state: Portfolio,
    _action: AddNewPortfolioItemAction
  ): Portfolio => {
    return state;
  },
  [PortfolioActionsEnum.deletePortfolioItem]: (
    state: Portfolio,
    action: DeletePortfolioItemAction
  ): Portfolio => {
    if (action.payload.id === "testId") {
      return [...mockPortfolio];
    }
    return state;
  },
};
export default portfolioReducerHandler;
