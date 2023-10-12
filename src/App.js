import { DragDropContext } from 'react-beautiful-dnd';
import Column from './Column/Column';
import initialData from './InitialData';
import './App.css';

function App() {
  const { columnOrder, columns, tasks } = initialData;

  async function onDragEnd(result) {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const column = columns[source.droppableId];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...column,
      taskIds: newTaskIds,
    };

    const newState = {
     
      columns: {
        ...columns,
        [newColumn.id]: newColumn,
      },
    };



  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <>
        {
          columnOrder.map(columnId => {
            const column = columns[columnId]
            const alltasks = column.taskIds.map(taskId => tasks[taskId])
            // console.log("🚀 ~ file: App.js:21 ~ App ~ alltasks:", alltasks)
            return <Column key={column.id} column={column} tasks={alltasks} />
          })
        }
      </>
    </DragDropContext>
  );
}

export default App;
