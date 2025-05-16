import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import FertilizationPlanner from './pages/FertilizationPlanner';
import Dolar from './components/Dolar/Dolar';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
        <FertilizationPlanner />
      
    </>
  )
}

export default App
