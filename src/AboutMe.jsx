import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Profile from './assets/pic.jpg';

export default function AboutMe() {
  const headingRef = useRef(null);

  useEffect(() => {
    const css = `
.about-section {
  min-height: 80vh;
  background: linear-gradient(180deg, #0c0f1b, #14182c);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  color: var(--text);
  overflow: hidden;
}

.about-container {
  max-width: 1100px;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 3.5rem;
  flex-wrap: wrap;
}

.about-photo {
  flex: 1;
  display: flex;
  justify-content: center;
  position: relative;
}

.about-photo img {
  width: 270px;
  height: 270px;
  object-fit: cover;
  border-radius: 50%;
  border: 4px solid transparent;
  background-image: linear-gradient(135deg, #06b6d4, #3b82f6);
  background-origin: border-box;
  background-clip: content-box, border-box;
  box-shadow: 0 0 25px rgba(59, 130, 246, 0.35);
  animation: float 5s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
}

.about-content {
  flex: 2;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 2.5rem;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

/* Heading with underline */
.about-content h2 {
  font-size: 2.4rem;
  font-weight: 700;
  margin-bottom: 1.2rem;
  display: inline-block;
  position: relative;
  background: linear-gradient(90deg, #06b6d4, #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.about-content h2::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -6px;
  height: 3px;
  width: 0;
  background: linear-gradient(90deg, #36d1dc, #f0f2f5ff);
  border-radius: 3px;
  transition: width 0.7s ease;
}

.about-content h2.underline-animate::after {
  width: 100%;
}

.about-content p {
  font-size: 1.15rem;
  line-height: 1.8;
  color: var(--muted);
  margin-bottom: 1.8rem;
}

.about-info {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  font-size: 1.08rem;
}

.about-info span {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  transition: transform 0.3s ease, color 0.3s ease;
}

.about-info span:hover {
  transform: translateX(6px);
  color: #3b82f6;
}

i {
  color: white;
  font-size: 20px;
  margin-right: 8px;
}
`;
    const styleEl = document.createElement("style");
    styleEl.setAttribute("data-from", "AboutMe.jsx");
    styleEl.innerHTML = css;
    document.head.appendChild(styleEl);

    // IntersectionObserver to trigger underline animation
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          headingRef.current.classList.add("underline-animate");
        }
      },
      { threshold: 0.5 }
    );
    if (headingRef.current) observer.observe(headingRef.current);

    return () => {
      if (styleEl.parentNode) styleEl.parentNode.removeChild(styleEl);
      if (headingRef.current) observer.unobserve(headingRef.current);
    };
  }, []);

  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <motion.div 
          className="about-photo"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          <img src={Profile}  alt="Ansari Minhaj" />
        </motion.div>
        
        <motion.div 
          className="about-content"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <h2 ref={headingRef}>About Me</h2>
          <p>
            Hey there !! I’m Ansari Minhaj, a passionate Software Engineer dedicated to building responsive and engaging web applications. I enjoy exploring new technologies and continuously improving my skills. Alongside development, I also have knowledge of Digital Marketing, WordPress, and SEO, which helps me create solutions that are not only technically sound but also impactful and user-centric.
          </p>
          <div className="about-info">
            <span>
              <i className="fa-solid fa-location-dot"></i> Mumbai, India
            </span>
            <span>
              <i className="fa-solid fa-briefcase"></i> Available for new projects
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


