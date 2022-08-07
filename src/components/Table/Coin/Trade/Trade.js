import EditTradeButtons from '../../../UI/EditTradeButtons';

const Trade = ({ state: trade }) => {
  console.log(trade);
  return (
    <div>
      <input defaultValue={trade.amount}></input>
      <input defaultValue={trade.buyPrice}></input>
      <input defaultValue={trade.spent}></input>
      <input defaultValue={trade.sellPrice}></input>
      <input defaultValue={trade.recieved}></input>
      <input defaultValue={trade.diff}></input>
      <EditTradeButtons />
    </div>
  );
};

export default Trade;
