const http = require("http")

// Função para lidar com as requisições
const requestHandler = (req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" })
  res.end("Servidor rodando com Node.js puro!")
}

// Criar o servidor
const server = http.createServer(requestHandler)

// Definir a porta em que o servidor vai escutar
const PORT = 3000

// Iniciar o servidor
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
