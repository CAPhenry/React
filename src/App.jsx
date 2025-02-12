import { useEffect, useState } from "react";
import AddTasks from "./components/AddTask";
import Tasks from "./components/tasks";

import { v4 } from "uuid";


function App() {


  const[task, setTasks] = useState(

    JSON.parse(localStorage.getItem("tasks")) || []

  )



  useEffect(  ()=>{ 

    localStorage.setItem("tasks", JSON.stringify(task))



  },[task]    )







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
    const newTask = task.filter(task => task.id === taskId);
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

      <h1 className="text-3xl text-slate-100 font-bold text-center">Gerenciador de tarefas</h1>

      <AddTasks onAddTaskSubmit={onAddTaskSubmit} />

      <Tasks tasks={task} onTaskClick={onTaskClick}  onDeleteTask={onDeleteTask}/>

    </div>



    </div>
  );
}

export default App;
