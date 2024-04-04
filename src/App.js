import "./styles/style.css";
import "./App.css";
import Counter from "./components/counter";
import { ToDo } from "./components/todo";
import useToDoList from "./components/useToDo";
import { useState } from "react";
import menuItems from "./components/menuItems.";
import drinks from "./drinks";

function App() {
  const useToDo = useToDoList();

  const [filter, setFilter] = useState("all");
  const [mode, setMode] = useState("todo");
  const [title, setTitle] = useState("ToDo");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuOpen2, setIsMenuOpen2] = useState(false);

  const handleFilterChange = (filterType) => {
    setFilter(filterType);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleMenu2 = () => {
    setIsMenuOpen2(!isMenuOpen2);
  };

  return (
    <>
      <h1 className="title">{title}</h1>

      <div className="actions">
        <button
          className={"btn"}
          onClick={() => {
            setMode("menu");
            setTitle("Menu");
          }}
        >
          🍴Menu
        </button>
        <button
          className={"btn"}
          onClick={() => {
            setMode("todo");
            setTitle("ToDo");
          }}
        >
          📃ToDo
        </button>
      </div>

      {mode === "todo" && (
        <div className="todo-list">
          <div className="actions">
            <input className="task-input" type="text" value={useToDo.inputTask} onChange={useToDo.handleInputChange} />
            <button className="btn" onClick={useToDo.createTask}>Создать</button>
          </div>

          <div className="actions">
            <Counter></Counter>
          </div>

          <div className="actions">
            <button className={"btn"} onClick={() => handleFilterChange("all")}>
              Всё
            </button>
            <button className={"btn"} onClick={() => handleFilterChange("done")}>
              Выполнено
            </button>
            <button className={"btn"} onClick={() => handleFilterChange("not done")}>
              Не выполнено
            </button>
          </div>

          <ul className="list">
            {useToDo.todo
              .filter((todoItem) => {
                if (filter === "done") return todoItem.done;
                if (filter === "not done") return !todoItem.done;
                return true;
              })
              .map((todoItem, i) => (
                <ToDo
                  key={todoItem.task + i}
                  id={i}
                  isDone={todoItem.done}
                  title={todoItem.task}
                  setTodoList={useToDo.setTodoList}
                  todo={useToDo.todo}
                />
              ))}
          </ul>
        </div>
      )}


      {/* надо перенести в отдельный компонент*/}
      {mode === "menu" && (
        <>
        <div className="todo-list">
          <div>
            <button className="btn" onClick={toggleMenu}>🍔Hamburger</button>
            {isMenuOpen && (
              <div className="list">
                <ul>
                  {menuItems.map((item, i) => (
                    <li key={i}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div>
            <button className="btn-menu" onClick={toggleMenu2}>🍹Drinks</button>
            {isMenuOpen2 && (
              <div className="list">
                <ul>
                  {drinks.map((item, i) => (
                    <li key={i}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>  
        </>
      )}
    </>
  );
}

export default App;
