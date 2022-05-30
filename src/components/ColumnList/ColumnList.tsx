import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { Droppable } from 'react-beautiful-dnd';
import { useParams } from 'react-router-dom';
import { IColumnResponse } from '../../types/board';
import Column from '../Column/Column';
import Modal from '../Modal/Modal';
import ColumnForm from '../ColumnForm/ColumnForm';
import useAppDispatch from '../../hooks/useAppDispatch';
import { addColumn } from '../../redux/thunks/boardThunks';
import './ColumnList.scss';
import useTypedSelector from '../../hooks/useTypedSelector';

type ColumnListProps = {
  columns: IColumnResponse[];
};

type FormValues = {
  columnTitle: string;
};

const ColumnList = ({ columns }: ColumnListProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = useTypedSelector((state) => state.auth.token) as string;
  const dispatch = useAppDispatch();
  const boardId = useParams().boardId as string;

  const onCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const column = {
        title: data.columnTitle,
      };

      await dispatch(addColumn({ boardId, column, token }));
      setIsModalOpen(false);
    } catch (err) {
      console.error('Failed to add the column: ', err);
    }
  };

  return (
    <>
      <section className="column-list">
        <Droppable droppableId="all-columns" direction="horizontal" type="column">
          {(provided) => (
            <div
              className="column-list-wrapper"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {Boolean(columns.length) &&
                columns.map((column, index) => (
                  <Column key={column.id} column={column} index={index} />
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <button type="button" className="add-column-btn" onClick={() => setIsModalOpen(true)}>
          Add a column...
        </button>
      </section>
      {isModalOpen && (
        <Modal title="Add a column" onCancel={onCancel}>
          <ColumnForm onSubmit={onSubmit} onCancel={onCancel} />
        </Modal>
      )}
    </>
  );
};

export default ColumnList;
