import { useEffect } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useParams, useNavigate } from 'react-router-dom';
import ColumnList from '../../components/ColumnList/ColumnList';
import Loading from '../../components/Loading/Loading';
import useAppDispatch from '../../hooks/useAppDispatch';
import useTypedSelector from '../../hooks/useTypedSelector';
import { editColumn, editTask, fetchBoardData } from '../../redux/thunks/boardThunks';
import './Board.scss';
import { IColumnResponse, ITaskResponse } from '../../types/board';
import { getUserId } from '../../api/apiService';

const Board = () => {
  const navigate = useNavigate();
  const { title, columns, status, error } = useTypedSelector((state) => state.board);
  const { isAuth } = useTypedSelector((state) => state.auth);
  const token = useTypedSelector((state) => state.auth.token) as string;
  const dispatch = useAppDispatch();
  const userId = getUserId(token);
  const boardId = useParams().boardId as string;

  useEffect(() => {
    if (!isAuth) {
      navigate('/welcome');
    } else {
      dispatch(fetchBoardData({ boardId, token }));
    }
  }, [isAuth]);

  const onDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    if (type === 'column') {
      const column = columns.find((item) => item.id === draggableId) as IColumnResponse;
      const columnData = {
        title: column.title,
        order: destination.index + 1,
      };

      try {
        await dispatch(
          editColumn({
            boardId,
            columnId: column.id,
            column: columnData,
            token,
          })
        );
      } catch (err) {
        console.error('Failed to edit the column: ', err);
      }
      return;
    }
    const start = columns.find((item) => item.id === source.droppableId) as IColumnResponse;

    const finish = columns.find((item) => item.id === destination.droppableId) as IColumnResponse;

    const tasks = Array.from(start.tasks);

    const task = tasks.find((item) => item.id === draggableId) as ITaskResponse;

    const taskData = {
      title: task.title,
      order: destination.index + 1,
      description: task.description,
      userId,
      boardId,
      columnId: start === finish ? start.id : finish.id,
    };

    try {
      await dispatch(
        editTask({
          boardId,
          columnId: start.id,
          taskId: task.id,
          task: taskData,
          token,
        })
      );
    } catch (err) {
      console.error('Failed to edit the task: ', err);
    }
  };

  let content;
  if (status === 'loading') {
    content = <Loading />;
  } else if (status === 'succeeded') {
    const orderedColumns = columns.slice().sort((a, b) => a.order - b.order);

    content = (
      <>
        <h2 className="board-page-header">{title}</h2>
        <DragDropContext onDragEnd={onDragEnd}>
          <ColumnList columns={orderedColumns} />
        </DragDropContext>
      </>
    );
  } else if (status === 'failed') {
    content = <div>{error}</div>;
  }

  return (
    <div className="board-page">
      <div className="center-container">{content}</div>
    </div>
  );
};

export default Board;
