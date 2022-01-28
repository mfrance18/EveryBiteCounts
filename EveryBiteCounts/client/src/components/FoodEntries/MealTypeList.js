import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getAllMealTypes } from "../../modules/mealTypeManager";
import { MealTypeCard } from "./MealTypeCard";

export const MealTypeList = () => {
    const [meals, setMeals] = useState([])

    const history = useHistory()

    const getMealTypes = () => {
        return getAllMealTypes()
            .then(resp => {
                setMeals(resp)
            })
    }

    useEffect(() => {
        getMealTypes()
    }, [])

    return (
        <>
            <section>
                {meals.map(meal => <MealTypeCard meal={meal} key={meal.id} />)}
            </section>
        </>
    )


}