import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BoardPreview.scss';
import { IBoard } from '../../types/apiTypes';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import useAppDispatch from '../../hooks/useAppDispatch';
import useTypedSelector from '../../hooks/useTypedSelector';
import { removeBoard, getBoardsList } from '../../redux/thunks/boardThunks';

type BoardPreviewTypes = {
  value: IBoard;
};

const BoardPreview = (props: BoardPreviewTypes) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { value } = props;
  const token = useTypedSelector((state) => state.auth.token) as string;
  const dispatch = useAppDispatch();

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const goToBoardPage = () => {
    navigate(`/board/${value.id}`);
  };

  const remove = (id: string) => {
    dispatch(removeBoard({ boardId: id, token }));
    dispatch(getBoardsList(token));
    toggleModal();
  };
  return (
    <>
      <div className="boardPreview" onClick={goToBoardPage}>
        <header className="board-header">
          <h2 className="board-title">{value.title}</h2>
          <button
            type="button"
            className="board-delete"
            onClick={(e) => {
              e.stopPropagation();
              toggleModal();
            }}
          >
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
