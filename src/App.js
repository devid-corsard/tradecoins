import EditTableButtons from './components/UI/EditTableButtons';
import Table from './components/Table/Table';

const App = (props) => {
  return (
    <div className="App">
      <Table
        state={props.state.tablePage.table}
        dispatch={props.dispatch}
      />
      <EditTableButtons dispatch={props.dispatch} />
    </div>
  );
};

export default App;
