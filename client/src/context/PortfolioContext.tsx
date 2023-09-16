import {
    Dispatch,
    ReactNode,
    createContext,
    useReducer,
    useState,
} from "react";
import { PortfolioActionTypesUnion } from "./PortfolioActions";
import PortfolioType from "../domain/PortfolioType";
import portfolioReducersMap from "./portfolioReducersMap";

export type PortfolioContextType = {
    portfolio: PortfolioType;
    n_portfolio: PortfolioType;
    setPortfolio: Dispatch<React.SetStateAction<PortfolioType>>;
    dispatch: Dispatch<PortfolioActionTypesUnion>;
};

export const INITIAL_PORTFOLIO: PortfolioType = [];

export const PortfolioContext = createContext<PortfolioContextType>({
    portfolio: INITIAL_PORTFOLIO,
    n_portfolio: INITIAL_PORTFOLIO,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    dispatch: () => {},
    setPortfolio: () => {},
});

type Props = { children: ReactNode };

const portfolioReducer = (
    state: PortfolioType,
    action: PortfolioActionTypesUnion
): PortfolioType => {
    return (portfolioReducersMap[action.type] as typeof portfolioReducer)(
        state,
        action
    );
};

export const PortfolioContextProvider = ({ children }: Props) => {
    const [portfolio, dispatch] = useReducer(
        portfolioReducer,
        INITIAL_PORTFOLIO
    );
    const [n_portfolio, setPortfolio] = useState(INITIAL_PORTFOLIO);

    return (
        <PortfolioContext.Provider
            value={{ portfolio, dispatch, n_portfolio, setPortfolio }}
        >
            {children}
        </PortfolioContext.Provider>
    );
};
