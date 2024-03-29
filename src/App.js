import "./styles/style.css";
import "./App.css";
import Counter from "./components/counter";
import { ToDo } from "./components/todo";
import useToDoList from "./components/useToDo";
import { useState } from "react";
import menuItems from "./components/menuItems.";

function App() {
  const useToDo = useToDoList();
  const array = useToDo.todo;

  const [filter, setFilter] = useState("all");
  const [mode, setMode] = useState("todo");
  const [title, setTitle] = useState("ToDo");

  const handleFilterChange = (filterType) => {
    setFilter(filterType);
  }

  return (
    <>
      <h1 className="title">{title}</h1>

      <div className="actions">
        <button className={'btn'} onClick={() => {setMode("menu"); setTitle('🍔Hamburger Menu🍔')}}>🍴Menu</button>
        <button className={'btn'} onClick={() => {setMode("todo"); setTitle('ToDo')}}>📃ToDo</button>
      </div>

      {mode === "todo" &&(
        <div className="todo-list">
          <div className="actions">
            <input className="task-input" type="text" value={useToDo.inputTask} onChange={useToDo.handleInputChange} />
            <button className="btn" onClick={useToDo.createTask}>
              Создать
            </button>
          </div>

          <div className="actions">
            <Counter></Counter>
          </div>

          <div className="actions">
            <button className={'btn'} onClick={() => handleFilterChange('all')}>Всё</button>
            <button className={'btn'} onClick={() => handleFilterChange('done')}>Выполнено</button>
            <button className={'btn'} onClick={() => handleFilterChange('undone')}>Не выполнено</button>
          </div>

          <ul className="list">
            {array
              .filter(todoItem => {
                if (filter === 'done') return todoItem.done;
                if (filter === 'undone') return !todoItem.done;
                return true;
              })
              .map((todoItem, i) => (
                <ToDo key={todoItem.task + i} id={i} isDone={todoItem.done} title={todoItem.task} setTodoList={useToDo.setTodoList} todo={useToDo.todo}/>
              ))}
          </ul>
        </div>
      )}

      {mode === "menu" &&(
        <div className="todo-list">
          <ul className="list">
            {menuItems.map((item, index) => (
              <li className="list-item" key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default App;