//@ts-nocheck
import { useRef } from 'react';
import './App.css'
import TypingHero from './components/TypingHero'
import Typingtest from './components/TypingTest'
function App() {
  const testRef = useRef(null);

  const scrollToTest = () => {
    if (testRef.current) {
      testRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <TypingHero scrollToTest={scrollToTest} />
      <Typingtest ref={testRef} />
    </>
  )
}

export default App
