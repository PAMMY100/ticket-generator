import { createContext, useEffect, useState } from "react";

export const TicketContext = createContext();

function allData() {
  const storedData = localStorage.getItem("data");
  if (!storedData)
    return {
      page: "1",
      numberOfTicket: "1",
      ticketType: "REGULAR",
      email: "",
      fullname: "",
      request: "",
      image: "",
    };
  return JSON.parse(storedData);
}

function getCompletedTickets() {
  const storedTickets = localStorage.getItem("completedTickets");
  return storedTickets ? JSON.parse(storedTickets) : [];
}

const TicketProvider = ({ children }) => {
  const [page, setPage] = useState(1);
  const [formData, setFormData] = useState(allData);
  const [completedTickets, setCompletedTickets] = useState(getCompletedTickets);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(formData));
  }, [formData, page]);

  useEffect(() => {
    localStorage.setItem("completedTickets", JSON.stringify(completedTickets));
  }, [completedTickets]);

  const addCompletedTicket = (ticket) => {
    setCompletedTickets((prev) => [...prev, ticket]);
  };

  return (
    <TicketContext.Provider
      value={{ page, setPage, formData, setFormData, completedTickets, addCompletedTicket }}
    >
      {children}
    </TicketContext.Provider>
  );
};

export default TicketProvider;
