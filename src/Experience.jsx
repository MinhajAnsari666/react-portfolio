import React, { useEffect } from "react";

const experiences = [
  {
    company: "Ihaan Technologies",
    role: "Frontend Developer Intern",
    duration: "Sep 2023 - Mar 2024",
    description:
      "Worked on a fully responsive E-Commerce Website frontend, implementing product listings, categories, and cart functionality with modern UI/UX.",
  },
  {
    company: "The Schnell App",
    role: "Frontend Developer",
    duration: "Mar 2024 - Oct 2025",
    description:
      "Developed and optimized portfolio & landing page projects, focusing on responsive design, smooth animations, and performance improvements.",
  },
    {
    company: "Nextgen Infratech Solutions",
    role: "Software Developer and SEO Executive",
    duration: "Oct 2025 - Present",
    description:
      "Worked on a fully responsive E-Commerce Website frontend, implementing product listings, categories, and cart functionality with modern UI/UX.",
  },
];

const Experience = () => {
  useEffect(() => {
    const css = `
      .experience-section {
        padding: 5rem 2rem;
        background: linear-gradient(180deg, #0c0f1b, #14182c);
        color: #fff;
        text-align: center;
        position: relative;
        overflow: hidden;
      }

      /* floating stardust bg */
      .experience-section::before {
        content: "";
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: url("https://www.transparenttextures.com/patterns/stardust.png");
        opacity: 0.07;
        animation: floatBackground 50s linear infinite;
        z-index: 0;
      }

      @keyframes floatBackground {
        0% { transform: translate(0,0); }
        100% { transform: translate(300px, 300px); }
      }

      .experience-title {
        font-size: 2.5rem;
        margin-bottom: 3rem;
        background: linear-gradient(90deg, #06b6d4, #3b82f6);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        display: inline-block;
        position: relative;
        z-index: 1;
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease;
      }

      .experience-title.visible {
        opacity: 1;
        transform: translateY(0);
      }

      .experience-title::after {
        content: "";
        position: absolute;
        bottom: -8px;
        left: 0;
        width: 100%;
        height: 3px;
       
          background: linear-gradient(90deg, #36d1dc, #f0f2f5ff);

        transform: scaleX(0);
        transform-origin: left;
        transition: transform 0.8s ease;
      }

      .experience-title.visible::after {
        transform: scaleX(1);
      }

      .timeline {
        position: relative;
        margin: auto;
        max-width: 800px;
        padding: 2rem 0;
        z-index: 1;
      }

      .timeline::before {
        content: "";
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 4px;
        height: 100%;
          background: linear-gradient(90deg, #36d1dc, #f0f2f5ff);
        box-shadow: 0 0 20px rgba(59,130,246,0.5);
      }

      .timeline-item {
        position: relative;
        width: 50%;
        padding: 1rem 2rem;
        box-sizing: border-box;
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.8s ease;
      }

      .timeline-item.visible {
        opacity: 1;
        transform: translateY(0);
      }

      .timeline-item.left {
        left: 0;
        text-align: right;
      }

      .timeline-item.right {
        left: 50%;
      }

      .timeline-dot {
        width: 20px;
        height: 20px;
        background: #3b82f6;
        border-radius: 50%;
        position: absolute;
        top: 20px;
        right: -10px;
        box-shadow: 0 0 20px #3b82f6;
        animation: pulse 2s infinite;
      }

      .timeline-item.right .timeline-dot {
        left: -10px;
      }

      @keyframes pulse {
        0% { box-shadow: 0 0 5px #3b82f6, 0 0 10px #3b82f6; }
        50% { box-shadow: 0 0 20px #3b82f6, 0 0 40px #06b6d4; }
        100% { box-shadow: 0 0 5px #3b82f6, 0 0 10px #3b82f6; }
      }

      .experience-card {
        background: #1a1f2e;
        padding: 1.5rem;
        border-radius: 15px;
        box-shadow: 0 0 20px rgba(59,130,246,0.15);
        transition: all 0.5s ease;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }

      .experience-card:hover {
        transform: translateY(-10px) scale(1.02);
        box-shadow: 0 0 25px rgba(59,130,246,0.4);
      }

      /* gradient shine on hover */
      .experience-card::after {
        content: "";
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          120deg,
          transparent,
          rgba(255,255,255,0.2),
          transparent
        );
        transition: 0.5s;
      }

      .experience-card:hover::after {
        left: 100%;
      }

      .experience-card h3 {
        font-size: 1.4rem;
        color: #06b6d4;
        margin-bottom: 0.5rem;
        text-align : center;
      }

      .experience-card h4 {
        font-size: 1rem;
        color: #3b82f6;
        margin-bottom: 0.5rem;
        text-align : center;
      }

      .experience-card p {
        color: #bbb;
        font-size: 0.95rem;
        line-height: 1.5;
        text-align : center;
      }

      @media (max-width: 768px) {
        .timeline::before {
          left: 8px;
        }

        .timeline-item {
          width: 100%;
          padding-left: 3rem;
          text-align: left;
        }

        .timeline-item.right {
          left: 0;
        }

        .timeline-item .timeline-dot {
          left: 0;
        }
      }
    `;

    const styleEl = document.createElement("style");
    styleEl.innerHTML = css;
    document.head.appendChild(styleEl);

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

    document.querySelectorAll(".experience-title, .timeline-item").forEach((el) => observer.observe(el));

    return () => {
      if (styleEl.parentNode) styleEl.parentNode.removeChild(styleEl);
      observer.disconnect();
    };
  }, []);

  return (
    <section id="experience" className="experience-section">
      <h2 className="experience-title">Experiences</h2>
      <div className="timeline">
        {experiences.map((exp, i) => (
          <div
            key={i}
            className={`timeline-item ${i % 2 === 0 ? "left" : "right"}`}
          >
            <span className="timeline-dot"></span>
            <div className="experience-card">
              <h3>{exp.company}</h3>
              <h4>
                {exp.role} | {exp.duration}
              </h4>
              <p>{exp.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
