import './Home.css'

const Home = () => {
  return (
    <section className='ticket-container'>
        <div className='title-box'>
            <h1 className='title'>Ticket Selection</h1>
            <p className='step'>step 1/3</p>
        </div>
        <div className='progress-bar'>
            <div className='progress'></div>
        </div>
        <div className='info-container'>
            <div className='ticket-info'>
                <h1>Techember Fest "25</h1>
                <p>Join us for an unforgettable experience at</p>
                <p>[Event Name]! Secure your spot now.</p>
                <p className='date'> 📍[Event Location] || March 15, 2025 | 7:00PM</p>
            </div>
            <hr />
            <div className='ticket-type'>
                <p>Select Ticket Type:</p>
                <div className='type'>
                    <button className='regular'>REGULAR ACCESS 20left! <span>Free</span></button>
                    <button className='vip'>VIP ACCESS 20left! <span>$50</span></button>
                    <button className='vvip'>VVIP ACCESS 20left! <span>$150</span></button>
                </div>
            </div>
            <div className='selection-container'>
                <label for="tickets">Number of Tickets</label>
                <select id="tickets" name="tickets">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>

            <div className='decision-container'>
                <button className='cancel'>Cancel</button>
                <button className='next'>Next</button>
            </div>
        </div>
    </section>
  )
}

export default Home