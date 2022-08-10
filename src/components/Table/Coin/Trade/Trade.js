import { editNumInputActionCreator } from '../../../../redux/state';
import EditTradeButtons from '../../../UI/EditTradeButtons';



const Trade = ({ state: trade, dispatch, coinId }) => {
  const onChange = (e) => {
    const action = editNumInputActionCreator(coinId, trade.tradeId, e.target.className, e.target.value);
    dispatch(action);
  };
  // ADDD MAX LENGHT FOR INPUTS
  return (
    <div>
      <input
        className="amount"
        value={trade.amount}
        placeholder="amount"
        onChange={onChange}
      />
      <input
        className="buyPrice"
        value={trade.buyPrice}
        placeholder="buy price"
        onChange={onChange}
      />
      <input value={trade.spent} placeholder="spent" disabled readOnly />
      <input
        className="sellPrice"
        value={trade.sellPrice}
        placeholder="sell price"
        onChange={onChange}
      />
      <input value={trade.recieved} placeholder="recieved" disabled readOnly />
      <input value={trade.diff} placeholder="diff" disabled readOnly />
      <EditTradeButtons />
    </div>
  );
};

export default Trade;
