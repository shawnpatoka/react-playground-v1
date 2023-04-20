import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import NavBar from './components/NavBar'
import TicketsOpen from './pages/TicketsOpen'
import TicketCreate from './pages/TicketCreate'
import TicketDetail from './pages/TicketDetail'







function App() {
  const [count, setCount] = useState(0)


  return (
    <>
      <NavBar />
      <div className='container mt-4'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tickets/open/" element={<TicketsOpen />} />
          <Route path="/tickets/create/" element={<TicketCreate />} />
          <Route path="/tickets/:id/" element={<TicketDetail />} />
        </Routes>
      </div>
    </>
  )
}

export default App
