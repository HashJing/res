// src/App.tsx
import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div id="title">
        <div>HashJing Contacts and resourses</div>
      </div>

      <main id="main-section">
        <div className="section-title">Contacts and resourses</div>
        <p className="status">Some Text</p>
      </main>
    </>
  )
}

export default App
