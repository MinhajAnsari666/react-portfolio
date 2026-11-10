import React, { useEffect } from "react";
import { motion, useInView } from "framer-motion";

import AI from './assets/Gemini-Clone.png';
import  YT from './assets/Youtube.png';
import  PORT from  './assets/portfolioimg.png';
import DD from './assets/dotific.png';
import LIB from './assets/lib.png';
import IPHONE from './assets/iphone-3d.jpg';
import VG from './assets/vishesh-group.jpg';

const personalProjects = [
  {
    title: "iPhone 16 Pro (3D Website)",
    description:
      "An interactive 3D product showcase inspired by Apple's iPhone 16 Pro website. Built with Three.js and GSAP for immersive 3D model rendering, fluid scroll-driven animations, 360-degree rotation, and dynamic color transitions.",
    img: IPHONE,
    tech: ["React", "Three.js", "GSAP", "Tailwind CSS"],
    link: "https://iphone-3d-website-three.vercel.app/",
  },
  {
    title: "AI ChatBot",
    description:
      "A Gemini AI clone built with React, featuring a modern UI and smooth interactions. It allows users to chat with an AI assistant in real-time, mimicking the experience of Google’s Gemini with responsive design and dynamic functionality.",
    img: AI,
    tech: ["React", "JavaScript", "CSS" , "API"],
    link: "https://gemini-clone-nine-theta.vercel.app/",
  },
  {
    title: "Youtube Clone(UI)",
    description:
      "A YouTube Clone (UI) built with React, featuring a clean video player interface and a comment section. Users can play videos seamlessly and interact through comments, replicating the core experience of YouTube",
    img: YT,
    tech: ["HTML", "CSS", "JavaScript", "Responsive"],
    link: "https://youtubeclone-minhaj.netlify.app/",
  },
  {
    title: "Portfolio Website",
    description:
      "Designed and developed a responsive portfolio website using React to highlight my skills, projects, and experience. Implemented smooth animations, gradient backgrounds, and interactive UI components to create a modern, user-friendly showcase of my work",
    img: PORT,
    tech: ["HTML", "JavaScript", "CSS" , "Responsive"],
    link: "https://itsminhaj.netlify.app",
  },
];

const industrialProjects = [
  {
    title: "The Vishesh Group",
    description:
      "A premium corporate web platform built for Vishesh Group, a luxury real estate developer. Features architectural branding, interactive property showcase, priority viewing booking, and responsive UI.",
    img: VG,
    tech: ["Web Development", "UI/UX", "Responsive Design", "SEO"],
    link: "https://www.thevisheshgroup.com/",
  },
  {
    title: "Dotific Digital",
    description:
      "Website and digital solutions built for Dotific Digital agency, covering web development and digital marketing.",
    img: DD,
    tech: ["WordPress", "SEO", "Digital Marketing"],
    link: "https://dotificdigital.com",
  },
  {
    title: "Lib Digital",
    description:
      "Developed web presence and branding for Lib Digital with responsive design and modern web standards.",
    img: LIB,
    tech: ["WordPress", "Custom CSS"],
    link: "https://libdigital.com",
  },
];

const MotionTitle = ({ children, style }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  return (
    <h2 
      ref={ref} 
      className={`projects-title ${isInView ? "visible" : ""}`}
      style={style}
    >
      {children}
    </h2>
  );
};

const Projects = () => {
  useEffect(() => {
    const css = `
    .projects-section {
      padding: 5rem 2rem;
      background: linear-gradient(180deg, #0c0f1b, #14182c);
      color: #fff;
      text-align: center;
      overflow: hidden;
    }

    .projects-title {
      font-size: 2.5rem;
      margin-bottom: 3rem;
      background: linear-gradient(90deg, #06b6d4, #3b82f6);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      display: inline-block;
      position: relative;
    }

    .projects-title::after {
      content: "";
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 100%;
      height: 3px;
      
        background: linear-gradient(90deg, #36d1dc, #f0f2f5ff);

      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.6s ease;
    }

    .projects-title.visible::after {
      transform: scaleX(1);
    }

    .projects-grid {
      display: grid;
      gap: 2rem;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    }

    .project-card {
      background: rgba(26, 31, 46, 0.45);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 15px;
      padding: 1.5rem;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
      transition: all 0.4s ease;
      cursor: pointer;
      overflow: hidden;
      position: relative;
      transform-style: preserve-3d;
    }

    .project-card:hover {
      transform: translateY(-12px) rotateX(4deg) rotateY(4deg);
      box-shadow: 0 15px 40px rgba(59,130,246,0.3);
      border: 1px solid rgba(59,130,246,0.3);
    }

    .project-card img {
      width: 100%;
      border-radius: 10px;
      transition: transform 0.4s ease;
    }

    .project-card:hover img {
      transform: scale(1.05);
    }

    .project-card h3 {
      font-size: 1.5rem;
      margin: 1rem 0;
      color: #3b82f6;
    }

    .project-card p {
      font-size: 1rem;
      color: #bbb;
      margin-bottom: 1rem;
    }

    .tech-stack {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      justify-content: center;
      margin-bottom: 1rem;
    }

    .tech-badge {
      padding: 0.3rem 0.8rem;
      border-radius: 20px;
      background: rgba(6,182,212,0.15);
      border: 1px solid #06b6d4;
      font-size: 0.85rem;
      color: #06b6d4;
      transition: all 0.3s ease;
    }

    .tech-badge:hover {
      background: #06b6d4;
      color: #0c0f1b;
      box-shadow: 0 0 10px #06b6d4;
    }

    .view-btn {
      display: inline-block;
      margin-top: 0.5rem;
      padding: 0.5rem 1.2rem;
      border-radius: 10px;
      background: linear-gradient(90deg, #06b6d4, #3b82f6);
      color: #0c0f1b;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.3s ease;
    }

    .view-btn:hover {
      background: #fff;
      color: #0c0f1b;
      box-shadow: 0 0 15px rgba(6,182,212,0.6);
    }
    `;

    const styleEl = document.createElement("style");
    styleEl.innerHTML = css;
    document.head.appendChild(styleEl);

    return () => {
      if (styleEl.parentNode) styleEl.parentNode.removeChild(styleEl);
    };
  }, []);

  const renderProjects = (projects) =>
    projects.map((p, i) => (
      <motion.div 
        key={i} 
        className="project-card"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6, delay: i * 0.15 }}
      >
        <img src={p.img} alt={p.title} />
        <h3>{p.title}</h3>
        <p>{p.description}</p>
        <div className="tech-stack">
          {p.tech.map((t, j) => (
            <span key={j} className="tech-badge">
              {t}
            </span>
          ))}
        </div>
        <a href={p.link} target="_blank" rel="noopener noreferrer" className="view-btn">
          View Project
        </a>
      </motion.div>
    ));

  return (
    <section id="projects" className="projects-section">
      <MotionTitle>Personal Projects</MotionTitle>
      <div className="projects-grid">{renderProjects(personalProjects)}</div>

      <MotionTitle style={{ marginTop: "4rem" }}>
        Industrial Projects
      </MotionTitle>
      <div className="projects-grid">{renderProjects(industrialProjects)}</div>
    </section>
  );
};

export default Projects;
