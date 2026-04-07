import React, { useEffect } from "react";

import HTML from './assets/html.webp';
import CSS  from  './assets/css.webp';
import JS from  './assets/js.webp';
import REACT from './assets/react.webp';
import  BOOT from './assets/bootstrap.webp';
import  FIG from  './assets/figma.webp';
import  TAIL from './assets/tailwind.webp';

import EXP from './assets/express.png';
import  NODE from './assets/node.webp';
import  MONGO from  './assets/mongo.png';
import MY from './assets/sql.webp';


import WORD from './assets/wordpress.webp';
import  POST from './assets/postman.png';
import  NPM from  './assets/npm.webp';
import REST from './assets/api.webp';
import GIT from './assets/github.webp';
import NETLIFY from './assets/netlify.png';
import VERC from './assets/vercel.webp';

export default function Skills() {
  useEffect(() => {
    const css = `
.skills-section {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  // background: radial-gradient(circle at top, #0f2027, #203a43, #2c5364);
  // background: radial-gradient(circle at top, #0f0f0f, #1a1a2e, #16213e);
  background: linear-gradient(180deg, #0c0f1b, #14182c);
   color: var(--text);
  padding: 4rem 2rem;
  text-align: center;
}

.skills-section::before {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: url("https://www.transparenttextures.com/patterns/stardust.png");
  opacity: 0.07;
  animation: floatBackground 40s linear infinite;
}

@keyframes floatBackground {
  0% { transform: translate(0,0); }
  100% { transform: translate(300px, 300px); }
}

.skills-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  background: linear-gradient(90deg, #06b6d4, #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
  position: relative;
}

.skills-title::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -8px;
  height: 3px;
  width: 100%;
  background: linear-gradient(90deg, #2b1d1dff, #3b82f6);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.6s ease;
}

.skills-title.visible::after {
  transform: scaleX(1);
}

.skills-subtext {
  color: var(--muted);
  font-size: 1.1rem;
  margin-bottom: 3rem;
  padding: 10px;
}

.category {
  margin-bottom: 3rem;
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.category.visible {
  opacity: 1;
  transform: translateY(0);
}

.category h3 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #06b6d4;
}

.skills-grid {
  display: flex;
  justify-content: center;
  gap: 2.5rem;
  flex-wrap: wrap;
}

.skill {
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  position: relative;
  perspective: 1000px;
}

.skill img {
  width: 60px;
  height: 60px;
  object-fit: contain;
  margin-bottom: 0.6rem;
  border-radius: 12px;
  background: rgba(255,255,255,0.05);
  padding: 0.6rem;
  transition: transform 0.25s ease, filter 0.3s ease, box-shadow 0.3s ease;
}

.skill:hover img {
  transform: rotateY(12deg) rotateX(12deg) scale(1.07);
  filter: drop-shadow(0 0 10px #3b82f6);
  box-shadow: 0 0 18px rgba(59,130,246,0.35);
}

.skill span {
  font-size: 0.95rem;
  font-weight: 500;
}

.particle {
  position: absolute;
  width: 6px;
  height: 6px;
  background: #3b82f6;
  border-radius: 50%;
  opacity: 0.4;
  animation: floatParticle 12s infinite ease-in-out;
}

@keyframes floatParticle {
  0% { transform: translateY(0) scale(1); opacity: 0.5; }
  50% { transform: translateY(-60px) scale(1.2); opacity: 1; }
  100% { transform: translateY(0) scale(1); opacity: 0.5; }
}
`;

    const styleEl = document.createElement("style");
    styleEl.setAttribute("data-from", "Skills.jsx");
    styleEl.innerHTML = css;
    document.head.appendChild(styleEl);

    // Intersection Observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.3 }
    );

    document.querySelectorAll(".skills-title, .category").forEach((el) => {
      observer.observe(el);
    });

    // Magnetic cursor effect
    const skills = document.querySelectorAll(".skill img");
    const handleMove = (e) => {
      skills.forEach((img) => {
        const rect = img.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        img.style.transform = `translate(${x * 0.05}px, ${y * 0.05}px) rotateY(${x * 0.05}deg) rotateX(${-y * 0.05}deg)`;
      });
    };
    const reset = () => {
      skills.forEach((img) => {
        img.style.transform = "translate(0,0) rotateY(0) rotateX(0)";
      });
    };

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseleave", reset);

    // floating particles
    const section = document.querySelector(".skills-section");
    for (let i = 0; i < 20; i++) {
      const p = document.createElement("div");
      p.className = "particle";
      p.style.left = Math.random() * 100 + "%";
      p.style.top = Math.random() * 100 + "%";
      p.style.animationDelay = `${Math.random() * 10}s`;
      section.appendChild(p);
    }

    return () => {
      if (styleEl.parentNode) styleEl.parentNode.removeChild(styleEl);
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", reset);
    };
  }, []);

  return (
    <section id="skills" className="skills-section">
      <h2 className="skills-title">Tech Stack</h2>
      <p className="skills-subtext">
        The skills, tools and technologies I am{" "}
        <span style={{ color: "#3b82f6" }}>really good at</span>
      </p>

      {/* Frontend */}
      <div className="category">
        <h3>Frontend</h3>
        <div className="skills-grid">
          <div className="skill">
            <img src={HTML} alt="HTML" />
            <span>HTML</span>
          </div>
          <div className="skill">
            <img src={CSS} alt="CSS" />
            <span>CSS</span>
          </div>
          <div className="skill">
            <img src={JS} alt="JavaScript" />
            <span>JavaScript</span>
          </div>
          <div className="skill">
            <img src={REACT} alt="React.js" />
            <span>React.js</span>
          </div>
          <div className="skill">
            <img src={BOOT} alt="React.js" />
            <span>Bootstrap</span>
          </div>
          <div className="skill">
            <img src={TAIL} alt="React.js" />
            <span>Tailwind</span>
          </div>
          <div className="skill">
            <img src={FIG} alt="React.js" />
            <span>Figma</span>
          </div>
        </div>
      </div>

      {/* Backend */}
      <div className="category">
        <h3>Backend</h3>
        <div className="skills-grid">
          <div className="skill">
            <img src={EXP} alt="Express.js" />
            <span>Express.js</span>
          </div>
          <div className="skill">
            <img src={NODE} alt="Node.js" />
            <span>Node.js</span>
          </div>
          <div className="skill">
            <img src={MONGO} alt="MongoDB" />
            <span>MongoDB</span>
          </div>
          <div className="skill">
            <img src={MY} alt="MongoDB" />
            <span>MySql</span>
          </div>
        </div>
      </div>

      <div className="category">
        <h3>Development & Deployment Tools</h3>
        <div className="skills-grid">
          <div className="skill">
            <img src={WORD} alt="wordpress" />
            <span>WordPress</span>
          </div>
          <div className="skill">
            <img src={POST} alt="postman" />
            <span>Postman</span>
          </div>
          <div className="skill">
            <img src={NPM} alt="Npm" />
            <span>NPM</span>
          </div>
          <div className="skill">
            <img src={REST} alt="API" />
            <span>REST APIs</span>
          </div>
          <div className="skill">
            <img src={GIT} alt="github" />
            <span>GitHub</span>
          </div>
          <div className="skill">
            <img src={NETLIFY} alt="netlify" />
            <span>Netlify</span>
          </div>
          <div className="skill">
            <img src={VERC} alt="vercel" />
            <span>Vercel</span>
          </div>

        </div>
      </div>
    </section>
  );
}

