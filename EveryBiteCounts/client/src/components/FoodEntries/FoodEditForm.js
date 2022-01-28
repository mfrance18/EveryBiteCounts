import React, { useState, useEffect } from "react";
import { getFoodById, updateFood } from "../../modules/foodEntryManager";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

export const FoodEditForm = ({ toggleEdit, food, render }) => {
    const [foods, setFoods] = useState(food)

    const [isLoading, setIsLoading] = useState(false)

    const foodEntryId = food.id

    const handleFieldChange = event => {
        const stateToChange = { ...foods }
        stateToChange[event.target.id] = event.target.value
        setFoods(stateToChange)
    }

    const updateExistingFood = event => {
        event.preventDefault()
        setIsLoading(true)

        const editedFood = {
            id: foodEntryId,
            name: foods.name,
            calories: foods.calories
        }

        updateFood(editedFood)
            .then(toggleEdit)
            .then(render)
    }

    useEffect(() => {
        getFoodById(foodEntryId)
            .then(res => {
                setFoods(res)
                setIsLoading(false)
            })
    }, [])

    return (
        <>
            <div>
                <Form>
                    <h1>Edit Food</h1>
                    <FormGroup>
                        <Label htmlFor="name">Food Name:</Label>
                        <Input className="form-control" type="text" id="name" onChange={handleFieldChange} value={foods.name} />
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="name">How Many Calories?:</Label>
                        <Input className="form-control" type="text" id="calories" onChange={handleFieldChange} value={foods.calories} />
                    </FormGroup>
                </Form>
            </div>

            <div >
                <Button className="foodSave"
                    variant="secondary" size="sm"
                    disabled={isLoading}
                    onClick={updateExistingFood}>
                    Update Food
                </Button>
            </div>
        </>
    )


}