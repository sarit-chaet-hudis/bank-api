import { useState } from "react";
import bankApi from "../api/Api";

function Deposit() {
  const [passportId, setPassportId] = useState("");
  const [amount, setAmount] = useState("");

  const deposit = async (e) => {
    e.preventDefault();
    try {
      const res = await bankApi.put(`/deposit/${passportId}/${amount}`);
      console.log(res);
      setPassportId("");
      setAmount("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h3 style={{ color: "#5E1E80" }}>Deposit Money to User</h3>
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
          name="amount"
          placeholder="Amount"
          onChange={(e) => setAmount(e.target.value)}
          value={amount}
        ></input>
        <button type="submit" onClick={(e) => deposit(e)}>
          Make Deposit
        </button>
      </form>
    </div>
  );
}

export default Deposit;
