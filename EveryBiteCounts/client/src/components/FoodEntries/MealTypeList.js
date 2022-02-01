import React from "react";
import { MealTypeCard } from "./MealTypeCard";

export const MealTypeList = ({ foods, foodDate, mealTypes, render, handleDeleteFood }) => {

    return (
        <>

            <div>
                {mealTypes.map(meal => <MealTypeCard meal={meal} foodDate={foodDate} key={meal.id} foods={foods} render={render} handleDeleteFood={handleDeleteFood} />)}
            </div>
        </>
    )


}