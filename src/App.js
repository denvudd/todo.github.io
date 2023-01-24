import { useEffect, useState } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import Task from './components/Task';

function App() {
  const [tasks, setTasks] = useState([]);

  const numberComplete = tasks.filter(item => item.done).length;
  const numberTotal = tasks.length;

  useEffect(() => {
      const tasks = JSON.parse(localStorage.getItem('tasks'));
      setTasks(tasks);
  }, [])

  useEffect(() => {
    if (tasks.length === 0) {
      return;
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  function addTask(name) {
    setTasks(prev => {
      return [...prev, {name: name, done: false}];
    })
  }

  function removeTask(index) {
    setTasks(prev => {
      return prev.filter((item, i) => {
       return i !== index;
      })
    })
  }

  function renameTask(index, newName) {
    setTasks(prev => {
      const newTasks = [...prev];
      newTasks[index].name = newName;
      return newTasks;
    })
  }

  function updateTaskDone(index, newDone) {
    setTasks(prev => {
      const newTasks = [...prev];
      newTasks[index].done = newDone;
      return newTasks;
    });
  }

  function getMessage() {
    const percentage = numberComplete / numberTotal * 100;

    if (tasks.length === 0) {
      return '';
    }
    if (percentage === 0) {
      return 'Try to do at least 1! 🙏'
    }
    if (percentage === 100) {
      return 'Nice job for today! 🏝️'
    }
    return 'Keep it going 💪';
  }

  return (
    <main className="App">
      {tasks.length === 0 ? 
      <h1 className="complete-title">This is time to work! 💻</h1> :
      <h1 className="complete-title">{numberComplete}/{numberTotal} Complete</h1>
      }
      <h2 className="message">{getMessage()}</h2>
      <TaskForm onAdd={name => addTask(name)}/>
      {tasks.map((item, index) => (
        <Task key={index}
              {...item} 
              onToggle={done => updateTaskDone(index, done)}
              onDelete={() => removeTask(index)}
              onRename={newName => renameTask(index, newName)} />
        ))
      }
      
    </main>
  );
}

export default App;
