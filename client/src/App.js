import AddUser from "./Components/AddUser";
import Deposit from "./Components/Deposit";
import Withdraw from "./Components/Withdraw";
import bankApi from "./api/Api";

function App() {
  const getAll = async () => {
    const { data } = await bankApi.get("/allusers");
    console.log(data);
  };

  return (
    <div className="App">
      <h1>Bank Manager Web Interface</h1>
      <button onClick={getAll}>get all users</button>
      <AddUser />
      <Deposit />
      <Withdraw />
    </div>
  );
}

export default App;
