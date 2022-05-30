import { useEffect } from 'react';
import './App.scss';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import NotFound from './views/NotFound/NotFound';
import Main from './views/Main/Main';
import Board from './views/Board/Board';
import Welcome from './views/Welcome/Welcome';
import useTypedSelector from './hooks/useTypedSelector';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import EditProfile from './components/EditProfile/EditProfile';

const App = () => {
  const { isAuth } = useTypedSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) navigate('/welcome');
  }, [isAuth]);

  return (
    <>
      <div className="content-wrapper">
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          <Route path="/edit-profile" element={<EditProfile />} />

          <Route path="/welcome" element={<Welcome />} />

          <Route path={isAuth ? '/board/:boardId' : '/welcome'} element={<Board />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
