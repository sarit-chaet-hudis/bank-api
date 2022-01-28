import { useState } from "react";
import bankApi from "../api/Api";

function DeleteUser() {
  const [passportId, setPassportId] = useState("");

  const deleteUser = async (e) => {
    e.preventDefault();
    try {
      const res = await bankApi.delete(`/delete/${passportId}`);
      console.log(res);
      setPassportId("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h3 style={{ color: "#38BFF4" }}>&#10006; Delete User</h3>
      <form>
        <input
          type="text"
          name="passportId"
          placeholder="Passport ID"
          onChange={(e) => setPassportId(e.target.value)}
          value={passportId}
        ></input>
        <button type="submit" onClick={(e) => deleteUser(e)}>
          Delete User
        </button>
      </form>
    </div>
  );
}

export default DeleteUser;
