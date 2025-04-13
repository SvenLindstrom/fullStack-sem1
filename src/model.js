import { DishModal } from "./db.js"

async function getAllDishes(){
	const res = await DishModal.find().exec()
		.catch(err => {throw err} )
	return res
}

async function getOneDishes(name){
	const res = await DishModal.findOne({name:name}).exec()
	if (!res) throw new Error("Not Found")
	return res
}

async function insertNewDishe(newDish){
 	const dish = new DishModal(newDish)
	const res = await dish.save()
		.catch(err => {throw new Error("douplicate dish name")} )
	return res
}

async function updateDish(id, update){
	const dish = await DishModal.findOneAndUpdate({_id: id}, update, { new: true })
		.exec()
		.catch(err => {throw new Error("Not Found")} )
	if(!dish) throw new Error("Not Found")
	return dish
}

async function removeDish(id){
	const res = await DishModal.deleteOne({_id: id}).exec()
	if (!res.deletedCount) throw new Error("Not Found")
	return res
}

export {getAllDishes, getOneDishes, insertNewDishe, updateDish, removeDish}
