import React from "react";

const Error = ({ error }) => {
  const message = error.message.split(":")[1];
  return <p>{message}</p>;
};

export default Error;
