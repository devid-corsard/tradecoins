import { ReactNode, createContext, useReducer } from 'react';
import PortfolioItemType from '../types/PortfolioItemType';
import { PortfolioContextType } from '../types/PortfolioContextType';
import { PortfolioActions, PortfolioActionsEnum } from '../types/PortfolioActions';
import { mockPortfolio } from '../mockData';
import { INITIAL_PORTFOLIO } from './inits';

export const PortfolioContext = createContext<PortfolioContextType>({
  portfolio: INITIAL_PORTFOLIO,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  dispatch: () => { },
});

type Props = { children: ReactNode };

export const PortfolioContextProvider = ({ children }: Props) => {
  const portfolioReducer = (
    state: PortfolioItemType[],
    action: PortfolioActions,
  ): PortfolioItemType[] => {
    switch (action.type) {
      case PortfolioActionsEnum.getPortfolio: {
        if (action.payload.id === 'testId') {
          return [...mockPortfolio];
        }
        return INITIAL_PORTFOLIO;
      }
      default:
        return state;
    }
  };

  const [portfolio, dispatch] = useReducer(portfolioReducer, INITIAL_PORTFOLIO);

  return (
    <PortfolioContext.Provider value={{ portfolio, dispatch }}>
      {children}
    </PortfolioContext.Provider>
  );
};
