import { useContext, useEffect } from 'react'
import Attendee from '../components/attendee/Attendee'
import TicketSelection from '../components/selection/TicketSelection'
import './Home.css'
import { TickectContext } from '../context/TicketProvider';
import Ticket from '../components/ticket/Ticket';

const Home = () => {
    const {page, setPage, formData, setFormData} = useContext(TickectContext);

    let step = '';

    useEffect(() => {
        if (page === 2) {
            step = 'two'
        } else if (page === 3) {
            step = 'three'
        }
    }, [page])
    
    

  return (
    <section className='ticket-container'>
        <div className='title-box'>
            <h1 className='title'>Ticket Selection</h1>
            <p className='step'>step {page}/3</p>
        </div>
        <div className='progress-bar'>
            <div className={`progress ${step}`}></div>
        </div>
        {page === 1 && <TicketSelection />}
        {page === 2 && <Attendee />}
        {page === 3 && <Ticket />}
    </section>
  )
}

export default Home