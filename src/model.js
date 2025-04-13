import { DishModal } from "./db.js"

// get all dishes with empty filter
async function getAllDishes(){
	const res = await DishModal.find().exec()
		.catch(err => {throw err} )
	return res
}

// get dish using name filter
// check if empty and throw error
async function getOneDishes(name){
	const res = await DishModal.findOne({name:name}).exec()
	if (!res) throw new Error("Not Found")
	return res
}

// insert new dish
// catch error if duplicate and propegate up
async function insertNewDishe(newDish){
 	const dish = new DishModal(newDish)
	const res = await dish.save()
		.catch(err => {throw new Error("douplicate dish name")} )
	return res
}

// find document by id and update
// return the updated document
// check for null and throw error
async function updateDish(id, update){
	const dish = await DishModal.findOneAndUpdate({_id: id}, update, { new: true })
		.exec()
		.catch(err => {throw new Error("Not Found")} )
	if(!dish) throw new Error("Not Found")
	return dish
}

// delete dish by id
// throw error if id does not exist
async function removeDish(id){
	const res = await DishModal.deleteOne({_id: id}).exec()
	if (!res.deletedCount) throw new Error("Not Found")
	return res
}

export {getAllDishes, getOneDishes, insertNewDishe, updateDish, removeDish}
