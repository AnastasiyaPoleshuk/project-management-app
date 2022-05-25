import './Header.scss';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import useAppDispatch from '../../hooks/useAppDispatch';
import useTypedSelector from '../../hooks/useTypedSelector';
import { authSlice } from '../../redux/reducers/authSlice';
import CreateBoardModal from '../CreateBoardModal/CreateBoardModal';
import { settingsSlice } from '../../redux/reducers/settingsSlice';

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { isAuth } = useTypedSelector((state) => state.auth);
  const { logout } = authSlice.actions;
  const dispatch = useAppDispatch();
  const [cookies, setCookie, removeCookie] = useCookies(['goodie-token']);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsSticky(true);
      }
      if (window.scrollY < 11) {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <header className={`header ${isSticky ? 'header_sticky' : ''}`}>
        <div className="center-container">
          <NavLink to="/" className="header__btn  btn-home" />

          <div>
            <NavLink to="/edit-profile" className="header__btn btn-nav">
              edit-profile
            </NavLink>
            <NavLink to="/#" className="header__btn btn-nav" onClick={() => toggleModal()}>
              new-board
            </NavLink>
          </div>

          <div>
            {isAuth ? (
              <button
                type="button"
                className="header__btn"
                onClick={() => {
                  dispatch(logout());
                  removeCookie('goodie-token');
                }}
              >
                log-out
              </button>
            ) : (
              <>
                <NavLink to="/login" className="header__btn btn-nav">
                  sign-in
                </NavLink>
                <NavLink to="/signup" className="header__btn btn-nav">
                  sign-up
                </NavLink>
              </>
            )}
          </div>
        </div>
      </header>
      {isOpen && <CreateBoardModal close={toggleModal} />}
    </>
  );
};

export default Header;
