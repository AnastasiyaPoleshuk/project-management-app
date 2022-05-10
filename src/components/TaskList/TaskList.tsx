import React from 'react';

import { ITask } from '../../model/interfaces';
import Task from '../Task/Task';
import './TaskList.scss';

type TaskListProps = {
  tasks: ITask[];
};

const TaskList = ({ tasks }: TaskListProps) => {
  return (
    <ul className="card-list">
      {Boolean(tasks.length) && tasks.map((task) => <Task key={task.id} task={task} />)}
    </ul>
  );
};

export default TaskList;