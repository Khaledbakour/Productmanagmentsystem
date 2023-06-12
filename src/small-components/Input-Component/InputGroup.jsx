import { useState } from "react";
import "./input-group.scss";
import formatNumberToPrice from "../../service/formatNumberToPrice";
const InputGroup = ({ info, ChangeHandler }) => {
  const [inputErrorClassName, set_InputErrorClassName] = useState(false);

  const isNotEmpty = info.value ? "input--group--not--empty" : "";
  function checkInput(event) {
    const { value } = event.target;
    set_InputErrorClassName(
      !value ? "input--group--error" : "input--group--not--empty"
    );
  }

  function NoSymbols(event) {
    const exceptThisSymbols = ["e", "E", "+", "-"];
    exceptThisSymbols.includes(event.key) && event.preventDefault();
  }

  function focusHandler(event) {
    const { value } = event.target;
    event.target.value = value.replace(/\$|\,\.0{2}|0$/g,'');
    event.target.type = "number";
  }

  function blurHandler(event) {
    event.target.type = "text";
    event.target.value = formatNumberToPrice(event.target.value);
  }

  return (
    <div className={`input--group ${inputErrorClassName} ${isNotEmpty} `}>
      <label htmlFor={info.id}> {info.label} </label>
      <input
        type={info.type}
        id={info.id}
        value={info.value.trimStart()}
        name={info.name}
        onChange={ChangeHandler}
        onKeyUp={info.id !== "search" ? checkInput : null}
        onKeyDown={info.type === "number" ? NoSymbols : null}
        onFocus={info.name === "price" ? focusHandler : null}
        onBlur={info.name === "price" ? blurHandler : null}
      />
    </div>
  );
};
export default InputGroup;
