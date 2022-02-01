import React from "react";
import { FoodList } from "./FoodList";

export const MealTypeCard = ({ meal, foods, foodDate, render, handleDeleteFood }) => {

    return (
        <>
            <div>
                <h3>{meal.name}</h3>
                <FoodList mealTypeId={meal.id} meal={meal} foodDate={foodDate} foods={foods} render={render} handleDeleteFood={handleDeleteFood} />
            </div>
        </>
    )
}