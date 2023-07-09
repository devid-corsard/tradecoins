// import React from 'react'

import { useContext } from "react";
import { PortfolioContext } from "../context/PortfolioContext";
import InputItem from "./InputItem";
import SpanItem from "./SpanItem";
import {
    CopyTradeAction,
    DeleteTradeAction,
    PortfolioActionsEnum,
} from "../types/PortfolioActions";
import { TradeItemDto, TradeItemInputNames } from "../dto/TradeItemDto";

type Props = {
    data: TradeItemDto;
};

const TradeItem = ({ data }: Props) => {
    const { dispatch } = useContext(PortfolioContext);
    const handleDelete = () => {
        const action: DeleteTradeAction = {
            type: PortfolioActionsEnum.deleteTrade,
            payload: { id: data.id },
        };
        dispatch(action);
    };
    const handleCopy = () => {
        const action: CopyTradeAction = {
            type: PortfolioActionsEnum.copyTrade,
            payload: { id: data.id },
        };
        dispatch(action);
    };
    return (
        <div className="grid grid-cols-3 grid-rows-3 md:grid-cols-6 md:grid-rows-2 lg:grid-cols-7 \
        lg:grid-rows-1 lg:p-2 \
        items-end rounded-sm border-amber-600 border">
            <InputItem
                name="Amount:"
                value={data.amount}
                propName={TradeItemInputNames.Amount}
                id={data.id}
            />
            <InputItem
                name="Buy price:"
                value={data.buy_price}
                propName={TradeItemInputNames.BuyPrice}
                id={data.id}
            />
            <SpanItem name="Spend:" value={data.spend} />
            <InputItem
                name="Sell price:"
                value={data.sell_price}
                propName={TradeItemInputNames.SellPrice}
                id={data.id}
            />
            <SpanItem name="Recieved:" value={data.recieved} />
            <SpanItem name="Difference:" value={data.difference} />
            <div className="grid grid-cols-2 col-span-2 lg:col-span-1 lg:grid-cols-1 lg:grid-rows-2 text-xs">
                <button
                    className="m-1 h-8 lg:h-6 bg-slate-700 text-red-500 border border-amber-500 \
                    hover:bg-slate-800 active:bg-amber-700"
                    onClick={handleDelete}
                >
                    Del
                </button>
                <button
                    className="m-1 h-8 lg:h-6 bg-slate-700 text-amber-300 border border-amber-500 \
                    hover:bg-slate-800 active:bg-amber-700"
                    onClick={handleCopy}
                >
                    Copy
                </button>
            </div>
        </div>
    );
};

export default TradeItem;
