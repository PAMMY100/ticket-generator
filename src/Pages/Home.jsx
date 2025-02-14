import { useContext, useEffect, useState } from 'react'
import Attendee from '../components/attendee/Attendee'
import TicketSelection from '../components/selection/TicketSelection'
import './Home.css'

import Ticket from '../components/ticket/Ticket';
import { TicketContext } from '../context/TicketProvider';

const Home = () => {
    const [title, setTitle] = useState("");
    const [increase, setIncrease] = useState("")
    const [progress, setProgress] = useState("33%");
    const {page, setPage, formData, setFormData} = useContext(TicketContext);


    useEffect(() => {
        if (page === 1) {
            setTitle("Ticket Selection");
            setProgress('33%')
            setIncrease("")
        } else if (page === 2) {
            setTitle("Attendee Details")
            setIncrease('1099px')
            setProgress("66%")
        } else if (page === 3) {
            setTitle("Ready")
            setProgress("100%")
            setIncrease("")
        }
    }, [page])
    
    

  return (
    <section className='ticket-container' style={{height: increase}}>
        <div className='title-box'>
            <h1 className='title'>{title}</h1>
            <p className='step' style={{fontSize: '30px'}}>step {page}/3</p>
        </div>
        <div className='progress-bar'>
            <div className='progress' style={{width: progress}}></div>
        </div>
        <div>
         {page === 1 ? ( <TicketSelection />) : page === 2 ? ( <Attendee />) : page === 3 ? (<Ticket />) : ('')}
        </div>
    </section>
  )
}

export default Home