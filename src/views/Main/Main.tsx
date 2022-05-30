import './Main.scss';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import BoardPreview from '../../components/BoardPreview/BoardPreview';
import BoardCreate from '../../components/BoardCreate/BoardCreate';
import useTypedSelector from '../../hooks/useTypedSelector';
import useAppDispatch from '../../hooks/useAppDispatch';
import { getBoardsList } from '../../redux/thunks/boardThunks';

const Main = () => {
  const navigate = useNavigate();
  const { isAuth, token } = useTypedSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { boards, isLoading } = useTypedSelector((state) => state.boards);

  useEffect(() => {
    if (!isAuth) {
      navigate('/welcome');
    } else {
      dispatch(getBoardsList(token as string));
    }
  }, [isAuth]);

  return (
    <main className="main">
      <div className="img-box">
        <h2 className="title">Your boards</h2>
      </div>
      <div className="board-wrap">
        {isLoading ? (
          <Loading />
        ) : (
          boards.map((value) => <BoardPreview value={value} key={value.id} />)
        )}
        <BoardCreate />
      </div>
    </main>
  );
};

export default Main;
