import { useEffect, useState } from "react";
import todoList from "/FrontEnd/new_to_do_react/src/todoList";

const useToDoList = () => {
  const [inputTask, setTask] = useState("");
  const [todo, setTodoList] = useState(todoList);

  const handleInputChange = (evt) => {
    setTask(evt.target.value);
  };

  const createTask = () => {
    if (inputTask !== "") {
      const newTask = {
        task: inputTask,
        done: false,
        deadline: `${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}`,
      };
      setTodoList([...todo, newTask]);
      setTask("");
      sessionStorage.setItem("todoList", JSON.stringify([...todo, newTask]));
    }
  };

  useEffect(() => {
    const savedTask = JSON.parse(sessionStorage.getItem("todoList"));

    if (savedTask) {
      setTodoList(savedTask);
    }
  }, []);

  return { inputTask, handleInputChange, createTask, todo };
};

export default useToDoList;
