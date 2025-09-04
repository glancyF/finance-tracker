import { useState } from 'react'
import './App.css'
import { BrowserRouter } from "react-router-dom";
import Router from "./router.jsx"
function App() {
  const [count, setCount] = useState(0)

  return (
      <BrowserRouter>
          <Router/>
      </BrowserRouter>
  )
}

export default App
