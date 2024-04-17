import dotenv from "dotenv"
import express from "express"

dotenv.config()

import serverAdapter from "./queue/adapter"
import "./listeners"

const PORT = process.env.PORT!

const app = express()

app.use("/queues", serverAdapter.getRouter())

app.listen(PORT, () => {
  console.log(`Running on ${PORT}...`)
  console.log(`For the UI, open http://localhost:${PORT}/queues`)
  console.log("Make sure Redis is running on port 6379 by default")
})
