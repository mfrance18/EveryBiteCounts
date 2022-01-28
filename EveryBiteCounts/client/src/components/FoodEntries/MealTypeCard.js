import React from "react";
import { FoodList } from "./FoodList";

export const MealTypeCard = ({ meal }) => {

    return (
        <>
            <div>
                <h3>{meal.name}</h3>
                <FoodList mealTypeId={meal.id} meal={meal} />
            </div>
        </>
    )
}