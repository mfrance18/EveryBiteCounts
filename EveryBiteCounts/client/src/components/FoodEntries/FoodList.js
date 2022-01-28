import React, { useState, useEffect } from "react";
import { Food } from "./Food";
import { getFoodByUserId } from "../../modules/foodEntryManager";

export const FoodList = ({ mealTypeId }) => {
    const [foods, setFoods] = useState([])

    const getFoods = () => {
        getFoodByUserId().then((resp) => setFoods(resp))
    }

    useEffect(() => {
        getFoods()
    }, [])

    let meal = mealTypeId
    console.log(meal)
    return (
        <>
            <div className="foodList">

                {foods.map(food => {
                    if (food.mealTypeId == meal) {
                        return <Food key={food.id} food={food} />
                    }
                })}

            </div>
        </>
    )
}
