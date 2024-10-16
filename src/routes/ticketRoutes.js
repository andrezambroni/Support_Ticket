import {
  createTicket,
  getTickets,
  updateTicket,
  closeTicket,
  deleteTicket,
} from "../controllers/ticketController.js"

const routes = [
  {
    method: "POST",
    path: "/tickets",
    controller: createTicket,
  },
  {
    method: "GET",
    path: "/tickets",
    controller: getTickets,
  },
  {
    method: "PUT",
    path: "/tickets/:id",
    controller: updateTicket,
  },
  {
    method: "PATCH",
    path: "/tickets/:id/close",
    controller: closeTicket,
  },
  {
    method: "DELETE",
    path: "/tickets/:id",
    controller: deleteTicket,
  },
]

const ticketRoutes = (req, res) => {
  const matchingRoute = routes.find((route) => {
    const regex = new RegExp(`^${route.path.replace(/:\w+/g, "\\w+")}$`)
    return req.method === route.method && regex.test(req.url)
  })

  if (matchingRoute) {
    matchingRoute.controller(req, res)
  } else {
    res.writeHead(404, { "Content-Type": "application/json" })
    res.end(JSON.stringify({ message: "Rota não encontrada" }))
  }
}

export default ticketRoutes
