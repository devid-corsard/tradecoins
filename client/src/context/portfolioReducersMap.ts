import { TradeItemType, TradeItemInputNames } from "../domain/TradeItemType";
import {
    AddNewPortfolioItemAction,
    AddNewTradeAction,
    CopyTradeAction,
    DeletePortfolioItemAction,
    DeleteTradeAction,
    PortfolioActionsEnum,
    SetPortfolioAction,
    UpdateNameAction,
    UpdateTradeInput,
} from "./PortfolioActions";
import PortfolioType, { PortfolioItemType } from "../domain/PortfolioType";

const portfolioReducersMap = {
    [PortfolioActionsEnum.setPortfolio]: (
        _state: PortfolioType,
        action: SetPortfolioAction
    ): PortfolioType => {
        return action.payload.value;
    },

    [PortfolioActionsEnum.copyTrade]: (
        state: PortfolioType,
        action: CopyTradeAction
    ): PortfolioType => {
        for (const portfolioItem of state) {
            for (const tradeItem of portfolioItem.data) {
                if (tradeItem.id === action.payload.id) {
                    portfolioItem.data.push(
                        new TradeItemType(
                            action.payload.copyId,
                            tradeItem[TradeItemInputNames.Amount],
                            tradeItem[TradeItemInputNames.BuyPrice],
                            tradeItem[TradeItemInputNames.SellPrice]
                        )
                    );
                    return [...state];
                }
            }
        }
        return state;
    },

    [PortfolioActionsEnum.updateName]: (
        state: PortfolioType,
        action: UpdateNameAction
    ): PortfolioType => {
        state.forEach((pi: PortfolioItemType) => {
            if (pi.id === action.payload.id) {
                pi.name = action.payload.value;
                return;
            }
        });
        return [...state];
    },

    [PortfolioActionsEnum.addNewTrade]: (
        state: PortfolioType,
        action: AddNewTradeAction
    ): PortfolioType => {
        const portfolioItem = state.find((pi) => pi.id === action.payload.id);
        if (!portfolioItem) return state;

        const newTI: TradeItemType = new TradeItemType(
            action.payload.newItemId
        );
        (portfolioItem as PortfolioItemType).data.push(newTI);
        return [...state];
    },

    [PortfolioActionsEnum.deleteTrade]: (
        state: PortfolioType,
        action: DeleteTradeAction
    ): PortfolioType => {
        let itemIdxToDelete = -1;
        const portfolioItemToDeleteFrom = state.find((pi) => {
            itemIdxToDelete = pi.data.findIndex(
                (ti) => ti.id === action.payload.id
            );
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
        state: PortfolioType,
        action: UpdateTradeInput
    ): PortfolioType => {
        const { id, valueName, value } = action.payload;
        const done = state.some((pi) => {
            return pi.data.some((ti) => {
                if (ti.id === id) {
                    ti.update(valueName, value);
                    return true;
                }
                return false;
            });
        });
        if (done) return [...state];
        return state;
    },

    [PortfolioActionsEnum.addNewPortfolioItem]: (
        state: PortfolioType,
        action: AddNewPortfolioItemAction
    ): PortfolioType => {
        const newPortfolioItem: PortfolioItemType = {
            name: "",
            id: action.payload.parent_id,
            data: [new TradeItemType(action.payload.child_id)],
        };
        state.push(newPortfolioItem);
        return [...state];
    },

    [PortfolioActionsEnum.deletePortfolioItem]: (
        state: PortfolioType,
        action: DeletePortfolioItemAction
    ): PortfolioType => {
        const delItemIdx = state.findIndex((pi) => pi.id === action.payload.id);
        if (delItemIdx !== -1) {
            state.splice(delItemIdx, 1);
            return [...state];
        }
        return state;
    },
};
export default portfolioReducersMap;
