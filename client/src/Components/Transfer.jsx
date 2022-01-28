import { useState } from "react";
import bankApi from "../api/Api";

function Transfer() {
  const [passportIdFrom, setPassportIdFrom] = useState("");
  const [passportIdTo, setPassportIdTo] = useState("");
  const [amount, setAmount] = useState("");

  const transfer = async (e) => {
    e.preventDefault();
    try {
      const res = await bankApi.put(
        `/transfer/${passportIdFrom}/${passportIdTo}/${amount}`
      );
      console.log(res);
      setPassportIdFrom("");
      setPassportIdTo("");
      setAmount("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h3 style={{ color: "#3B80FF" }}> Transfer Between Accounts</h3>
      <form>
        <input
          type="text"
          name="passportIdFrom"
          placeholder="From Passport ID"
          onChange={(e) => setPassportIdFrom(e.target.value)}
          value={passportIdFrom}
        ></input>
        <input
          type="text"
          name="passportIdTo"
          placeholder="To Passport ID"
          onChange={(e) => setPassportIdTo(e.target.value)}
          value={passportIdTo}
        ></input>
        <input
          type="text"
          name="amount"
          placeholder="Amount"
          onChange={(e) => setAmount(e.target.value)}
          value={amount}
        ></input>
        <button type="submit" onClick={(e) => transfer(e)}>
          Transfer
        </button>
      </form>
    </div>
  );
}

export default Transfer;
