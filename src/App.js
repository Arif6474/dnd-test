import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column/Column";
import initialData from "./InitialData";
import "./App.css";
import { useState } from "react";

function App() {
  const [data, setData] = useState(initialData);

  const { columnOrder, columns, tasks } = data;

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

    const start = columns[source.droppableId];
    const finish = columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newColumns = {
        ...columns,
        [newColumn.id]: newColumn,
      };

      const newData = {
        ...data,
        columns: newColumns,
      };

      setData(newData);
    } else {
      const startTaskIds = Array.from(start.taskIds);
      startTaskIds.splice(source.index, 1);
      const newStart = {
        ...start,
        taskIds: startTaskIds,
      };

      const finishTaskIds = Array.from(finish.taskIds);
      finishTaskIds.splice(destination.index, 0, draggableId);
      const newFinish = {
        ...finish,
        taskIds: finishTaskIds,
      };

      const newData = {
        ...data,
        columns: {
          ...columns,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish,
        },
      };
      setData(newData);
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        {columnOrder.map((columnId) => {
          const column = columns[columnId];
          const alltasks = column.taskIds.map((taskId) => tasks[taskId]);
          // console.log("🚀 ~ file: App.js:21 ~ App ~ alltasks:", alltasks)
          return <Column key={column.id} column={column} tasks={alltasks} />;
        })}
      </div>
    </DragDropContext>
  );
}

export default App;
