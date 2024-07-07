import { useTodo } from '../context/TodoProvider'
import Todo from './Todo'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import PlusIcon from './PlusIcon'
import Filter from './Filter'

export default function AllTasks() {
    const todo = useTodo()
    const todos = todo.todos

    const navigate = useNavigate()

    return (
        <>
            {
                todos.map((task) => (
                    <Todo
                        key={task.id}
                        title={task.title.length > 25 ? task.title.slice(0, 25) + '...' : task.title}
                        date={task.createDate}
                        description={task.description.length > 25 ? task.description.slice(0, 50) + '...' : task.description}
                        cardClick={() => navigate(`/task/${task.id}`)}
                        isComp={task.isCompleted}
                        handleRemove={(e) => {
                            e.stopPropagation();
                            todo.removeTodo(task.id)
                            toast.error('One Task Deleted')
                        }}
                        handleEdit={(e) => {
                            e.stopPropagation();
                            todo.setEditStaus(prev => !prev)
                            todo.setEditedText(task.title)
                            todo.setEditedDescription(task.description)
                            todo.setEditId(task.id)
                        }
                        }
                    />
                ))
            }
        </>
    )
}
