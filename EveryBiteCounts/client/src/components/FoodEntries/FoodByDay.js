import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { addFood } from "../../modules/foodEntryManager";
import "./FoodEntry.css"


export const FoodByDay = ({ toggle, render, foodDate }) => {

    const [foods, setFoods] = useState({
        name: "",
        calories: "",
        createDateTime: foodDate,
        mealTypeId: 0
    })

    const handleControlledInputChange = (event) => {
        const newFood = { ...foods }
        let selectedVal = event.target.value

        if (event.target.value.includes("Id")) {
            selectedVal = parseInt(selectedVal)
        }

        newFood[event.target.id] = selectedVal
        setFoods(newFood)
    }

    const handleClickSaveFood = (event) => {
        event.preventDefault()
        addFood(foods)
            .then(toggle)
            .then(render)
    }

    return (
        <>
            <div>
                <Form>
                    <FormGroup>
                        <Label htmlFor="name">Food Name:</Label>
                        <Input className="form-control" type="text" id="name" onChange={handleControlledInputChange} value={foods.name} />
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="name">How Many Calories?:</Label>
                        <Input className="form-control" type="text" id="calories" onChange={handleControlledInputChange} value={foods.calories} />
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="mealTypeId">Meal Type:</Label>
                        <select className="form-control" id="mealTypeId" onChange={handleControlledInputChange} value={foods.mealTypeId}>
                            <option value="0">Select</option>
                            <option value="1">Breakfast</option>
                            <option value="2">Lunch</option>
                            <option value="3">Dinner</option>
                            <option value="4">Snack</option>
                        </select>
                    </FormGroup>
                </Form>
            </div>

            <div >
                <Button className="foodSave"
                    variant="secondary" size="sm"
                    onClick={handleClickSaveFood}>
                    Save Food
                </Button>
            </div>
        </>
    )
}