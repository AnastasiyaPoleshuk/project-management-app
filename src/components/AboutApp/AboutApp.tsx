import './AboutApp.scss';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import CONSTANTS from '../../utils/constants';

const AboutApp = () => {
  useEffect(() => {
    AOS.init({ duration: CONSTANTS.ANIMATION_DURATION, offset: CONSTANTS.ANIMATION_OFFSET });
  }, []);

  return (
    <section className="about-app">
      <h1 className="title">About App</h1>
      <div className="about-app__card" data-aos="fade-up">
        <i className="card-img card-img__main" />
        <article>
          <h3>Your new project organizer</h3>
          <p className="description">
            A new way to ad your team to the board, add cards with information and have a full view
            of what you have done and has to do
          </p>
        </article>
      </div>
      <div className="about-app__card" data-aos="fade-up">
        <article>
          <h3>Board</h3>
          <p className="description">
            It&apos;s possible to change the name of the column by editing, delete column and move
            them to another position. You can also add as many columns as you need
          </p>
        </article>
        <i className="card-img card-img__board" />
      </div>
      <div className="about-app__card" data-aos="fade-up">
        <i className="card-img card-img__dragNdrop" />
        <article>
          <h3>Details</h3>
          <p className="description">
            A drag and drop system is used to move a cards between the columns
          </p>
        </article>
      </div>
    </section>
  );
};

export default AboutApp;
