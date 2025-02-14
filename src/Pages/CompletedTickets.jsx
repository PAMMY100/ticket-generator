import { useContext, useEffect, useState } from "react";
import { TicketContext } from "../context/TicketProvider";
import './CompletedTickets.css'

const CompletedTickets = () => {
  const { completedTickets } = useContext(TicketContext);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    setTickets(completedTickets);
  }, [completedTickets]);

  return (
    <div className="completed-tickets-container">
      <h2 className="title">Completed Tickets</h2>
      {tickets.length === 0 ? (
        <p className="no-tickets">No completed tickets yet.</p>
      ) : (
        <div className="tickets-grid">
          {tickets.map((ticket, index) => (
            <div key={index} className="ticket-card">
              <h3 className="ticket-name">{ticket.fullname}</h3>
              <p><strong>Email:</strong> {ticket.email}</p>
              <p><strong>Ticket Type:</strong> {ticket.ticketType}</p>
              <p><strong>Request:</strong> {ticket.request}</p>
              {ticket.image && (
                <img src={ticket.image} alt="Uploaded" className="ticket-image" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompletedTickets;
