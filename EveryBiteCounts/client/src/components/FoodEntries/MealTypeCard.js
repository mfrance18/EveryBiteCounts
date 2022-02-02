import React from "react";
import { FoodList } from "./FoodList";
import "./FoodEntry.css"

export const MealTypeCard = ({ meal, foods, foodDate, render, handleDeleteFood }) => {

    return (
        <>
            <div className="mealCard">
                <h3>{meal.name}</h3>
                <hr></hr>
                <FoodList mealTypeId={meal.id} meal={meal} foodDate={foodDate} foods={foods} render={render} handleDeleteFood={handleDeleteFood} />
            </div>
        </>
    )
}