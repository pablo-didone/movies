import React from "react";

import "./Message.css";

const Message = ({ type, children }) => {
  return <p className={`Message ${type}`}>{children}</p>;
};

export default Message;
