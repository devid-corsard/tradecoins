import React, { useContext } from "react";
import TradeItem from "./TradeItem";
import { PortfolioContext } from "../context/PortfolioContext";
import {
    AddNewTradeAction,
    DeletePortfolioItemAction,
    PortfolioActionsEnum,
    UpdateNameAction,
} from "../context/PortfolioActions";
import { PortfolioItemType } from "../domain/PortfolioType";
import usePortfolioRequests from "../hooks/usePortfolioRequests";

type Props = {
    item: PortfolioItemType;
};

let timeoutId: NodeJS.Timeout;
let DELAY = 900;
const PortfolioItem = ({ item }: Props) => {
    const { dispatch } = useContext(PortfolioContext);
    const { changePortfolioItemName, deletePortfolioItem, addNewTradeItem } =
        usePortfolioRequests();

    function handleAddNew() {
        async function fetchPostNew() {
            const res = await addNewTradeItem(item.id);
            if (!res) {
                // todo: handle error
                return;
            }
            const action: AddNewTradeAction = {
                type: PortfolioActionsEnum.addNewTrade,
                payload: {
                    id: item.id,
                    newItemId: res.id,
                },
            };
            dispatch(action);
        }
        fetchPostNew();
    }
    function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
        const new_name = e.currentTarget.value;
        async function patchData() {
            const res = await changePortfolioItemName(item.id, new_name);
            if (!res) {
                // todo: handle error
                return;
            }
            const action: UpdateNameAction = {
                type: PortfolioActionsEnum.updateName,
                payload: {
                    id: item.id,
                    value: new_name,
                },
            };
            dispatch(action);
        }
        clearTimeout(timeoutId);
        timeoutId = setTimeout(patchData, DELAY);
    }

    function handleDeleteTradeItem() {
        async function fetchDelete() {
            const res = await deletePortfolioItem(item.id);
            if (!res) {
                // todo: handle error
                return;
            }
            const action: DeletePortfolioItemAction = {
                type: PortfolioActionsEnum.deletePortfolioItem,
                payload: { id: item.id },
            };
            dispatch(action);
        }
        fetchDelete();
    }

    return (
        <div className="portfolio-item">
            <input
                type="text"
                spellCheck={false}
                placeholder="coin name"
                defaultValue={item.name}
                onChange={handleNameChange}
            />
            <button className="outside bad" onClick={handleDeleteTradeItem}>
                Del all
            </button>
            {item.data.map((data) => (
                <TradeItem data={data} key={data.id} />
            ))}
            <button className="wide" onClick={handleAddNew}>
                Add new trade
            </button>
        </div>
    );
};

export default PortfolioItem;
