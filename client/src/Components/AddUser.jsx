import { useState } from "react";
import bankApi from "../api/Api";

function AddUser() {
  const [passportId, setPassportId] = useState("");
  const [cash, setCash] = useState("");
  const [credit, setCredit] = useState("");

  const addUser = async (e) => {
    e.preventDefault();
    const newUser = { passportId, cash, credit };
    try {
      const res = await bankApi.post("/add", newUser);
      console.log(res);
      setPassportId("");
      setCash("");
      setCredit("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h3>Add User to Bank</h3>
      <form>
        <input
          type="text"
          name="passportId"
          placeholder="Passport ID"
          onChange={(e) => setPassportId(e.target.value)}
          value={passportId}
        ></input>
        <input
          type="text"
          name="cash"
          placeholder="Cash (optional)"
          onChange={(e) => setCash(e.target.value)}
          value={cash}
        ></input>
        <input
          type="text"
          name="credit"
          placeholder="Credit (optional)"
          onChange={(e) => setCredit(e.target.value)}
          value={credit}
        ></input>
        <button type="submit" onClick={(e) => addUser(e)}>
          Add User
        </button>
      </form>
    </div>
  );
}

export default AddUser;
