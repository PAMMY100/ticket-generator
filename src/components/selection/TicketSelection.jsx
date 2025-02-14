import { useContext, useState } from 'react';
import './TicketSelection.css';
import { TicketContext } from '../../context/TicketProvider';

const TicketSelection = () => {
  const { page, setPage, formData, setFormData } = useContext(TicketContext);
  const [selected, setSelected] = useState(formData.ticketType);

  const handleSelectedCard = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSelected(value);
  };

  const handleTicketNum = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleNext = () => {
    setPage(2);
  };

  return (
    <div className='info-container'>
      <div className='ticket-info'>
        <h1>Techember Fest "25</h1>
        <p>Join us for an unforgettable experience at</p>
        <p>[Event Name]! Secure your spot now.</p>
        <p className='date'> 📍[Event Location] || March 15, 2025 | 7:00PM</p>
      </div>
      <hr />
      <div className="ticket-type">
        <h3>Select Ticket Type:</h3>
        <div className="ticket-options">
          <div className={`ticket ${selected === 'REGULAR' ? 'selected' : ''}`} onClick={() => handleSelectedCard({ target: { name: 'ticketType', value: 'REGULAR' } })} style={selected === "REGULAR" ? { backgroundColor: "#12464E" } : { backgroundColor: "transparent" }}>
            <span style={{textAlign: 'left', marginLeft: '0px', marginRight: '10px', background: 'transparent'}}>REGULAR ACCESS</span>
            <span className={`ticket-price ${selected === 'REGULAR' ? 'free' : ''}`}>Free</span>
            <span className="ticket-left">20 left!</span>
          </div>
          <div className={`ticket ${selected === 'VIP' ? 'selected' : ''}`} onClick={() => handleSelectedCard({ target: { name: 'ticketType', value: 'VIP' } })} style={selected === "VIP" ? { backgroundColor: "#12464E" } : { backgroundColor: "transparent" }}>
            <span style={{textAlign: 'left', marginLeft: '0px', marginRight: '50px', background: 'transparent'}}>VIP ACCESS</span>
            <span className="ticket-price">$50</span>
            <span className="ticket-left">20 left!</span>
          </div>
          <div className={`ticket ${selected === 'VVIP' ? 'selected' : ''}`} onClick={() => handleSelectedCard({ target: { name: 'ticketType', value: 'VVIP' } })} style={selected === "VVIP" ? { backgroundColor: "#12464E" } : { backgroundColor: "transparent" }}>
            <span style={{textAlign: 'left', marginLeft: '0px', marginRight: '30px', background: 'transparent'}}>VVIP ACCESS</span>
            <span className="ticket-price">$150</span>
            <span className="ticket-left">20 left!</span>
          </div>
        </div>
      </div>
      <div className='selection-container'>
        <label htmlFor="number_of_ticket">Number of Tickets</label>
        <select id="number_of_ticket" name="numberOfTicket" defaultValue={formData.numberOfTicket} onChange={handleTicketNum}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </div>
      <div className='decision-container'>
        <button className='cancel'>Cancel</button>
        <button className='next' onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default TicketSelection;