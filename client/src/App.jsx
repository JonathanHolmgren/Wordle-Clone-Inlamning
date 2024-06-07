import { useState } from 'react'
import WordleGame from './components/WordleGame'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <WordleGame/>
    </>
  )
}

export default App
