import { INITIAL_PORTFOLIO } from "../context/inits";
import { TradeItemDto, TradeItemInputNames } from "../dto/TradeItemDto";
import { mockPortfolio } from "../mockData";
import {
  AddNewPortfolioItemAction,
  AddNewTradeAction,
  CopyTradeAction,
  DeletePortfolioItemAction,
  DeleteTradeAction,
  GetPortfolioAction,
  PortfolioActionsEnum,
  UpdateNameAction,
  UpdateTradeInput,
} from "../types/PortfolioActions";
import PortfolioItemType from "../types/PortfolioItemType";

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
      portfolioItem.data.forEach((tradeItem: TradeItemDto) => {
        if (tradeItem.id === action.payload.id) {
          portfolioItem.data.push(
            new TradeItemDto(
              crypto.randomUUID(),
              tradeItem[TradeItemInputNames.Amount],
              tradeItem[TradeItemInputNames.BuyPrice],
              tradeItem[TradeItemInputNames.SellPrice]
            )
          );
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
    const portfolioItem = state.find((pi) => pi.id === action.payload.id);
    if (!portfolioItem) return state;

    const newTI: TradeItemDto = new TradeItemDto(crypto.randomUUID());
    (portfolioItem as PortfolioItemType).data.push(newTI);
    return [...state];
  },

  [PortfolioActionsEnum.deleteTrade]: (
    state: Portfolio,
    action: DeleteTradeAction
  ): Portfolio => {
    let itemIdxToDelete = -1;
    const portfolioItemToDeleteFrom = state.find((pi) => {
      itemIdxToDelete = pi.data.findIndex((ti) => ti.id === action.payload.id);
      if (itemIdxToDelete !== -1) return true;
      return false;
    });

    if (itemIdxToDelete !== -1 && portfolioItemToDeleteFrom) {
      portfolioItemToDeleteFrom.data.splice(itemIdxToDelete, 1);
      return [...state];
    }
    return state;
  },

  [PortfolioActionsEnum.updateTradeInput]: (
    state: Portfolio,
    action: UpdateTradeInput
  ): Portfolio => {
    const done = state.some((pi) => {
      return pi.data.some((ti) => {
        if (ti.id === action.payload.id) {
          ti[action.payload.propName] = action.payload.value;
          return true;
        }
        return false;
      });
    });
    if (done) return [...state];
    return state;
  },

  [PortfolioActionsEnum.addNewPortfolioItem]: (
    state: Portfolio,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _action: AddNewPortfolioItemAction
  ): Portfolio => {
    const newPortfolioItem: PortfolioItemType = {
      name: "",
      id: crypto.randomUUID(),
      data: [new TradeItemDto(crypto.randomUUID())],
    };
    state.push(newPortfolioItem);
    return [...state];
  },

  [PortfolioActionsEnum.deletePortfolioItem]: (
    state: Portfolio,
    action: DeletePortfolioItemAction
  ): Portfolio => {
    const delItemIdx = state.findIndex((pi) => pi.id === action.payload.id);
    if (delItemIdx !== -1) {
      state.splice(delItemIdx, 1);
      return [...state];
    }
    return state;
  },
};
export default portfolioReducerHandler;
