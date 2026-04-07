import React, { useEffect } from "react";

const Footer = () => {
  useEffect(() => {
    const css = `
      .footer {
        background: radial-gradient(circle at top, #101425 0%, #060910 100%);
        color: #fff;
        padding: 4rem 2rem 2rem;
        text-align: center;
        position: relative;
        overflow: hidden;
      }

      /* Floating gradient aura background */
      .footer::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 200%;
        height: 200%;
        background: 
          radial-gradient(800px circle at 10% 20%, rgba(59,130,246,0.07), transparent 60%),
          radial-gradient(600px circle at 90% 30%, rgba(6,182,212,0.08), transparent 70%),
          radial-gradient(700px circle at 50% 100%, rgba(3,105,161,0.07), transparent 80%);
        animation: floatBg 30s linear infinite alternate;
        z-index: 1;
      }

      @keyframes floatBg {
        0% { transform: translate(0, 0); }
        100% { transform: translate(-100px, -100px); }
      }

      .footer-content {
        position: relative;
        z-index: 2;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1.8rem;
      }

      .footer h2 {
        font-size: 2rem;
        font-weight: 700;
        background: linear-gradient(90deg, #06b6d4, #3b82f6);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        position: relative;
        display: inline-block;
      }

      .footer h2::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: -6px;
        width: 100%;
        height: 3px;
        background: linear-gradient(90deg, #36d1dc, #f0f2f5ff);
        border-radius: 3px;
        animation: underlineGlow 3s ease-in-out infinite alternate;
      }

      @keyframes underlineGlow {
        0% { opacity: 0.5; box-shadow: 0 0 10px rgba(59,130,246,0.3); }
        100% { opacity: 1; box-shadow: 0 0 20px rgba(59,130,246,0.8); }
      }

      .footer-menu {
        display: flex;
        gap: 2rem;
        justify-content: center;
        flex-wrap: wrap;
        margin-top: 0.5rem;
      }

      .footer-menu a {
        color: #aaa;
        text-decoration: none;
        font-size: 1rem;
        transition: color 0.3s ease;
        position: relative;
      }

      .footer-menu a::after {
        content: "";
        position: absolute;
        width: 0%;
        height: 2px;
        left: 0;
        bottom: -4px;
        background: linear-gradient(90deg, #06b6d4, #3b82f6);
        transition: width 0.3s;
      }

      .footer-menu a:hover {
        color: #fff;
      }

      .footer-menu a:hover::after {
        width: 100%;
      }

      /* Social Icons */
      .social-icons {
        display: flex;
        justify-content: center;
        gap: 1.6rem;
        margin-top: 1rem;
      }

      .social-icons a {
        color: #fff;
        font-size: 1.7rem;
        transition: 0.4s ease;
        position: relative;
           text-decoration: none;
      }

      /* glowing pulse effect */
      .social-icons a::before {
        content: "";
        position: absolute;
        inset: -8px;
        background: radial-gradient(circle, rgba(59,130,246,0.25), transparent 70%);
        border-radius: 50%;
        opacity: 0;
        transition: opacity 0.4s ease;
      }

      .social-icons a:hover::before {
        opacity: 1;
        animation: pulse 1.8s ease-in-out infinite;
      }

      @keyframes pulse {
        0%, 100% { transform: scale(1); opacity: 0.8; }
        50% { transform: scale(1.3); opacity: 0.4; }
      }

      .social-icons a:hover {
        color: #06b6d4;
        transform: translateY(-4px);
      }

      .created-by {
        margin-top: 1.5rem;
        font-size: 1rem;
        color: #aaa;
      }

      .created-by span {
        color: #06b6d4;
      }

      .footer-bottom {
        margin-top: 1rem;
        font-size: 0.9rem;
        color: #666;
        border-top: 1px solid rgba(255,255,255,0.1);
        padding-top: 1rem;
      }

      @media (max-width: 600px) {
        .footer h2 { font-size: 1.6rem; }
        .footer-menu { gap: 1rem; }
        .social-icons a { font-size: 1.4rem; }
      }
    `;

    const style = document.createElement("style");
    style.innerHTML = css;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <footer className="footer">
      <div className="footer-content">
        <h2>Ansari Md Minhaj  </h2>

        <div className="footer-menu">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="social-icons">
          <a href="https://www.instagram.com/minhaj.30/" target="_blank" rel="noreferrer">
            <i className="ri-instagram-fill"></i>
          </a>
          <a href="https://github.com/MinhajAnsari666/MinhajAnsari666" target="_blank" rel="noreferrer">
            <i className="ri-twitter-x-fill"></i>
          </a>
          <a href="https://github.com" target="_blank" rel="noreferrer">
            <i className="ri-github-fill"></i>
          </a>
          <a href="https://www.linkedin.com/in/ansari-md-minhaj-014177275/?originalSubdomain=in" target="_blank" rel="noreferrer">
            <i className="ri-linkedin-box-fill"></i>
          </a>
        </div>

        <div className="created-by">
          Created with <span>❤</span> by <strong>Minhaj Ansari</strong>
        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} Minhaj Ansari | All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
