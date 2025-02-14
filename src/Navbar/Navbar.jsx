import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'
import logo from '../assets/logo.svg'
import arrow from '../assets/arrow.svg'
import { useState } from 'react'

const Navbar = () => {
    const [active, setActive] = useState('event')
    const navigate = useNavigate()

    const handleNext = () => {
        navigate('/tickets')
    }

  return (
    <header>
        <div>
            <img src={logo} alt="logo" className='logo'/>
        </div>
        <nav>
            <ul>
                <li ><Link to='/' className={active === 'event' ? 'isActive' : ''} onClick={() => setActive('event')}>Events</Link></li>
                <li><Link to='/tickets' className={active === 'ticket' ? 'isActive' : ''} onClick={() => setActive('ticket')}>My Tickets</Link></li>
                <li><Link to='/about' className={active === 'about' ? 'isActive' : ''} onClick={() => setActive('about')}>About Project</Link></li>
            </ul>
        </nav>
        <div>
            <button className='myticket-btn' onClick={handleNext}>MY TICKETS <img src={arrow} alt='direction' className='arrow'/></button>
        </div>
    </header>
  )
}

export default Navbar