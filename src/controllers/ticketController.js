import { randomUUID } from "node:crypto"

const tickets = []

const createTicket = (req, res) => {
  const { equipment, description, user_name } = req.body
  const newTicket = {
    id: randomUUID(),
    equipment,
    description,
    user_name,
    status: "open",
    created_at: new Date(),
  }
  tickets.push(newTicket)
  res.writeHead(201, { "Content-Type": "application/json" })
  res.end(JSON.stringify(newTicket))
}

const getTickets = (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`)
  const status = url.searchParams.get("status")
  const filteredTickets = status
    ? tickets.filter((ticket) => ticket.status === status)
    : tickets
  res.writeHead(200, { "Content-Type": "application/json" })
  res.end(JSON.stringify(filteredTickets))
}

const updateTicket = (req, res) => {
  const id = req.url.split("/")[2]
  const { equipment, description } = req.body
  const ticket = tickets.find((ticket) => ticket.id === id)
  if (ticket) {
    ticket.equipment = equipment
    ticket.description = description
    res.writeHead(200, { "Content-Type": "application/json" })
    res.end(JSON.stringify(ticket))
  } else {
    res.writeHead(404, { "Content-Type": "application/json" })
    res.end(JSON.stringify({ message: "Ticket não encontrado" }))
  }
}

const closeTicket = (req, res) => {
  const id = req.url.split("/")[2]
  const ticket = tickets.find((ticket) => ticket.id === id)
  if (ticket) {
    ticket.status = "closed"
    res.writeHead(200, { "Content-Type": "application/json" })
    res.end(JSON.stringify(ticket))
  } else {
    res.writeHead(404, { "Content-Type": "application/json" })
    res.end(JSON.stringify({ message: "Ticket não encontrado" }))
  }
}

const deleteTicket = (req, res) => {
  const id = req.url.split("/")[2]
  const ticketIndex = tickets.findIndex((ticket) => ticket.id === id)
  if (ticketIndex !== -1) {
    tickets.splice(ticketIndex, 1)
    res.writeHead(204, { "Content-Type": "application/json" })
    res.end()
  } else {
    res.writeHead(404, { "Content-Type": "application/json" })
    res.end(JSON.stringify({ message: "Ticket não encontrado" }))
  }
}

export { createTicket, getTickets, updateTicket, closeTicket, deleteTicket }
