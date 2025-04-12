import mongoose from "mongoose";
import "dotenv/config"

const uri = process.env.DB_URI


mongoose.connect(uri)

const dishSchema = new mongoose.Schema({
	name: {
		type: mongoose.SchemaTypes.String,
		unique: true,
	},
	cookingTime: mongoose.SchemaTypes.String,
	originContry: mongoose.SchemaTypes.String,
	ingredients: [mongoose.SchemaTypes.String],
	preparationSteps: [mongoose.SchemaTypes.String],
})


const DishModal =  mongoose.model("dishModal", dishSchema)


export { DishModal }
