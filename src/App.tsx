import { Header } from "./components/Header/Header";

import styles from './App.module.css'
import { PlusCircle } from "@phosphor-icons/react";
import { Task } from "./components/Task/Task";
import { ChangeEvent, FormEvent, useState } from "react";
import { getRndInteger } from "./main";

export interface TaskInterface{
  id: number;
  content: string;
  isTaskDone: boolean;
}

export function App() {

  const [tasks, setTasks] = useState([] as TaskInterface[])

  const [inputNewTask, setInputNewTask] = useState("");

  const [numberOfTasks, setNumberOfTasks] = useState(0)
  const [numberOfDoneTasks, setNumberOfDoneTasks] = useState(0)

  function handleTaskMarkedDone(taskToChange: TaskInterface){
    const newTasksWithTrueMarked = tasks

    newTasksWithTrueMarked.map(task=>{
      if(task.id == taskToChange.id){
        task.isTaskDone = !task.isTaskDone;

        if(task.isTaskDone){
          setNumberOfDoneTasks(numberOfDoneTasks + 1)
        }else{
          setNumberOfDoneTasks(numberOfDoneTasks - 1)
        }
      }
    })

    setTasks(()=>{
      return [...newTasksWithTrueMarked]
    });
  }

  function handleChangeNewTaskInput(event: ChangeEvent<HTMLInputElement>){
    event.preventDefault();

    setInputNewTask(event.target.value);
  }

  function handleCreateNewTask(event: FormEvent){
    event.preventDefault();

    const newIdForNewTask = getRndInteger();

    setNumberOfTasks((updatedNumberOfTasks)=>{
      return updatedNumberOfTasks + 1;
    })

    setTasks(()=>{
      return [...tasks, {id: newIdForNewTask, content: inputNewTask, isTaskDone: false}]
    })
  }

  function handleTaskDeleted(taskToDelete: TaskInterface){

    const newTaskList = tasks.filter(task=>{
      return task.id != taskToDelete.id;
    })

    setNumberOfTasks(numberOfTasks - 1)
    taskToDelete.isTaskDone ? setNumberOfDoneTasks(numberOfDoneTasks - 1) : setNumberOfDoneTasks(numberOfDoneTasks)

    setTasks(()=>{
      return [...newTaskList]
    })
  }

  return (
    <div>
      <Header />

      <div className={styles.wrapper}>

        <div className={styles.inputContainer}>
          <form onSubmit={handleCreateNewTask}>
            <input type="text" onChange={handleChangeNewTaskInput} placeholder="Adicione uma nova tarefa"/>
            <button type="submit">
              Criar
              <PlusCircle size={20}/>
            </button>
          </form>
        </div>

        <div className={styles.tasksContainer}>
          <div className={styles.tasksCounters}>
            
            <div>
              <span className={styles.titleCounter}>Tarefas Criadas</span> 
              <span className={styles.numberCounter}>{numberOfTasks}</span>
            </div>

            <div>
              <span className={styles.titleCounter2}>Tarefas Concluídas</span> 
              <span className={styles.numberCounter}>{numberOfDoneTasks > 0 ? `${numberOfDoneTasks} de ${numberOfTasks}` : 0}</span>
            </div>
          </div>

          <div className={styles.allTasks}>
            {
              tasks.map((task) =>{
                return <Task key={task.id} task={task} onTaskMarkedDone={handleTaskMarkedDone} onTaskDeleted={handleTaskDeleted}/>
              })
            }
          </div>
        </div>

      </div>
    </div>
  )
}