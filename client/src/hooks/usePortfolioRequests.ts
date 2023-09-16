import { UUID } from "crypto";
import PortfilioType from "../domain/PortfolioType";
import portfolioAdapter from "../domain/portfolioAdapter";
import { PortfolioItemCreated, TradeItemCreated } from "../dto/PortfolioDto";
import { TradeItemInputNames } from "../domain/TradeItemType";

export default function usePortfolioRequests() {
    enum TradeItemActions {
        New = "New",
        Copy = "Copy",
    }

    async function getPortfolio(): Promise<PortfilioType | null> {
        return fetch("/api/user/portfolio", { method: "GET" })
            .then((res) => res.json())
            .then(portfolioAdapter)
            .catch(() => null);
    }

    async function addNewPortfolioItem(): Promise<PortfolioItemCreated | null> {
        return fetch("/api/user/portfolioitem", { method: "POST" })
            .then((res) => res.json())
            .catch(() => null);
    }

    async function changePortfolioItemName(
        id: UUID,
        name: string
    ): Promise<boolean | null> {
        return fetch(
            "/api/user/portfolioitem?" + new URLSearchParams({ id, name }),
            {
                method: "PATCH",
            }
        )
            .then((res) => res.ok)
            .catch(() => null);
    }

    async function deletePortfolioItem(id: UUID): Promise<boolean | null> {
        return fetch("/api/user/portfolioitem?" + new URLSearchParams({ id }), {
            method: "DELETE",
        })
            .then((res) => res.ok)
            .catch(() => null);
    }

    async function addNewTradeItem(
        parent_id: UUID
    ): Promise<TradeItemCreated | null> {
        return fetch(
            "/api/user/tradeitem?" +
                new URLSearchParams({
                    action: TradeItemActions.New,
                    parent_id,
                }),
            {
                method: "POST",
            }
        )
            .then((res) => res.json())
            .catch(() => null);
    }

    // todo: implement correctly now its creating new
    async function copyTradeItem(id: UUID): Promise<TradeItemCreated | null> {
        return fetch(
            "/api/user/tradeitem?" +
                new URLSearchParams({ action: TradeItemActions.Copy, id }),
            {
                method: "POST",
            }
        )
            .then((res) => res.json())
            .catch(() => null);
    }

    async function deleteTradeItem(id: UUID): Promise<boolean | null> {
        return fetch("/api/user/tradeitem?" + new URLSearchParams({ id }), {
            method: "DELETE",
        })
            .then((res) => res.ok)
            .catch(() => null);
    }

    async function editTradeItemInputValue(
        id: UUID,
        name: TradeItemInputNames,
        value: string
    ): Promise<boolean | null> {
        return fetch(
            "/api/user/tradeitem?" + new URLSearchParams({ id, name, value }),
            {
                method: "PATCH",
            }
        )
            .then((res) => res.ok)
            .catch(() => null);
    }

    return {
        getPortfolio,
        addNewPortfolioItem,
        changePortfolioItemName,
        addNewTradeItem,
        deletePortfolioItem,
        copyTradeItem,
        deleteTradeItem,
        editTradeItemInputValue,
    };
}
