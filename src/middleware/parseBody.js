const parseBody = (req, res, next) => {
  let body = ""
  req.on("data", (chunk) => {
    body += chunk.toString()
  })
  req.on("end", () => {
    if (body) {
      try {
        req.body = JSON.parse(body)
      } catch (error) {
        res.writeHead(400, { "Content-Type": "application/json" })
        return res.end(JSON.stringify({ message: "Invalid JSON" }))
      }
    } else {
      req.body = {}
    }
    next()
  })
}

export default parseBody
