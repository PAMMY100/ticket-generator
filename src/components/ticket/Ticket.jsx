import { useContext, useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./Ticket.css";
import { TicketContext } from "../../context/TicketProvider";
import Bar_code from '../../assets/Bar_code.png';

const Ticket = () => {
  const { page, setPage, formData, setFormData } = useContext(TicketContext);
  const ticketRef = useRef(null);
  const barcodeRef = useRef(null);

    const getNewticket = () => {
        setFormData((prev) => ({
            ...prev,
            page: "1", numberOfTicket: "1", ticketType: "REGULAR", email: "", fullname: "", request: "", image: ""
        }));
        setPage(1);
    };




  const downloadPDF = () => {
    html2canvas(ticketRef.current, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("portrait", "mm", "a4");
      pdf.addImage(imgData, "PNG", 10, 10, 190, (canvas.height * 190) / canvas.width);
      pdf.save("ticket.pdf");
    });
  };

  return (
    <div className="ticket-container">
      <h2>Your Ticket is Booked!</h2>
      <p>Check your email for a copy or you can download it</p>

      <div className="ticketWrapper" ref={ticketRef}>
        <div className="ticketFile">
          <h2 className="eventTitle">Techember Fest '25</h2>
          <p className="eventLocation">📍 04 Rumens Road, Ikoyi, Lagos</p>
          <p className="event-date">📅 March 15, 2025 | 7:00 PM</p>

          <div className="ticketContent">
            <div className="ticketImage">
              {formData.image ? <img src={formData.image} alt="Uploaded" /> : <div className="placeholder" />}
            </div>

            <table className="ticketInfo">
              <tbody>
                <tr>
                  <td>Full Name</td>
                  <td>Email</td>
                </tr>
                <tr>
                  <td>{formData.fullname}</td>
                  <td>{formData.email}</td>
                </tr>
                <tr>
                  <td>Ticket Type:</td>
                  <td>Ticket for:</td>
                </tr>
                <tr>
                  <td>{formData.ticketType}</td>
                  <td>{formData.numberOfTicket}</td>
                </tr>
                <tr>
                  <td>Special Request</td>
                  <td>{formData.request}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="barcode-container">
            <img src={Bar_code} alt="barcode" />
          </div>
        </div>
      </div>

      <div className="decision-container">
                 <button className="btn_sec" onClick={getNewticket}>
                    Book Another Ticket
                </button>
                <button
                    className="btn_primary"
                    onClick={downloadPDF}
                >
                    Download Ticket
                </button>
            </div> 
    </div>
  );
};

export default Ticket;


            