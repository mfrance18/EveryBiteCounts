import React from "react";
import { MealTypeCard } from "./MealTypeCard";
import "./FoodEntry.css"

export const MealTypeList = ({ foods, foodDate, mealTypes, render, handleDeleteFood }) => {
    const calories = foods.map(f => f.calories)

    //acc = accumulator, elm = element
    //add the accumulator to the element 
    const calorieCount = calories.reduce((acc, elm) => acc + elm)
    console.log(calorieCount, "calorieCount")

    return (
        <>
            <section className="mealList">
                {mealTypes.map(meal => <MealTypeCard meal={meal} foodDate={foodDate} key={meal.id} foods={foods} render={render} handleDeleteFood={handleDeleteFood} />)}
                <div>
                    <h4>Total Calories for the day: {calorieCount}</h4>
                </div>
            </section>

        </>
    )


}