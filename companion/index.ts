import express from "express"
import bodyParser from "body-parser"
import session from "express-session"
import * as companion from "@uppy/companion"

const PORT = 3020

const app = express()

// Companion requires body-parser and express-session middleware.
// You can add it like this if you use those throughout your app.
//
// If you are using something else in your app, you can add these
// middlewares in the same subpath as Companion instead.
app.use(bodyParser.json())
app.use(session({ secret: "some secrety secret" }))

const companionOptions = {
  providerOptions: {
    dropbox: {
      key: "Dropbox API key",
      secret: "Dropbox API secret",
    },
    drive: {
      key: "r2vv9n77av32du5",
      secret: "fpkfmlbsc9wi0qk",
    },
  },
  server: {
    host: "localhost:8000",
    protocol: "http",
    path: "/storage/v1/upload/resumable",
  },
  filePath: "./files",
  secret: "asdawoijndoi",
}

const { app: companionApp } = companion.app(companionOptions)
app.use(companionApp)

const server = app.listen(PORT)

companion.socket(server)
