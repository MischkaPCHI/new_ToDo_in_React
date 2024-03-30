import React, { useState, useEffect } from "react";

export const ToDo = (props) => {
  const { id, isDone, title, setTodoList, todo } = props;

  const [isDoneState, setIsDone] = useState(isDone);

  useEffect(() => {
    const storedIsDone = sessionStorage.getItem(`todo_${id}`);
    if (storedIsDone !== null) {
      setIsDone(JSON.parse(storedIsDone));
    }
  }, [id]);

  const clickToggle = () => {
    const updatedTodoList = todo.map(item => {
      if (item.task === title) {
        return { ...item, done: !isDoneState };
      }
      return item;
    });
    setTodoList(updatedTodoList);
    setIsDone(!isDoneState);
    sessionStorage.setItem(`todo_${id}`, JSON.stringify(!isDoneState));
  };

  return (
    <li key={id} className={isDoneState ? "list-item_done" : "list-item"} onClick={clickToggle}>
      {title}
    </li>
  );
};
