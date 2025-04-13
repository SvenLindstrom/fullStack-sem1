import mongoose from "mongoose";
import "dotenv/config"

// get connection string from .env
const uri = process.env.DB_URI

// creat connection to db
mongoose.connect(uri)

// define structure of the collection
const dishSchema = new mongoose.Schema({
	name: {
		type: mongoose.SchemaTypes.String,
		// enforce name uniqueness
		unique: true,
	},
	cookingTime: mongoose.SchemaTypes.String,
	originContry: mongoose.SchemaTypes.String,
	ingredients: [mongoose.SchemaTypes.String],
	preparationSteps: [mongoose.SchemaTypes.String],
	rating: Number,
})

// creat collection from schema
const DishModal =  mongoose.model("dishModal", dishSchema)

export { DishModal }
