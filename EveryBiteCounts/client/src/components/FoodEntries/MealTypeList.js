import React from "react";
import { MealTypeCard } from "./MealTypeCard";
import "./FoodEntry.css"

export const MealTypeList = ({ foods, foodDate, mealTypes, render, handleDeleteFood }) => {

    return (
        <>
            <section className="mealList">
                {mealTypes.map(meal => <MealTypeCard meal={meal} foodDate={foodDate} key={meal.id} foods={foods} render={render} handleDeleteFood={handleDeleteFood} />)}
            </section>

        </>
    )


}