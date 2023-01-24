import { useState } from "react";

function TaskForm({onAdd}) {
  const [taskName, setTaskName] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onAdd(taskName);
    setTaskName('');
  }

  return (
      <form onSubmit={e => handleSubmit(e)}>
        <button>+</button>
        <input className="form-input"
               type="text" 
               value={taskName} 
               onChange={(e) => setTaskName(e.target.value)} 
               placeholder="Input the new task..."/>
      </form>
  )
}

export default TaskForm;