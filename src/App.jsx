import './App.css'
import Header from './Header'
import Home from './Home'
import AboutMe from './AboutMe'
import Skills from './Skills'
import Projects from './Projects'
import Experience from './Experience'
import Contact from './Contact'
import Footer from './Footer'
import ChatBot from './ChatBot'

function App() {
  

  return (
    <>
      <Header></Header>
      <Home></Home>
      <AboutMe></AboutMe>
      <Skills></Skills>
      <Projects></Projects>
    <Experience></Experience>
    <Contact></Contact>
    <Footer></Footer>
    {/* <Chatbot></Chatbot> */}
     <ChatBot />
    </>
  )
}

export default App
