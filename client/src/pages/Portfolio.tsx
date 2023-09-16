import { useContext, useEffect } from "react";
import { PortfolioContext } from "../context/PortfolioContext";
import {
    AddNewPortfolioItemAction,
    PortfolioActionsEnum,
    SetPortfolioAction,
} from "../context/PortfolioActions";
import { AuthContext } from "../context/AuthContext";
import PortfolioItem from "../components/PortfolioItem";
import usePortfolioRequests from "../hooks/usePortfolioRequests";

const Portfolio = () => {
    const { portfolio, dispatch } = useContext(PortfolioContext);
    const { auth } = useContext(AuthContext);
    const { getPortfolio, addNewPortfolioItem } = usePortfolioRequests();
    function handleAddNew() {
        async function postData() {
            const ids = await addNewPortfolioItem();
            if (ids === null) {
                // handle server error
                return;
            }
            const action: AddNewPortfolioItemAction = {
                type: PortfolioActionsEnum.addNewPortfolioItem,
                payload: ids,
            };
            dispatch(action);
        }
        postData();
    }
    useEffect(() => {
        async function fetchData() {
            const portfolio = await getPortfolio();
            if (portfolio === null) {
                return;
            }
            const action: SetPortfolioAction = {
                type: PortfolioActionsEnum.setPortfolio,
                payload: { value: portfolio },
            };
            dispatch(action);
        }
        fetchData();
    }, []);

    return (
        <main className="wrapper flow">
            <h2>Your trades:</h2>
            {auth.authorized ? (
                <>
                    {portfolio.length ? (
                        portfolio.map((item) => (
                            <PortfolioItem item={item} key={item.id} />
                        ))
                    ) : (
                        <h2>Add new coin to start using your portfolio.</h2>
                    )}
                    <button className="wide" onClick={handleAddNew}>
                        Add new coin
                    </button>
                </>
            ) : (
                <h2>Login or register to start using portfolio.</h2>
            )}
        </main>
    );
};

export default Portfolio;
