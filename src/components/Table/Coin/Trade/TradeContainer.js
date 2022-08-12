import { editNumInputActionCreator } from '../../../../redux/table-reducer';
import EditTradeButtons from '../../../UI/EditTradeButtons';
import Trade from './Trade';

const TradeContainer = ({ state: trade, dispatch, coinId }) => {
  const onChange = (e) => {
    const action = editNumInputActionCreator(coinId, trade.tradeId, e.target.className, e.target.value);
    dispatch(action);
  };
  // ADDD MAX LENGHT FOR INPUTS
  return (
    <div>
      <Trade
        trade={trade}
        input={{action: onChange}}
      />
      <EditTradeButtons />
    </div>
  );
};

export default TradeContainer;
