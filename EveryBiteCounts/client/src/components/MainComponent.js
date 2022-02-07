import React, { useState, useEffect } from "react";
import { getCurrentUser } from "../modules/userProfileManager";
import { getFoodByUserId } from "../modules/foodEntryManager";
import { getAllMealTypes } from "../modules/mealTypeManager";
import { DayList } from "./FoodEntries/DayList";
import { UserCard } from "./UserProfile/UserCard";
import MainLogo from "../images/EveryBiteCountsLogo.png"
import { deleteFood } from "../modules/foodEntryManager";
import { MyLists } from "./Friends/MyLists";

export const MainComponent = () => {
    const [foods, setFoods] = useState([])
    const [meals, setMeals] = useState([])
    const [user, setUser] = useState({})

    const getUser = () => {
        getCurrentUser()
            .then(res => setUser(res))
    }

    const getFoods = () => {
        getFoodByUserId().then(resp => setFoods(resp))
    }

    const render = () => {
        getFoods()
        getUser()
    }

    const getMealTypes = () => {
        return getAllMealTypes()
            .then(resp => {
                setMeals(resp)
            })
    }

    const handleDeleteFood = (id) => {
        deleteFood(id)
            .then(() => getFoods())
    }

    useEffect(() => {
        getFoods()
        getMealTypes()
        getUser()
    }, [])


    return (
        <>
            <section className="homePage">
                <div className="navImage">
                    <div className="userProfileCard">
                        <UserCard user={user} render={render} />
                    </div>
                    <img className="navLogo" src={MainLogo} alt="Every Bite Counts Logo" />

                    <div className="welcome">
                        <h3>Welcome to Every Bite Counts!</h3>
                        <h5>This app allows you to keep track of what you have eaten </h5>
                        <h5>throughout each day, and how many calories each food item is. </h5>
                    </div>
                </div>

                <div>
                    <DayList handleDeleteFood={handleDeleteFood} render={render} foods={foods} meals={meals} />
                </div>
                <div className="myLists">
                    <MyLists />
                </div>

            </section>
        </>
    )
}