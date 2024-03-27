import React from 'react';
import './styles/style.css'
import './App.css';
import Counter from './components/counter';
import { ToDo } from './components/todo';
import useToDoList from './components/useToDo';

function App() {

  const useToDo = useToDoList();

  return (
    <>
      <h1 className='title'>ToDo</h1>
      {/* <p className='title'>{count}</p> */}

    <div className="todo-list">

      <div className="actions">
        <input className="task-input" type="text" value={useToDo.inputTask} onChange={useToDo.handleInputChange} />
        <button className="btn" onClick={useToDo.createTask}>Создать</button>
      </div>

      <div className='actions'>
        <Counter></Counter>
      </div>

      <ul className='list'>
          {useToDo.todo.map((todoItem, i) => (<ToDo key = {i} isDone = {todoItem.done} title = {todoItem.task} />))}
      </ul>

    </div>
    </>
  );
}

export default App;
