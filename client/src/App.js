import AddUser from "./Components/AddUser";
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
    </div>
  );
}

export default App;
