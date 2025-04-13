import express from "express"

export const router = express.Router()

router.use((req, res, next) => {
	const err = Error("Not Found")
	err.status = 404
	next(err)
})

router.use((err, req, res, next) => {
	const status = err.status || 500
	res.status(status).json({message: err.message})
})
