import { Droppable } from 'react-beautiful-dnd';
import { ITaskResponse } from '../../types/board';
import Task from '../Task/Task';
import './TaskList.scss';

type TaskListProps = {
  tasks: ITaskResponse[];
  columnId: string;
};

const TaskList = ({ tasks, columnId }: TaskListProps) => {
  const orderedTasks = tasks.slice().sort((a, b) => a.order - b.order);

  return (
    <Droppable droppableId={columnId} type="task">
      {(provided) => (
        <ul className="card-list" ref={provided.innerRef} {...provided.droppableProps}>
          {Boolean(orderedTasks.length) &&
            orderedTasks.map((task, index) => (
              <Task key={task.id} task={task} columnId={columnId} index={index} />
            ))}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
};

export default TaskList;
