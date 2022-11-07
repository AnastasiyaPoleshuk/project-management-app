import './AboutTeam.scss';

const AboutTeam = () => {
  return (
    <section className="about-team">
      <h1 className="title">Our team</h1>
      <div className="member-card_container">
        <div className="card">
          <h2 className="name">Elena</h2>
          <div className="member-column">
            <div className="member-card">
              <div className="photo lena" />
              <p className="role">Front-end developer</p>
              <p className="description">
                <span>&#10004;</span> back-end deploy
              </p>
            </div>
            <div className="member-card">
              <p className="description">
                <span>&#10004;</span> board page
              </p>
            </div>
            <div className="member-card">
              <p className="description">
                <span>&#10004;</span> Confirmation modal
              </p>
            </div>
          </div>
        </div>
        <div className="card">
          <h2 className="name">Aliona</h2>
          <div className="member-column">
            <div className="member-card">
              <div className="photo aliona" />
              <p className="role">Front-end developer</p>
              <p className="description">
                <span>&#10004;</span> Authorization
              </p>
            </div>
            <div className="member-card">
              <p className="description">
                <span>&#10004;</span> project config
              </p>
            </div>
            <div className="member-card">
              <p className="description">
                <span>&#10004;</span> edit profile form
              </p>
            </div>
          </div>
        </div>
        <div className="card">
          <h2 className="name">Anastasiya</h2>
          <div className="member-column">
            <div className="member-card">
              <div className="photo nastya" />
              <p className="role">Team lead</p>
              <p className="description">
                <span>&#10004;</span> welcome page
              </p>
            </div>
            <div className="member-card">
              <p className="description">
                <span>&#10004;</span> main page
              </p>
            </div>
            <div className="member-card">
              <p className="description">
                <span>&#10004;</span> create board form
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutTeam;
