import bankApi from "./api/Api";

function App() {
  const getAll = async () => {
    const { data } = await bankApi.get("/allusers");
    console.log(data);
  };

  return (
    <div className="App">
      <h1>hello world in the second time</h1>
      <button onClick={getAll}>get all users</button>
    </div>
  );
}

export default App;
