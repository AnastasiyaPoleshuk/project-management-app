import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { Draggable } from 'react-beautiful-dnd';
import { useParams } from 'react-router-dom';
import { ITaskResponse } from '../../types/board';
import useAppDispatch from '../../hooks/useAppDispatch';
import { editTask, removeTask } from '../../redux/thunks/boardThunks';
import TaskForm from '../TaskForm/TaskForm';
import Modal from '../Modal/Modal';
import './Task.scss';
import useTypedSelector from '../../hooks/useTypedSelector';

type TaskProps = {
  task: ITaskResponse;
  columnId: string;
  index: number;
};

type FormValues = {
  title: string;
  description: string;
};

const Task = ({ task, columnId, index }: TaskProps) => {
  const { id: taskId, title, description, order, userId } = task;

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const token = useTypedSelector((state) => state.auth.token) as string;
  const boardId = useParams().boardId as string;
  const dispatch = useAppDispatch();

  const onDelete = async () => {
    try {
      await dispatch(removeTask({ boardId, columnId, taskId, token }));
      setIsDeleteOpen(false);
    } catch (err) {
      console.error('Failed to delete the task: ', err);
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const taskData = {
        title: data.title,
        order,
        description: data.description,
        userId,
        boardId,
        columnId,
      };
      await dispatch(editTask({ boardId, columnId, taskId, task: taskData, token }));
      setIsEditOpen(false);
    } catch (err) {
      console.error('Failed to edit the task: ', err);
    }
  };

  return (
    <>
      <Draggable draggableId={taskId} index={index}>
        {(provided) => (
          <li
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className="card-item"
          >
            <div className="card-title-wrapper">
              {title}
              <div className="card-btn-wrapper">
                <button
                  type="button"
                  aria-label="Edit"
                  className="card-btn edit-btn"
                  onClick={() => setIsEditOpen(true)}
                >
                  &#9998;
                </button>
                <button
                  type="button"
                  aria-label="Delete"
                  className="card-btn delete-task-btn"
                  onClick={() => setIsDeleteOpen(true)}
                >
                  &#10006;
                </button>
              </div>
            </div>
          </li>
        )}
      </Draggable>
      {isEditOpen && (
        <Modal title="Edit task" onCancel={() => setIsEditOpen(false)}>
          <TaskForm
            onSubmit={onSubmit}
            onCancel={() => setIsEditOpen(false)}
            values={{ title, description }}
          />
        </Modal>
      )}
      {isDeleteOpen && (
        <Modal title="" onCancel={() => setIsDeleteOpen(false)}>
          <h3 className="confirm-title">Are you sure?</h3>
          <div className="btn-wrapper">
            <button type="button" className="modal-btn" onClick={onDelete}>
              Yes
            </button>
            <button type="button" className="modal-btn" onClick={() => setIsDeleteOpen(false)}>
              No
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Task;
