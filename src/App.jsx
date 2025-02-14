import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Navbar from './Navbar/Navbar'
import TicketProvider from './context/TicketProvider'
import TicketGenerator from './Pages/About'
import CompletedTickets from './Pages/CompletedTickets'

const App = () => {
  return (
    <TicketProvider>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<TicketGenerator />} />
        <Route path='/tickets' element={<CompletedTickets />} />
      </Routes>
    </TicketProvider>
  )
}

export default App