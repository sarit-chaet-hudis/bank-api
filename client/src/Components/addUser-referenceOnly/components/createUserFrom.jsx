import React, { useReducer } from "react";
import { INPUTS_ATTRIBUTES } from "../constants/addUser.constants";
import InputField from "./atoms/inputField";

const initialState = {
  passportId: "",
  cash: "",
  credit: "",
};

const reducer = (state = initialState, action) => {
  switch (action.name) {
    case "passportId":
      return { ...state, [action.name]: action.payload };
    case "cash":
      return { ...state, [action.name]: action.payload };
    case "credit":
      return { ...state, [action.name]: action.payload };
    default:
      return state;
  }
};

function CreateUserForm() {
  const [inputFields, dispatcher] = useReducer(reducer, initialState);

  const handleInput = ({ target: { value, name } }) => {
    const action = { name: name, payload: value };
    dispatcher(action);
  };

  return (
    <form>
      {INPUTS_ATTRIBUTES.map((inputAttribute) => {
        return (
          <InputField
            inputAttribute={inputAttribute}
            onChange={handleInput}
            value={inputFields[inputAttribute.name]}
            key={inputAttribute.name}
          />
        );
      })}
    </form>
  );
}

export default CreateUserForm;
