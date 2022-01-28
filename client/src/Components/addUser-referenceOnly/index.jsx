import React from "react";
import CreateUserForm from "./components/createUserFrom";

// const addUser = async (e) => {
//   e.preventDefault();
//   const newUser = { passportId, cash, credit };
//   try {
//     const response = await bankApi.post("/add", newUser);
//   } catch (err) {
//     console.log(err);
//   }
// };

// {
//   /* <button type="submit" onClick={(e) => addUser(e)}>
//         Add User
//       </button> */
// }

function AddUser() {
  return (
    <div>
      <h3 style={{ color: "#952312" }}>&#10010; Add User to Bank</h3>
      <CreateUserForm />
    </div>
  );
}

// export default AddUser;
