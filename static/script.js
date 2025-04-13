
const Dishes = {}

window.addEventListener("load", attachListener)

function attachListener(){
	document.getElementById("dish_form").addEventListener("submit", handleFormSubmit)
}

async function handleFormSubmit(event){
	event.preventDefault()
	const button = document.getElementById("subBt")
	const formData = new FormData(event.target, button)


	const newDish = {}
	for( const[key, value] of formData){
		newDish[key] = value
	}

	console.log(newDish.ingredients)

	newDish.ingredients = newDish.ingredients.split(/\s*,\s*/)
	newDish.preparationSteps = newDish.preparationSteps.split("\n")

	const res = await addNewDish(newDish)

	if (res.status === 201){
		const data = await res.json()
		const row = document.getElementById("dish_temp")
		.content.cloneNode(true)

		const rowContainer = document.getElementById("tBody")

		populateRow(data, row)

		Dishes[data._id] = data

		rowContainer.append(row)

		event.target.reset()

	}else if(res.status === 409){
		alert("Name already taken")
	}
}

async function fetchDishes(){
	const rawData = await fetch("/api/dishes")
	const data = await rawData.json()
	populateRows(data)
}

function populateRows(data){
	const rowTemp = document.getElementById("dish_temp")
		.content
	const rowContainer = document.getElementById("tBody")

	data.forEach(element => {
		console.log(element)
		const row = populateRow(element, rowTemp.cloneNode(true))
		Dishes[element._id] = element
		rowContainer.append(row)
	})
}

function populateRow(element, node){

	node.querySelector("tr").setAttribute("id", element._id)

	populateRowData(element, node)

	node.querySelector(".editBt").addEventListener("click", handleEdit)
	node.querySelector(".deleteBt").addEventListener("click", handleDelete)

	return node
}

function populateRowData(element, node){
	console.log(element)
	node.querySelector(".name").textContent = element.name
	node.querySelector(".time").textContent = element.cookingTime
	node.querySelector(".origin").textContent = element.originContry
	node.querySelector(".ingredients").textContent = element.ingredients.join(", ")
	node.querySelector(".steps").textContent = element.preparationSteps.join("\n")
	node.querySelector(".rating").textContent = element.rating
}


async function handleDelete(event){

	if (window.confirm("This will permemtly delete thie dish\n Press ok to confirm")){
		const row = event.target.parentElement.parentElement
		const id = row.id

		res = await deleteRow(id)

		if(res.status === 200){
			row.remove()
			delete Dishes[id]
		}
	}

}

function handleEdit(event){

	const row = event.target.parentElement.parentElement
	const dish = Dishes[row.id]

	const row_edit = document.getElementById("row_edit")

	if (row_edit) cancelEdit(row_edit)

	const node = creatForm(dish)

	row.setAttribute("hidden", "true")
	row.after(node)
}

function creatForm(row){
	const node = document.getElementById("edit_temp").content.cloneNode(true)
	console.log(row)
	node.querySelector("tr").setAttribute("row_id", row._id)
	node.querySelector("tr").setAttribute("id", "row_edit")
	node.querySelector(".name input").value = row.name
	node.querySelector(".time input").value = row.cookingTime
	node.querySelector(".origin input").value = row.originContry
	node.querySelector(".ingredients input").value = row.ingredients.join(", ")
	node.querySelector(".steps textarea").value = row.preparationSteps.join("\n")
	node.querySelector(".rating input").value = row.rating

	node.querySelector(".cancelBt").addEventListener("click", handleCancel)
	node.querySelector(".updateBt").addEventListener("click", handleUpdate)

	return node
}

function handleCancel(event){
	const row_edit = event.target.parentElement.parentElement
	cancelEdit(row_edit)
}

function cancelEdit(row_edit){
	const row_id = row_edit.getAttribute("row_id")
	const row = document.getElementById(row_id)
	row.removeAttribute("hidden")
	row_edit.querySelector(".cancelBt").removeEventListener("click", handleCancel)
	row_edit.querySelector(".updateBt").removeEventListener("click", handleUpdate)
	row_edit.remove()

}

async function handleUpdate(event){
	const row_edit = event.target.parentElement.parentElement
	const id = row_edit.getAttribute("row_id")
	const update = creatUpdate(row_edit)
	console.log(update)

	const res = await updateRow(id, update)


	if (res.status === 404){
		handleCancel(event)
	}else{
		const data = await res.json()
		const row = document.getElementById(id)
		populateRowData(data, row)
		Dishes[id] = data
		handleCancel(event)
	}
}

function creatUpdate(row_edit){
	const update = {}
	update.name = row_edit.querySelector(".name input").value
	update.cookingTime = row_edit.querySelector(".time input").value
	update.originContry = row_edit.querySelector(".origin input").value
	update.ingredients = row_edit.querySelector(".ingredients input").value.split(/\s*,\s*/)
	update.preparationSteps = row_edit.querySelector(".steps textarea").value.split("\n")
	update.rating = row_edit.querySelector(".rating input").value
	return update
}

async function addNewDish(dish){
	const data = await fetch(`/api/dishes`,
		{method: "POST",
    		headers: {
      			'Accept': 'application/json',
      			'Content-Type': 'application/json'
    			},
		body: JSON.stringify(dish) })
	return data
}

async function deleteRow(id){
	const res = await fetch(`/api/dishes/${id}`, {method: "DELETE"})
	return res
}

async function updateRow(id, update){
	const data = await fetch(`/api/dishes/${id}`,
		{method: "PUT",
    		headers: {
      			'Accept': 'application/json',
      			'Content-Type': 'application/json'
    			},
		body: JSON.stringify(update) })
	return data
}

fetchDishes()
