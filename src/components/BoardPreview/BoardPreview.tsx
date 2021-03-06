import { useState } from 'react';
import './BoardPreview.scss';
import { IBoard } from '../../types/apiTypes';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import useAppDispatch from '../../hooks/useAppDispatch';
import { removeBoard, getBoardsList } from '../../redux/thunks/boardThunks';
import CONSTANTS from '../../utils/constants';

type BoardPreviewTypes = {
  value: IBoard;
};

const BoardPreview = (props: BoardPreviewTypes) => {
  const [isOpen, setIsOpen] = useState(false);
  const { value } = props;
  const dispatch = useAppDispatch();

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const remove = (id: string) => {
    dispatch(removeBoard({ boardId: id, token: CONSTANTS.TOKEN }));
    dispatch(getBoardsList(CONSTANTS.TOKEN));
    toggleModal();
  };
  return (
    <>
      <div className="boardPreview">
        <header className="board-header">
          <h2 className="board-title">{value.title}</h2>
          <button type="button" className="board-delete" onClick={() => toggleModal()}>
            .
          </button>
        </header>
        <p className="board-description">{value.description}</p>
      </div>
      {isOpen && <ConfirmationModal close={toggleModal} remove={remove} id={value.id} />}
    </>
  );
};

export default BoardPreview;
