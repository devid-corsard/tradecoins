import React, { useContext } from "react";
import { PortfolioContext } from "../context/PortfolioContext";
import {
    PortfolioActionsEnum,
    UpdateTradeInput,
} from "../context/PortfolioActions";
import { TradeItemInputNames } from "../domain/TradeItemType";
import { UUID } from "crypto";
import usePortfolioRequests from "../hooks/usePortfolioRequests";

type Props = {
    name: string;
    value: string;
    valueName: TradeItemInputNames;
    id: UUID;
};

let timeoutId: NodeJS.Timeout;
let DELAY = 900;
const InputItem = (props: Props) => {
    const { dispatch } = useContext(PortfolioContext);
    const { editTradeItemInputValue } = usePortfolioRequests();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const new_value = e.currentTarget.value;
        async function patchData() {
            const res = await editTradeItemInputValue(
                props.id,
                props.valueName,
                new_value
            );
            if (!res) {
                // todo: handle error
                return;
            }
        }
        clearTimeout(timeoutId);
        timeoutId = setTimeout(patchData, DELAY);
        const action: UpdateTradeInput = {
            type: PortfolioActionsEnum.updateTradeInput,
            payload: {
                id: props.id,
                value: new_value,
                valueName: props.valueName,
            },
        };
        dispatch(action);
    };
    return (
        <li>
            <h4>{props.name}</h4>
            <input
                type="number"
                defaultValue={props.value}
                onChange={handleChange}
            />
        </li>
    );
};

export default InputItem;
