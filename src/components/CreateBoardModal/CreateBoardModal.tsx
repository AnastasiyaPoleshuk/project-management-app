import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import './CreateBoardModal.scss';
import { INewBoardForm } from '../../types/apiTypes';
import useTypedSelector from '../../hooks/useTypedSelector';
import useAppDispatch from '../../hooks/useAppDispatch';
import { addBoard } from '../../redux/thunks/boardThunks';
import CONSTANTS from '../../utils/constants';

type CreateBoardModalType = {
  close: () => void;
};

const CreateBoardModal = (props: CreateBoardModalType) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const boards = useTypedSelector((state) => state.boards.boards);
  const { close } = props;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<INewBoardForm>();

  const onSubmit: SubmitHandler<INewBoardForm> = (data) => {
    dispatch(addBoard({ title: data.title, token: CONSTANTS.TOKEN }));
    reset();
    close();
  };

  return ReactDOM.createPortal(
    <section className="createBoard-form" onClick={() => close()}>
      <form
        action="#"
        className="form"
        onSubmit={handleSubmit(onSubmit)}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="form-title">Create a new Board</h2>
        <input
          className={`form-input input-text ${errors.title ? 'input-error' : null}`}
          placeholder="Title"
          {...register('title', { required: true })}
          name="title"
        />
        <p className={`form-error ${errors.title ? null : 'none'}`}>*Required field</p>
        <button type="submit" className="btn-submit">
          Create board
        </button>
      </form>
    </section>,
    document.getElementById('modals') as HTMLElement
  );
};

export default CreateBoardModal;
