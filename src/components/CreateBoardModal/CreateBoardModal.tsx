import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import './CreateBoardModal.scss';
import { INewBoardForm } from '../../types/apiTypes';
import useTypedSelector from '../../hooks/useTypedSelector';
import useAppDispatch from '../../hooks/useAppDispatch';
import { addBoard } from '../../redux/thunks/boardThunks';

type CreateBoardModalType = {
  close: () => void;
};

const CreateBoardModal = (props: CreateBoardModalType) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuth } = useTypedSelector((state) => state.auth);
  const token = useTypedSelector((state) => state.auth.token) as string;
  const { close } = props;

  useEffect(() => {
    if (!isAuth) {
      navigate('/welcome');
    }
  }, [isAuth]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<INewBoardForm>();

  const onSubmit: SubmitHandler<INewBoardForm> = (data) => {
    dispatch(addBoard({ title: data.title, description: data.description, token }));
    reset();
    close();
  };

  return (
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
          autoFocus
          {...register('title', { required: true })}
          name="title"
        />
        <p className={`form-error ${errors.title ? null : 'none'}`}>*Required field</p>
        <input
          className={`form-input input-text ${errors.description ? 'input-error' : null}`}
          placeholder="Description"
          {...register('description', { required: false })}
          name="description"
        />
        <button type="submit" className="btn-submit">
          Create board
        </button>
      </form>
    </section>
  );
};

export default CreateBoardModal;
