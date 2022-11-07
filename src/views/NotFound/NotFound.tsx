import { NavLink } from 'react-router-dom';
import useTypedSelector from '../../hooks/useTypedSelector';
import './NotFound.scss';

const NotFound = () => {
  const { isAuth } = useTypedSelector((state) => state.auth);

  return (
    <section className="not-found">
      <p className="title">Page not found</p>
      <NavLink to={isAuth ? '/' : '/welcome'} className="home__btn">
        Home &#8617;
      </NavLink>
    </section>
  );
};

export default NotFound;
