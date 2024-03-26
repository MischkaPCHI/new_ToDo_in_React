import React, { useEffect, useState } from 'react';
import './styles/style.css'
import './App.css';
import Counter from './components/counter';
import todoList from './todoList';

const ToDo = (props) => {
  const [isDone, setIsDone] = useState(props.isDone);

  const clickToggle = () => {
    setIsDone(!isDone);
  };

  return (
    <li className={isDone ? 'list-item_done' : 'list-item'} onClick={clickToggle}>{props.title}</li>
  );
};

function App() {

  const [inputTask, setTask] = useState('');
  const [todo, setTodoList] = useState(todoList);

  const handleInputChange = (evt) => {
    setTask(evt.target.value);
  };

  const createTask = () => {
    if (inputTask !== '') {

      const newTask = {
        task: inputTask,
        done: false,
        deadline: `${new Date().getDate()}-${new Date().getMonth()+1}-${new Date().getFullYear()}`
      };
      setTodoList([...todo, newTask]);
      setTask('');
      sessionStorage.setItem("todoList", JSON.stringify([...todo, newTask]));
    }
  };

  useEffect(() => {
  const savedTask = JSON.parse(sessionStorage.getItem("todoList"));

  if (savedTask) {
    setTodoList(savedTask);
  }
  },[]);



  return (
    <>
      <h1 className='title'>ToDo</h1>
      {/* <p className='title'>{count}</p> */}

    <div className="todo-list">

      <div className="actions">
        <input className="task-input" type="text" value={inputTask} onChange={handleInputChange} />
        <button className="btn" onClick={createTask}>Создать</button>
      </div>

      <div className='actions'>
        <Counter></Counter>
      </div>

      <ul className='list'>
          {todo.map((todo, i) => (<ToDo key = {i} isDone = {todo.done} title = {todo.task} />))}
      </ul>

    </div>
    </>
  );
}

export default App;
