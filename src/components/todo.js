import React, { useState } from "react";

export const ToDo = (props) => {
  const [isDone, setIsDone] = useState(props.isDone);

  const clickToggle = () => {
    setIsDone(!isDone);
  };

  return (
    <li className={isDone ? "list-item_done" : "list-item"} onClick={clickToggle}>
      {props.title}
    </li>
  );
};
