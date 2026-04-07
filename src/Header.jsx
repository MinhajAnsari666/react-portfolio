import React, { useEffect, useState } from "react";
import RESUME from './assets/Minhaj_resume.pdf';

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const css = `
:root{
  --bg-deep: #081126; /* main background */
  --bg-deep-2: #040814;
  --text: #e6f7ff;
  --muted: #93a6b0;
  --accent: #3ee6d6; /* cyan */
  --accent-2: #8b5cf6; /* violet */
}

.site-header{
  position: sticky;
  top: 0;
  z-index: 1200;
  backdrop-filter: blur(8px);
  background: linear-gradient(180deg, rgba(8,17,38,0.65), rgba(4,8,20,0.5));
  border-bottom: 1px solid rgba(255,255,255,0.02);
}

.header-container{
  max-width: 1100px;
  margin: 0 auto;
  padding: 0.8rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.logo{
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  text-decoration: none;
  color: var(--text);
  font-weight: 700;
  letter-spacing: 0.6px;
}

.logo .mark{
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: inline-grid;
  place-items: center;
  font-weight: 800;
  color: #041125;
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  box-shadow: 0 8px 28px rgba(11,18,32,0.6);
  transition: transform .28s ease;
}

.logo:hover .mark{ transform: translateY(-3px); }

.nav{
  display: flex;
  align-items: center;
  gap: 1.1rem;
}

.nav a{
  color: var(--muted);
  text-decoration: none;
  font-weight: 500;
  padding: 0.45rem 0.2rem;
  position: relative;
  transition: color .22s ease;
}

.nav a::after{
  content: '';
  position: absolute;
  left: 0;
  bottom: -6px;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, var(--accent), var(--accent-2));
  transform: scaleX(0);
  transform-origin: left;
  transition: transform .28s ease;
  border-radius: 2px;
}

.nav a:hover{ color: var(--text); }
.nav a:hover::after{ transform: scaleX(1); }

.btn-resume{
  padding: 20px;
  border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.06);
  background: linear-gradient(90deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01));
  color: var(--text);
  font-weight: 600;
  box-shadow: 0 6px 20px rgba(62,230,214,0.06);
  transition: transform .18s ease, box-shadow .18s ease;
}
.btn-resume:hover{ transform: translateY(-4px); box-shadow: 0 12px 28px rgba(62,230,214,0.09); }

/* Hamburger */
.hamburger{ display: none; background: none; border: 0; cursor: pointer; padding: 8px; margin-left: 8px; }
.hamburger .bar{ width: 24px; height: 2px; background: var(--text); display: block; position: relative; transition: all .28s ease; }
.hamburger .bar::before, .hamburger .bar::after{ content: ''; position: absolute; left: 0; width: 24px; height: 2px; background: var(--text); transition: all .28s ease; }
.hamburger .bar::before{ top: -8px; }
.hamburger .bar::after{ top: 8px; }
.hamburger[aria-expanded="true"] .bar{ background: transparent; }
.hamburger[aria-expanded="true"] .bar::before{ transform: translateY(8px) rotate(45deg); }
.hamburger[aria-expanded="true"] .bar::after{ transform: translateY(-8px) rotate(-45deg); }

/* Mobile nav */
@media (max-width: 810px){
  .nav{ position: fixed; right: 0; top: 0; height: 100vh; width: 72%; max-width: 360px; background: linear-gradient(180deg, rgba(8,17,38,0.98), rgba(4,8,20,0.98)); flex-direction: column; padding: 6rem 2rem; gap: 1.8rem; transform: translateX(100%); transition: transform .32s cubic-bezier(.2,.9,.2,1); box-shadow: -12px 0 30px rgba(0,0,0,0.6); }
  .nav.open{ transform: translateX(0); }
  .hamburger{ display: block; }
  .header-container{ padding: 0.6rem 1rem; }
}

/* reduced motion */
@media (prefers-reduced-motion: reduce){ *{ transition: none !important; animation: none !important; } }
`;

    const styleEl = document.createElement("style");
    styleEl.setAttribute("data-from", "Header.jsx");
    styleEl.innerHTML = css;
    document.head.appendChild(styleEl);

    return () => {
      if (styleEl && styleEl.parentNode) styleEl.parentNode.removeChild(styleEl);
    };
  }, []);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="site-header">
      <div className="header-container">
        <a href="#home" className="logo" aria-label="Go to home">
          <span className="mark">M</span>
          <span className="name">Portfolio</span>
        </a>

        <nav className={`nav ${open ? "open" : ""}`} aria-label="Primary">
          <a href="#home" onClick={() => setOpen(false)}>Home</a>
          <a href="#about" onClick={() => setOpen(false)}>About</a>
          <a href="#skills" onClick={() => setOpen(false)}>Skills</a>
          <a href="#projects" onClick={() => setOpen(false)}>Projects</a>
          <a href="#contact" onClick={() => setOpen(false)}>Contact</a>
          {/* <a href="/src/assets/Minhaj_resume.pdf" className="btn-resume" onClick={() => setOpen(false)}>Resume</a> */}
          <a href={RESUME} className="btn-resume" onClick={() => setOpen(false)}>Resume</a>
        </nav>

        <button
          className="hamburger"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((p) => !p)}
        >
          <span className="bar" aria-hidden="true"></span>
        </button>
      </div>
    </header>
  );
}
