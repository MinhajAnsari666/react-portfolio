import React, { useEffect, useState } from "react";

export default function Home() {
  const roles = [
    "Frontend Developer",
    "UI/UX Designer",
    "Full Stack Developer",
  ];
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setAnimate(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % roles.length);
        setAnimate(true);
      }, 200); // small delay for exit animation
    }, 2500);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const css = `
.home-section{
  min-height: 100vh;
  background: linear-gradient(180deg, var(--bg-deep), var(--bg-deep-2));
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: var(--text);
  text-align: center;
}

/* subtle background accents */
.home-section::before{
  content: '';
  position: absolute;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, var(--accent) 0%, transparent 70%);
  top: -100px;
  left: -100px;
  opacity: 0.08;
  animation: float 12s ease-in-out infinite;
}
.home-section::after{
  content: '';
  position: absolute;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, var(--accent-2) 0%, transparent 70%);
  bottom: -120px;
  right: -120px;
  opacity: 0.08;
  animation: float 15s ease-in-out infinite reverse;
}

@keyframes float{
  0%,100%{ transform: translateY(0) rotate(0deg); }
  50%{ transform: translateY(-30px) rotate(20deg); }
}

.hero{
  max-width: 800px;
  position: relative;
  z-index: 1;
}

.hero h2{
  font-size: 1.3rem;
  font-weight: 400;
  color: var(--muted);
  margin-bottom: 0.5rem;
  animation: fadeDown 1s ease;
}

.hero h1{
  font-size: 2.8rem;
  font-weight: 700;
  margin-bottom: 0.6rem;
  animation: fadeDown 1.2s ease;
}

@keyframes fadeDown{
  from{ opacity:0; transform: translateY(-20px); }
  to{ opacity:1; transform: translateY(0); }
}

.role{
  font-size: 1.7rem;
  font-weight: 600;
  background: linear-gradient(90deg, var(--accent), var(--accent-2));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
  min-height: 2rem;
}

.fade-in{
  animation: fadeSlideIn 0.6s ease forwards;
}
.fade-out{
  animation: fadeSlideOut 0.4s ease forwards;
}

@keyframes fadeSlideIn{
  from{ opacity:0; transform: translateY(15px); }
  to{ opacity:1; transform: translateY(0); }
}

@keyframes fadeSlideOut{
  from{ opacity:1; transform: translateY(0); }
  to{ opacity:0; transform: translateY(-15px); }
}

.hero p{
  font-size: 1.1rem;
  margin: 1.5rem 0 2.2rem;
  color: var(--muted);
  line-height: 1.7;
  animation: fadeDown 1.4s ease;
}

.buttons{
  display: flex;
  justify-content: center;
  gap: 1.2rem;
  flex-wrap: wrap;
}

.btn-main{
  padding: 0.75rem 1.6rem;
  border-radius: 14px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  background: linear-gradient(90deg, var(--accent), var(--accent-2));
  color: #041125;
  box-shadow: 0 8px 28px rgba(62,230,214,0.18);
  transition: transform .22s ease;
}
.btn-main:hover{ transform: translateY(-4px) scale(1.03); }

.btn-outline{
  padding: 0.75rem 1.6rem;
  border-radius: 14px;
  border: 1px solid var(--accent);
  background: transparent;
  color: var(--accent);
  font-weight: 600;
  transition: all .22s ease;
}
.btn-outline:hover{ background: var(--accent); color: #041125; transform: translateY(-3px); }
`;

    const styleEl = document.createElement("style");
    styleEl.setAttribute("data-from", "Home.jsx");
    styleEl.innerHTML = css;
    document.head.appendChild(styleEl);
    return () => { if(styleEl.parentNode) styleEl.parentNode.removeChild(styleEl); };
  }, []);

  return (
    <section id="home" className="home-section">
      <div className="hero">
        <h2>Hello, I'm</h2>
        <h1>Ansari Md Minhaj</h1>
        <div className={`role ${animate ? 'fade-in' : 'fade-out'}`}>
          I'm a {roles[index]}
        </div>
        <p>
          Passionate about creating beautiful, functional, and user-friendly digital
          experiences that make a difference in people's lives.
        </p>
        <div className="buttons">
          <a href="#projects" className="btn-main">View My Work</a>
          <a href="#contact" className="btn-outline">Get In Touch</a>
        </div>
      </div>
    </section>
  );
}