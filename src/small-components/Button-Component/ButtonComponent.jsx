import "./button-component.scss";
const ButtonComponent = ({ children, activeSearchBtn, clickHandler, type }) => {
  const btnVariant = ` ${type === "error" ? "danger" : "primary"}--`;
  return (
    <button
      className={`${btnVariant}button--component ${activeSearchBtn} `}
      onClick={clickHandler}
    >
      {children}
    </button>
  );
};
export default ButtonComponent;
