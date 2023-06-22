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
    <div className="flex flex-wrap items-center justify-start rounded-sm border-gray-200 border m-1 md:m-2">
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
      <SpanItem name="Spend:" value={data.spend} color="pink" />
      <InputItem
        name="Sell price:"
        value={data.sell_price}
        propName={TradeItemInputNames.SellPrice}
        id={data.id}
      />
      <SpanItem name="Recieved:" value={data.recieved} color="green" />
      <SpanItem name="Difference:" value={data.difference} color="orange" />
      <div className="flex text-xs">
        <button
          className="m-1 p-1 border bg-red-100 hover:bg-red-200 active:bg-red-400"
          onClick={handleDelete}
        >
          Del
        </button>
        <button
          className="m-1 p-1 border bg-orange-50 hover:bg-orange-100 active:bg-orange-300"
          onClick={handleCopy}
        >
          Copy
        </button>
      </div>
    </div>
  );
};

export default TradeItem;
