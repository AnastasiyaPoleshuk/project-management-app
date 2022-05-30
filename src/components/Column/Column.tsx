import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Draggable } from 'react-beautiful-dnd';
import { useParams } from 'react-router-dom';
import { getUserId } from '../../api/apiService';
import useAppDispatch from '../../hooks/useAppDispatch';
import { IColumnResponse } from '../../types/board';
import TaskForm from '../TaskForm/TaskForm';
import Modal from '../Modal/Modal';
import TaskList from '../TaskList/TaskList';
import { addTask, editColumn, removeColumn } from '../../redux/thunks/boardThunks';
import './Column.scss';
import useTypedSelector from '../../hooks/useTypedSelector';

type ColumnProps = {
  column: IColumnResponse;
  index: number;
};

type FormValues = {
  title: string;
  description: string;
};

type ColumnFormValues = {
  columnTitle: string;
};

const Column = ({ column, index }: ColumnProps) => {
  const { id: columnId, title, tasks, order } = column;
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [isDeleteColumnOpen, setIsDeleteColumnOpen] = useState(false);
  const [isTitleEdit, setIsTitleEdit] = useState(false);

  const token = useTypedSelector((state) => state.auth.token) as string;
  const dispatch = useAppDispatch();
  const boardId = useParams().boardId as string;
  const userId = getUserId(token);

  const { register, handleSubmit, setValue } = useForm<ColumnFormValues>({
    defaultValues: { columnTitle: title },
  });

  const onColumnFormSubmit: SubmitHandler<ColumnFormValues> = async (data) => {
    try {
      const columnData = {
        title: data.columnTitle,
        order,
      };
      await dispatch(editColumn({ boardId, columnId, column: columnData, token }));
      setIsTitleEdit(false);
    } catch (err) {
      console.error('Failed to update the column: ', err);
    }
  };

  const onColumnFormCancel = () => {
    setIsTitleEdit(false);
    setValue('columnTitle', title);
  };

  const onTaskFormSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const taskData = {
        title: data.title,
        description: data.description,
        userId,
      };
      await dispatch(addTask({ boardId, columnId, task: taskData, token }));
      setIsAddTaskOpen(false);
    } catch (err) {
      console.error('Failed to add the task: ', err);
    }
  };

  const onTaskFormCancel = () => {
    setIsAddTaskOpen(false);
  };

  const onDeleteColumnClick = async () => {
    try {
      await dispatch(removeColumn({ boardId, columnId, token }));
      setIsDeleteColumnOpen(false);
    } catch (err) {
      console.error('Failed to delete the column: ', err);
    }
  };

  const onDeleteColumnCancel = () => {
    setIsDeleteColumnOpen(false);
  };

  return (
    <>
      <Draggable draggableId={columnId} index={index}>
        {(provided) => (
          <div className="column-item" {...provided.draggableProps} ref={provided.innerRef}>
            <div className="column-title-wrapper" {...provided.dragHandleProps}>
              {isTitleEdit ? (
                <form className="column-title-form" onSubmit={handleSubmit(onColumnFormSubmit)}>
                  <input
                    type="text"
                    className="column-title-input"
                    {...register('columnTitle', { required: true })}
                    autoFocus
                    onClick={() => setIsTitleEdit(true)}
                    placeholder="Enter column title"
                    autoComplete="off"
                  />
                  <div className="column-title-btns">
                    <button type="submit" aria-label="Edit" className="column-btn check-btn">
                      &#10004;
                    </button>
                    <button
                      type="button"
                      aria-label="Cancel"
                      className="column-btn cancel-btn"
                      onClick={onColumnFormCancel}
                    >
                      &#10008;
                    </button>
                  </div>
                </form>
              ) : (
                <h3 className="column-title" onClick={() => setIsTitleEdit(true)}>
                  {title}
                </h3>
              )}
              <button
                type="button"
                aria-label="Delete"
                className="column-btn delete-btn"
                onClick={() => setIsDeleteColumnOpen(true)}
              />
            </div>
            <TaskList tasks={tasks} columnId={columnId} />
            <button type="button" className="add-card-btn" onClick={() => setIsAddTaskOpen(true)}>
              Add a card...
            </button>
          </div>
        )}
      </Draggable>
      {isAddTaskOpen && (
        <Modal title="Add a task" onCancel={onTaskFormCancel}>
          <TaskForm onSubmit={onTaskFormSubmit} onCancel={onTaskFormCancel} />
        </Modal>
      )}
      {isDeleteColumnOpen && (
        <Modal title="" onCancel={onDeleteColumnCancel}>
          <h3 className="confirm-title">Are you sure?</h3>
          <div className="btn-wrapper">
            <button type="button" className="modal-btn" onClick={onDeleteColumnClick}>
              Yes
            </button>
            <button type="button" className="modal-btn" onClick={onDeleteColumnCancel}>
              No
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Column;
