import { useContext } from 'react'
import './TicketSelection.css'
import TicketProvider from '../../context/TicketProvider'

const TicketSelection = () => {
    const {page, setPage, formData, setFormData} = useContext(TicketProvider);
    
    const [selected, setSelected] = useState(formData.ticketType)

    const handleSelectedCard = (event) => {
        const {name, value} = event.target
        selected(value)
        setFormData((prev) => ({...prev, [name]: value}))
        setSelected(value)
    }

    const handleTicketNum = (event) => {
        const {name, value} = event.target
        setFormData((prev) => {
            return {...prev, [name]: value}
        })
    }

    const handleNext = () => {
        setPage(2)
    }


  return (
    <div className='info-container'>
        <div className='ticket-info'>
            <h1>Techember Fest "25</h1>
            <p>Join us for an unforgettable experience at</p>
            <p>[Event Name]! Secure your spot now.</p>
            <p className='date'> 📍[Event Location] || March 15, 2025 | 7:00PM</p>
        </div>
        <hr />
        <section>
        <p>Select Ticket Type:</p>

        <div className="ticket_type_card">
          <div
            className={`access_card selection_card ${
              selected === "REGULAR" ? "selected" : "access_card"
            }`}
            style={
              selected === "REGULAR"
                ? { backgroundColor: "#12464E" }
                : { backgroundColor: "transparent" }
            }
          >
            <label className="custom-radio">
              <input
                type="radio"
                name="ticket_type"
                value="REGULAR"
                checked={selected === "REGULAR"}
                onChange={handleSelectedCard}
              />
              <div className="access_wrap">
                <p className="access_price">Free</p>
                <p className="ticket_type">REGULAR ACCESS</p>
                <span className="ticket_type">20/52</span>
              </div>
            </label>
          </div>
          <div
            className={`access_card selection_card ${
              selected === "VIP" ? "selected" : "access_card "
            }`}
            style={
              selected === "VIP"
                ? { backgroundColor: "#12464E" }
                : { backgroundColor: "transparent" }
            }
          >
            <label className="custom-radio">
              <input
                type="radio"
                name="ticket_type"
                checked={selected === "VIP"}
                onChange={handleSelectedCard}
                value="VIP"
              />
              <div className="access_wrap">
                <p className="access_price">$50</p>
                <p className="ticket_type">VIP ACCESS</p>
                <span className="ticket_type"> 20/52</span>
              </div>
            </label>
          </div>
          <div
            className={`access_card selection_card ${
              selected === "VVIP" ? "selected" : "access_card"
            }`}
            style={
              selected === "VVIP"
                ? { backgroundColor: "#12464E" }
                : { backgroundColor: "transparent" }
            }
          >
            <label className="custom-radio">
              <input
                type="radio"
                name="ticket_type"
                value="VVIP"
                checked={selected === "VVIP"}
                onChange={handleSelectedCard}
              />

              <div className="access_wrap">
                <p className="access_price">$150</p>
                <p className="ticket_type">VVIP ACCESS</p>
                <span className="ticket_type">20/52</span>
              </div>
            </label>
          </div>
        </div>

        <div className="space_up">
          <label htmlFor="regular">Number of Tickets:</label>
          <br />
          <br />
          <form>
            <div className="select_div" onChange={handleTicketNum}>
              <select
                id="number_of_ticket"
                name="number_of_ticket"
                defaultValue={formData.numberOfTicket}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
          </form>
        </div>

        <div className="space_up btn_wrap">
          <button className="btn_sec">Cancel</button>
          <button className="btn_primary" onClick={handleNext}>
            Next
          </button>
        </div>
      </section>
    </div>
  )
}

export default TicketSelection