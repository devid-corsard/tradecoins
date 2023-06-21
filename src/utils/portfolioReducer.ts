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
import TradeItemType from "../types/TradeItemType";

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
      portfolioItem.data.forEach((tradeItem: TradeItemType) => {
        if (tradeItem.id === action.payload.id) {
          portfolioItem.data.push({
            ...tradeItem,
            id: crypto.randomUUID(),
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
    state.forEach((pi: PortfolioItemType) => {
      if (pi.id === action.payload.id) {
        pi.name = action.payload.value;
      }
    });
    return [...state];
  },
  [PortfolioActionsEnum.addNewTrade]: (
    state: Portfolio,
    action: AddNewTradeAction
  ): Portfolio => {
    const portfolioItem = state.find((pi) => {
      return pi.id === action.payload.id;
    });
    if (!portfolioItem) return state;

    const newTI: TradeItemType = {
      id: crypto.randomUUID(),
      amount: "0.00",
      buy_price: "0.00",
      sell_price: "0.00",
      spend: "0.00",
      recieved: "0.00",
      difference: "0.00",
    };
    (portfolioItem as PortfolioItemType).data.push(newTI);
    return [...state];
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
