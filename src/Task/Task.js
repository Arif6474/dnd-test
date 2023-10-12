import { Draggable } from 'react-beautiful-dnd'
import './Task.css'

function Task({ task, index }) {
    return (
        <Draggable draggableId={task.id} index={index}>
            {provided => (
                <div className="task_container"
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <p>{task.content}</p>
                </div>
            )}
        </Draggable>
    )
}

export default Task