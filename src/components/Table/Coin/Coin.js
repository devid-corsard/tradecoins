const Coin = (props) => {
  return (
    <div>
      <input
        value={props.input.value}
        placeholder={props.input.placeholder}
        maxLength={props.input.maxLength}
        onChange={props.input.action}
      />
      <div>{props.trades}</div>
      <button onClick={props.button.addAction}>{props.button.name}</button>
      <hr />
    </div>
  );
};

export default Coin;
