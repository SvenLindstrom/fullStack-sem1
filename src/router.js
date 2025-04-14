import express from "express"
import {getDish,getDishById , getDishes, newDish, patchDish, deleteDish} from "./controler.js"

const router = express.Router()

router.get("/api/dishes", getDishes)

router.get("/api/dishes/:name", getDish)

router.post("/api/dishes", newDish)

router.put("/api/dishes/:id", patchDish)

router.get("/api/dishes/name/:id", getDishById)

router.delete("/api/dishes/:id", deleteDish)

export {router}
