import { Dispatch } from 'react';
import PortfolioItemType from './PortfolioItemType';
import { PortfolioActions } from './PortfolioActions';

export type PortfolioContextType = {
  portfolio: PortfolioItemType[],
  dispatch: Dispatch<PortfolioActions>
};
