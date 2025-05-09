import {getAllDishes, getOneDishes,getOneDishesById ,insertNewDishe, updateDish, removeDish} from "./model.js"

async function getDishes(req, res, next){
	await getAllDishes()
		.then(data => res.json(data))
		.catch(err =>{ next(Error("db error"))})
}

function getDish(req, res, next){
	const name = req.params.name
	getOneDishes(name)
		.then(data => res.json(data))
		.catch(err => {err.status = 404; next(err)})
}

function getDishById(req, res, next){
	const id = req.params.id
	getOneDishesById(id)
		.then(data => res.json(data))
		.catch(err => {err.status = 404; next(err)})
}

function newDish(req, res, next){
	const dish = req.body
	insertNewDishe(dish)
		.then(data => res.status(201).json(data))
		.catch(err => {err.status = 409; next(err)})
}

function patchDish(req, res, next){
	const id = req.params.id
	const update = req.body
	updateDish(id, update)
		.then(data => res.json(data))
		.catch(err => {err.status = 404; next(err)})
}

function deleteDish(req, res, next){
	const id = req.params.id
	removeDish(id)
		.then(data => res.json(data))
		.catch(err => {err.status = 404; next(err)})
}

export {getDishes, getDish, newDish, patchDish, deleteDish, getDishById}
