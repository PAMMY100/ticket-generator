
import { useNavigate } from 'react-router-dom';
import './About.css'

const TicketGenerator = () => {
    const navigate = useNavigate()

    const getStarted = () => {
        navigate('/')
    }

  return (
    <div className="container">
      <div className="card">
        <div className="header">
          <h1>Welcome to the Ultimate</h1>
          <h1>Ticket Generator App</h1>
        </div>
        <p className="description">
          Generate your ticket for the upcoming <strong>Techember Fest '25</strong>
          <br />
          <em>Secure your spot now!</em>
        </p>
        <button className="start-button" onClick={getStarted}>Get Started</button>
      </div>
    </div>
  );
};

export default TicketGenerator;
