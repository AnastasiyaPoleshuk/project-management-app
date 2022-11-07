import { useState } from 'react';
import './Welcome.scss';
import AboutTeam from '../../components/AboutTeam/AboutTeam';
import AboutApp from '../../components/AboutApp/AboutApp';

const Welcome = () => {
  const [isAboutApp, setIsAboutApp] = useState(true);
  return (
    <>
      <section className="welcome">
        <div className="title-blok">
          <h1 className="title">Welcome to Goodie!</h1>
          <p>
            Goodie &mdash; an application that will help you and your team to easily achieve their
            goals.
          </p>
        </div>
        <i className="welcome-img" />
      </section>
      <div className="links-box">
        <button
          type="button"
          className="btn"
          onClick={() => {
            setIsAboutApp(false);
          }}
        >
          About team
        </button>
        <button
          type="button"
          className="btn"
          onClick={() => {
            setIsAboutApp(true);
          }}
        >
          About app
        </button>
      </div>
      {isAboutApp ? <AboutApp /> : <AboutTeam />}
    </>
  );
};

export default Welcome;
