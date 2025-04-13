import express from "express"
import "dotenv/config"
import {router as errorHandler } from "./error.js"
import { router as apiRouter } from "./router.js"

const app = express()

app.use(express.json())

app.use((req, res, next) => {
	console.log(req.url)
	next()
})

app.use(express.static("static"))

app.use(apiRouter)

app.use(errorHandler)

const port = process.env.PORT || 5000

const server = app.listen(port, ()=>{console.log(`listening on ${port}`)})
