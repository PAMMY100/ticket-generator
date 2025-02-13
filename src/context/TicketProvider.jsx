import { createContext, useEffect, useState } from "react"


export const TickectContext = createContext()

const allData = () => {
  const storedData = localStorage.getItem("data");
  if (!storedData) {
    return {page: "1", numberOfTicket: "1", ticketType: "REGULAR", email: "", fullname: "", request: "", image: ""}
  }
  return JSON.parse(storedData)
}

const TicketProvider = ({children}) => {
  const [page, setPage] = useState(1);
  const [formData, setFormData] = useState(allData)

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(formData))
  }, [formData, page])

  // const next = () => {
  //   setPage(page + 1)
  // }

  // const prev = () => {
  //   setPage(page - 1)
  // }

  return (
    <TickectContext.Provider value={{page, setPage, formData, setFormData}}>
        {children}
    </TickectContext.Provider>
  )
}

export default TicketProvider