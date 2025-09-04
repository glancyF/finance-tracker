import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <h1 className="text-4xl font-bold text-blue-600">
              Tailwind работает! GGG 🚀
          </h1>
      </div>
  )
}

export default App
