import React, { useContext } from "react";
import TradeItem from "./TradeItem";
import { PortfolioContext } from "../context/PortfolioContext";
import {
  AddNewTradeAction,
  DeletePortfolioItemAction,
  PortfolioActionsEnum,
  UpdateNameAction,
} from "../types/PortfolioActions";
import PortfolioItemType from "../types/PortfolioItemType";

type Props = {
  item: PortfolioItemType;
};

const PortfolioItem = ({ item }: Props) => {
  const { dispatch } = useContext(PortfolioContext);
  const handleAddNew = () => {
    const action: AddNewTradeAction = {
      type: PortfolioActionsEnum.addNewTrade,
      payload: {
        id: item.id,
      },
    };
    dispatch(action);
  };
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const action: UpdateNameAction = {
      type: PortfolioActionsEnum.updateName,
      payload: {
        id: item.id,
        value: e.currentTarget.value,
      },
    };
    dispatch(action);
  };
  const handleDeleteTradeItem = () => {
    const action: DeletePortfolioItemAction = {
      type: PortfolioActionsEnum.deletePortfolioItem,
      payload: { id: item.id },
    };
    dispatch(action);
  };
  return (
    <div className="lg:w-[900px] md:rounded-md mx-auto flex flex-col items-center gap-4 py-4 px-1 m-4 bg-slate-800 relative">
      <button
        className={`
        py-1 px-4
        text-red-500 text-xs
        bg-slate-700 hover:bg-slate-800 active:bg-amber-700
        border border-amber-500
        sm:absolute top-2 right-2
        `}
        onClick={handleDeleteTradeItem}
      >
        Del all
      </button>
      <input
        type="text"
        spellCheck={false}
        placeholder="coin name"
        className="md:w-2/5 w-max rounded-md py-1 px-4 mx-2 bg-slate-900 text-xl text-slate-200 border-2 border-amber-700 placeholder-slate-700"
        value={item.name}
        onChange={handleNameChange}
      />
      <div className="flex flex-col gap-4">
        {item.data.map((data) => (
          <TradeItem data={data} key={data.id} />
        ))}
        <div>
          <button
            className="m-1 py-1 px-4 bg-slate-700 text-emerald-500 border border-amber-500 hover:bg-slate-800 active:bg-amber-700"
            onClick={handleAddNew}
          >
            Add new trade
          </button>
        </div>
      </div>
    </div>
  );
};

export default PortfolioItem;
