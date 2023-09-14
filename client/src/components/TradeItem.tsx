// import React from 'react'

import { useContext } from "react";
import { PortfolioContext } from "../context/PortfolioContext";
import InputItem from "./InputItem";
import ViewItem from "./ViewItem";
import {
    CopyTradeAction,
    DeleteTradeAction,
    PortfolioActionsEnum,
} from "../context/PortfolioActions";
import { TradeItemType, TradeItemInputNames } from "../domain/TradeItemType";
import usePortfolioRequests from "../hooks/usePortfolioRequests";

type Props = {
    data: TradeItemType;
};

const TradeItem = ({ data }: Props) => {
    const { dispatch } = useContext(PortfolioContext);
    const { deleteTradeItem, copyTradeItem } = usePortfolioRequests();
    function handleDelete() {
        async function fetchDelete() {
            const res = await deleteTradeItem(data.id);
            if (!res) {
                // todo: handle error
                return;
            }
            const action: DeleteTradeAction = {
                type: PortfolioActionsEnum.deleteTrade,
                payload: { id: data.id },
            };
            dispatch(action);
        }
        fetchDelete();
    }
    function handleCopy() {
        async function fetchCopy() {
            const res = await copyTradeItem(data.id);
            if (!res) {
                // todo: handle error
                return;
            }
            const action: CopyTradeAction = {
                type: PortfolioActionsEnum.copyTrade,
                payload: { id: data.id, copyId: res.id },
            };
            dispatch(action);
        }
        fetchCopy();
    }
    return (
        <div className="trade-item">
            <ul>
                <InputItem
                    name="Amount:"
                    value={data.amount}
                    valueName={TradeItemInputNames.Amount}
                    id={data.id}
                />
                <InputItem
                    name="Buy price:"
                    value={data.buy_price}
                    valueName={TradeItemInputNames.BuyPrice}
                    id={data.id}
                />
                <ViewItem name="Spend:" value={data.spend} />
                <InputItem
                    name="Sell price:"
                    value={data.sell_price}
                    valueName={TradeItemInputNames.SellPrice}
                    id={data.id}
                />
                <ViewItem name="Recieved:" value={data.recieved} />
                <ViewItem name="Difference:" value={data.difference} />
            </ul>
            <div className="buttons-del-copy">
                <button className="left bad" onClick={handleDelete}>
                    Del
                </button>
                <button className="right neutral" onClick={handleCopy}>
                    Copy
                </button>
            </div>
        </div>
    );
};

export default TradeItem;
