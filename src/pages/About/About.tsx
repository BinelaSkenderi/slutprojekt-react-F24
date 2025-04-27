import React from 'react';
import { FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './About.scss'; // Importera CSS-filen här

const About = () => {
  return (
    <main className="about-main">
      {/* Back Link */}
      <div className="back-link">
        <Link to="/">← Back to Home</Link>
      </div>

      <div className="about-container">
        {/* Page Title */}
        <h1 className="page-title">About Me</h1>

        {/* About Section */}
        <section>
          <p className="about-text">
            Hi! I'm Binela, a passionate Frontend Developer with a love for
            crafting engaging user interfaces. I'm always learning and improving
            my skills in frontend technologies, UX/UI design, and creating
            seamless experiences.
          </p>

          <div className="profile-container">
            <h3 className="profile-name">Binela Skenderi</h3>
            <p className="profile-role">Frontend Developer</p>
            <a
              href="https://github.com/BinelaSkenderi"
              target="_blank"
              rel="noopener noreferrer"
              className="github-link"
            >
              <FaGithub /> GitHub
            </a>
          </div>
        </section>
      </div>
    </main>
  );
};

export default About;
