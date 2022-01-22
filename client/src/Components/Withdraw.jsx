import { useState } from "react";
import bankApi from "../api/Api";

function Withdraw() {
  const [passportId, setPassportId] = useState("");
  const [amount, setAmount] = useState("");

  const withdraw = async (e) => {
    e.preventDefault();
    try {
      const res = await bankApi.put(
        `/withdraw?passportId=${passportId}&amount=${amount}`
      );
      console.log(res);
      setPassportId("");
      setAmount("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h3 style={{ color: "#314bf1" }}> Withdraw Money from Account</h3>
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
        <button type="submit" onClick={(e) => withdraw(e)}>
          Withdraw Amount
        </button>
      </form>
    </div>
  );
}

export default Withdraw;
