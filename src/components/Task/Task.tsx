import { CheckCircle, Circle, Trash } from '@phosphor-icons/react'
import styles from './Task.module.css'
import { TaskInterface } from '../../App'

interface TaskProps{
    task: TaskInterface;
    onTaskMarkedDone: (task: TaskInterface) => void;
    onTaskDeleted: (task: TaskInterface) => void;
}

export function Task({task, onTaskMarkedDone, onTaskDeleted}: TaskProps){

    function handleTaskMarked(){
        onTaskMarkedDone(task)
    }

    function handleTaskDelete(){
        onTaskDeleted(task)
    }

    return(
        <div className={styles.task}>
            <button onClick={handleTaskMarked} className={styles.toggleTask}>
                {
                    (()=> {
                        if(task.isTaskDone){
                            return (<CheckCircle className={styles.circleFilledForTaskDone} weight='fill' size={24}/>)
                        }else{
                            return (<Circle className={styles.circleFilledForTaskNotDone} weight='regular' size={24}/>)
                        }
                    })()
                }
                
            </button>

            {
                (()=> {
                    if(task.isTaskDone){
                        return (<p className={styles.paragraphForTaskDone}>{task.content}</p>)
                    }else{
                        return (<p className={styles.paragraphForTaskNotDone}>{task.content}</p>)
                    }
                })()
            }

            <button onClick={handleTaskDelete} className={styles.trashIcon}>
                <Trash size={24}/>
            </button>
        </div>
    )
}