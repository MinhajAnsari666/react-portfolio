import React, { useEffect, useState } from "react";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  useEffect(() => {
    const css = `
      .contact-container {
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 5rem 2rem;
        background: linear-gradient(180deg, #0c0f1b, #14182c);
        color: #fff;
        overflow: hidden;
        position: relative;
      }

      .contact-container::before {
        content: "";
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: url("https://www.transparenttextures.com/patterns/stardust.png");
        opacity: 0.06;
        animation: bgMove 40s linear infinite;
      }

      @keyframes bgMove {
        0% { transform: translate(0, 0); }
        100% { transform: translate(300px, 300px); }
      }

      .contact-content {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-wrap: wrap;
        width: 100%;
        max-width: 1100px;
        z-index: 2;
        gap: 3rem;
      }

      .contact-left {
        flex: 1;
        min-width: 280px;
        animation: floaty 6s ease-in-out infinite;
      }

      @keyframes floaty {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
        100% { transform: translateY(0px); }
      }

      .contact-left h2 {
        font-size: 2.8rem;
        font-weight: 700;
        margin-bottom: 1rem;
        background: linear-gradient(90deg, #36d1dc, #f0f2f5ff);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        position: relative;
        display: inline-block;
      }

      .contact-left h2::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: -6px;
        width: 100%;
        height: 3px;
        background: linear-gradient(90deg, #06b6d4, #3b82f6);
        transform: scaleX(0);
        transform-origin: left;
        animation: underlineAnim 2s ease forwards;
      }

      @keyframes underlineAnim {
        to { transform: scaleX(1); }
      }

      .contact-left p {
        color: #aaa;
        font-size: 1rem;
        line-height: 1.6;
        margin-bottom: 2rem;
      }

      .contact-form {
        flex: 1;
        min-width: 320px;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(59,130,246,0.3);
        border-radius: 15px;
        padding: 2rem;
        box-shadow: 0 0 25px rgba(59,130,246,0.1);
        backdrop-filter: blur(10px);
        position: relative;
      }

      .contact-form h3 {
        font-size: 1.4rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
      }

      .contact-form p {
        font-size: 0.95rem;
        color: #aaa;
        margin-bottom: 1.5rem;
      }

      .contact-form input,
      .contact-form textarea {
        width: 100%;
        background: rgba(255,255,255,0.08);
        border: none;
        outline: none;
        border-radius: 10px;
        padding: 1rem;
        margin-bottom: 1.2rem;
        color: #fff;
        font-size: 1rem;
        transition: all 0.3s;
      }

      .contact-form input:focus,
      .contact-form textarea:focus {
        background: rgba(255,255,255,0.15);
        box-shadow: 0 0 15px rgba(6,182,212,0.7);
        transform: scale(1.01);
      }

      .contact-form textarea {
        resize: none;
        height: 120px;
      }

      .contact-form button {
        width: 100%;
        background: linear-gradient(90deg, #06b6d4, #3b82f6);
        border: none;
        color: #fff;
        font-weight: 600;
        font-size: 1.1rem;
        padding: 1rem;
        border-radius: 8px;
        cursor: pointer;
        transition: 0.3s ease;
        box-shadow: 0 0 15px rgba(59,130,246,0.4);
      }

      .contact-form button:hover {
        transform: translateY(-3px);
        box-shadow: 0 0 25px rgba(59,130,246,0.8);
      }

      .success-msg {
        margin-top: 1rem;
        padding: 0.8rem;
        background: rgba(6,182,212,0.1);
        border-left: 4px solid #06b6d4;
        color: #06b6d4;
        font-size: 0.95rem;
        border-radius: 5px;
        animation: fadeIn 0.6s ease-in-out;
      }

      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }

      @media (max-width: 768px) {
        .contact-content {
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .contact-left {
          margin-bottom: 2rem;
        }

        .contact-left h2 {
          font-size: 2.2rem;
        }

        .contact-form {
          width: 90%;
          padding: 1.5rem;
        }
      }
    `;
const style = document.createElement("style");
    style.innerHTML = css;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("entry.743560276", e.target.name.value);   // Name
    formData.append("entry.304267812", e.target.email.value);  // Email
    formData.append("entry.1960649946", e.target.message.value); // Message

 fetch("https://docs.google.com/forms/d/e/1FAIpQLSdsnR2YHpfsIdedBsEYgvNXkIHu9Y82DSZKP9MiCgH94i6s1w/formResponse", {
  method: "POST",
  body: formData,
  mode: "no-cors"
})

      .then(() => {
        setSubmitted(true);
        e.target.reset();
        setTimeout(() => setSubmitted(false), 4000);
      })
      .catch((err) => console.error("Error:", err));
  };

  return (
    <section id="contact" className="contact-container">
      <div className="contact-content">
        <div className="contact-left">
          <h2>Get in Touch</h2>
          <p>
            Have an idea or a project in mind? Let’s collaborate and bring your
            vision to life. Feel free to reach out, and I’ll get back to you as
            soon as possible.
          </p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <h3>Let’s Work Together</h3>
          <p>Fill out the form and I’ll respond as soon as I can!</p>
          <input type="text" name="name" placeholder="Your name" required />
          <input type="email" name="email" placeholder="Your email" required />
          <textarea name="message" placeholder="Your message" required></textarea>
          <button type="submit">Send Message</button>
          {submitted && (
            <div className="success-msg">
              ✅ Message sent successfully!
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

export default Contact;