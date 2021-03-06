import './Login.scss';
import { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import useTypedSelector from '../../hooks/useTypedSelector';
import { ILoginFormData } from '../../types/interfaces';
import useAppDispatch from '../../hooks/useAppDispatch';
import { fetchSignIn } from '../../redux/thunks/authThunks';
import Loading from '../Loading/Loading';

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ILoginFormData>();
  const { isLoading, error, isAuth } = useTypedSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuth) navigate('/');
  }, [isAuth]);

  const onSubmit: SubmitHandler<ILoginFormData> = (data) => {
    dispatch(fetchSignIn(data));
    reset();
  };

  return (
    <section className="login-form">
      <div className="center-container">
        {isLoading ? <Loading /> : null}
        <form action="#" className="form" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="form-title">Authorization</h2>

          <input
            className={`form-input input-text ${errors.login ? 'input-error' : null}`}
            placeholder="Login"
            {...register('login', { required: true, minLength: 3 })}
          />
          <p className={`form-error ${errors.login ? null : 'none'}`}>
            *Required field of at least three characters
          </p>

          <input
            type="password"
            className={`form-input input-text input-card ${errors.password ? 'input-error' : null}`}
            placeholder="Password"
            {...register('password', { required: true, minLength: 4 })}
          />
          <p className={`form-error ${errors.password ? null : 'none'}`}>
            *Required field of at least four characters
          </p>

          {error ? <p className="form-error">Invalid login or password</p> : null}

          <NavLink to="/signup" className="btn-register">
            Registration
          </NavLink>
          <button type="submit" className="btn-submit">
            Sign in
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
