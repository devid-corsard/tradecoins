import EditTableButtons from './components/UI/EditTableButtons';
import Table from './components/Table/Table';

const App = (props) => {
  return (
    <div className="App">
      <Table state={props.state.table} />
      <EditTableButtons />
    </div>
  );
};

export default App;
