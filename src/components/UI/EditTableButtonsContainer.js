import { addNewCoinActionCreator } from "../../redux/table-reducer";
import AButton from "./AButton";

const EditTableButtonsContainer = (props) => {
  const addNewCoin = () => props.dispatch(addNewCoinActionCreator());
  return (
    <div>
      <AButton action={addNewCoin} name='Add new coin'/>
      <button>save to cp</button>
      <button>paste data</button>
      <button>reset</button>
      <button>recalculate</button>
    </div>
  );
};

export default EditTableButtonsContainer;
