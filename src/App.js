import React, { useEffect, useState } from 'react';
import './styles/style.css'
import './App.css';
import audio from './sound/Kozel-Oret.mp3';

let todoList = [
  {task: "Купить молоко", done: false, deadline: "2024-02-23"},
  {task: "Заплатить за интернет", done: true, deadline: "2024-02-20"},
  {task: "Позвонить маме", done: false, deadline: "2024-02-22"},
  {task: "Почитать книгу", done: false, deadline: "2024-02-28"},
  {task: "Сделать домашнее задание", done: true, deadline: "2024-02-21"},
  {task: "Посмотреть фильм", done: false, deadline: "2024-02-24"},
  {task: "Помыть посуду", done: true, deadline: "2024-02-22"},
  {task: "Погулять с собакой", done: false, deadline: "2024-02-23"},
  {task: "Заказать пиццу", done: false, deadline: "2024-02-25"},
  {task: "Посетить врача", done: true, deadline: "2024-02-20"},
  {task: "Починить компьютер", done: false, deadline: "2024-02-26"},
  {task: "Подарить цветы подруге", done: true, deadline: "2024-02-21"},
  {task: "Поиграть в видеоигры", done: false, deadline: "2024-02-27"},
  {task: "Послать резюме", done: true, deadline: "2024-02-20"},
  {task: "Поехать в отпуск", done: false, deadline: "2024-02-29"}
];

const alertSound = new Audio(audio);

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

  const [count, setCount] = useState(0);

  function createCounterPlus () {

    return function () {
      return setCount(count + 1);
    }
  }
  
  function createCounterMinus () {

    return function () {
      if(count !== 0){
        return setCount(count - 1);        
      } else {
        alertSound.play();
        alert('Ниже 0 не идёт )');
      }
    }
  }

  const counterPlus = createCounterPlus();
  const counterMinus = createCounterMinus();


  return (
    <>
      <h1 className='title'>ToDo</h1>
      <p className='title'>{count}</p>

    <div className="todo-list">

      <div className="actions">
        <input className="task-input" type="text" value={inputTask} onChange={handleInputChange} />
        <button className="btn" onClick={createTask}>Создать</button>
        <button className="btn" onClick={counterPlus}>+</button>
        <button className="btn" onClick={counterMinus}>-</button>
      </div>

      <ul className='list'>
          {todo.map((todo, i) => (<ToDo key = {i} isDone = {todo.done} title = {todo.task} />))}
      </ul>

    </div>
    </>
  );
}

export default App;
