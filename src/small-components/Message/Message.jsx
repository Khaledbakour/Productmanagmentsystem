//  STYLE FILE
import "./Message.scss";
const Message = ({ type, children }) => {
  const className = `${type === "error" ? "error" : "success"}--`;
  return <div className={`${className}message`}>{children}</div>;
};

export default Message;
