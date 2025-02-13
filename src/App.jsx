import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Navbar from './Navbar/Navbar'
import TicketProvider from './context/TicketProvider'

const App = () => {
  return (
    <TicketProvider>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </TicketProvider>
  )
}

export default App