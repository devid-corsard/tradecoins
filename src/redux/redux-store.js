import { combineReducers, createStore } from "redux";
import tableReducer from "./table-reducer";

const reducers = combineReducers({
  tablePage: tableReducer,
})

let store = createStore(reducers);

export default store;