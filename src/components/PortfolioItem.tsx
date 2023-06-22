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
    <div className="bg-white lg:w-[900px] rounded-md shadow-md mx-auto flex flex-col items-center gap-4 p-4 m-4">
      <input
        type="text"
        placeholder="coin name"
        className="md:w-3/5 w-full rounded-md shadow-md border-neutral-200 p-2 border-solid border"
        value={item.name}
        onChange={handleNameChange}
      />
      <div className="flex flex-col">
        {item.data.map((data) => (
          <TradeItem data={data} key={data.id} />
        ))}
        <div>
          <button
            className="m-1 p-1 border bg-white hover:bg-gray-100 active:bg-orange-100"
            onClick={handleAddNew}
          >
            Add new
          </button>
          <button
            className="m-1 p-1 border bg-red-100 hover:bg-red-700 active:bg-red-500 ml-20 text-[0.5rem]"
            onClick={handleDeleteTradeItem}
          >
            Delete All
          </button>
        </div>
      </div>
    </div>
  );
};

export default PortfolioItem;
