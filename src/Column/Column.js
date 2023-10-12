
import { Droppable } from 'react-beautiful-dnd'
import Task from '../Task/Task'
import './Column.css'

function Column({ column, tasks }) {
    return (
        <div className="container">
            <h1 className="title">{column.title}</h1>
            <Droppable droppableId={column.id}>
                {provided => (
                    <div className="task_list"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {
                            tasks.map((task, index) => <Task key={task.id} task={task} index={index} />)
                        }
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    )
}

export default Column