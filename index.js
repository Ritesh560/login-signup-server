const express = require("express")
const http = require("http")
const router = require("./router")
const cors = require("cors")

const arr = [{ name: "a", email: "b", password: "b" }]

const Port = process.env.PORT || 5000

const app = express()
app.use(express.json())
app.use(express.urlencoded())
const server = http.createServer(app)

app.use(router)
app.use(cors())

//Routes

app.post("/login", (req, res) => {
  const { email, password } = req.body

  const user = arr.find((user) => user.email === email && user.password === password)
  if (user) {
    {
      res.send({ message: "Successfully Login!!!", user })
    }
  } else {
    res.send({ message: "Invalid Credential" })
  }
})

app.post("/register", (req, res) => {
  const { name, email, password } = req.body

  if (arr.find((user) => user.email === email)) {
    res.send({ message: "User already exist" })
  } else {
    const user = { name, email, password }
    arr.push(user)
    res.send({ message: "Registered! Now Please Login..." })
  }
  console.log(arr)
})

server.listen(Port, console.log(`server has started on PORT: ${Port}`))
