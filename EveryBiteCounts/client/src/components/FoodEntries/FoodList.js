import React from "react";
import { Food } from "./Food";
import "./FoodEntry.css"

export const FoodList = ({ mealTypeId, foodDate, foods, render, handleDeleteFood }) => {

    let meal = mealTypeId


    return (
        <>


            <div className="foodList">
                {foods.map(food => {
                    if (food.mealTypeId == meal) {
                        return <Food calorieCount={calorieCount} foodDate={foodDate} key={food.id} food={food} handleDeleteFood={handleDeleteFood} render={render} />
                    }
                })}
            </div>
        </>
    )
}
