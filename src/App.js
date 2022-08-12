import Table from './components/Table/Table';
import EditTableButtonsContainer from './components/UI/EditTableButtonsContainer';

const App = (props) => {
  return (
    <div className="App">
      <Table
        state={props.state.tablePage.table}
        dispatch={props.dispatch}
      />
      <EditTableButtonsContainer dispatch={props.dispatch} />
    </div>
  );
};

export default App;
