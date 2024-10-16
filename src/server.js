import http from "node:http"
import ticketRoutes from "./routes/ticketRoutes.js"
import logger from "./middleware/logger.js"
import parseBody from "./middleware/parseBody.js"

const middlewares = [logger, parseBody]

const applyMiddlewares = (req, res, middlewares, index) => {
  if (index < middlewares.length) {
    middlewares[index](req, res, () =>
      applyMiddlewares(req, res, middlewares, index + 1)
    )
  } else {
    ticketRoutes(req, res)
  }
}

const server = http.createServer((req, res) => {
  applyMiddlewares(req, res, middlewares, 0)
})

const PORT = 3000
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
