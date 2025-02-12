import { useEffect, useState } from "react";
import AddTasks from "./components/AddTask";
import Tasks from "./components/tasks";
import { v4 } from "uuid";
import Title from "./components/Title";

function App() {

  const[task, setTasks] = useState(
    JSON.parse(localStorage.getItem("SavedTasks")) || []
  )
  useEffect(()=>{ 
    localStorage.setItem("SavedTasks", JSON.stringify(task))
  },[task])

  // useEffect(()=>{ 
  //   const fetchTasks = async () => {
  //     const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10',{
  //       method:'GET'
  //     })
  //     const data = await response.json()
  //     setTasks(data)
  //   }
  //   // fetchTasks();
  // },[])

  function onTaskClick(taskId){
    const newTask = task.map(task => {
      if (task.id === taskId){
        return { ...task,  isCompleted: !task.isCompleted}
      }
      return task
    })
    setTasks(newTask)
  }

  function onDeleteTask(taskId){
    const newTask = task.filter(task => task.id !== taskId);
    setTasks(newTask)
  }

  function onAddTaskSubmit(title,description){
    const newTask = {
      id: v4(),
      title,
      description,
      isCompleted: false,
    }
    setTasks([...task,newTask])
  }

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6" >
      <div className="w-[500p] space-y-4">
        <Title>Gerenciador de tarefas</Title>
        <AddTasks onAddTaskSubmit={onAddTaskSubmit} />
        <Tasks tasks={task} onTaskClick={onTaskClick}  onDeleteTask={onDeleteTask}/>
      </div>
    </div>
  );
}
export default App;