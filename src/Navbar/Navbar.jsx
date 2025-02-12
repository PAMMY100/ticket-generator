import { Link } from 'react-router-dom'
import './Navbar.css'
import logo from '../assets/logo.svg'
import arrow from '../assets/arrow.svg'

const Navbar = () => {

  return (
    <header>
        <div>
            <img src={logo} alt="logo" className='logo'/>
        </div>
        <nav>
            <ul>
                <li><Link>Events</Link></li>
                <li><Link>My Tickets</Link></li>
                <li><Link>About Project</Link></li>
            </ul>
        </nav>
        <div>
            <button className='myticket-btn'>MY TICKETS <img src={arrow} alt='direction'/></button>
        </div>
    </header>
  )
}

export default Navbar