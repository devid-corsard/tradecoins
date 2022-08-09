const EditTableButtons = () => {
  const addNewCoin = () => alert('add coin');
  return (
    <div>
      <button onClick={addNewCoin}>Add new coin</button>
      <button>save to cp</button>
      <button>paste data</button>
      <button>reset</button>
      <button>recalculate</button>
    </div>
  );
};

export default EditTableButtons;
