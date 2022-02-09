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
    //first parameter is the current state(foods), setFoods is the method to update state
    //the first thing in the array is whatever we pass as an argument

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


    //useEffect tells React that your component needs to do something after render
    //React will remember the function you passed, and call it later after performing DOM updates
    //in this effect, we are performing data fetching
    //2 arguments: 1-anonymous function, 2-dependency array
    //dependency array is an array of dependencies that when changed, trigger the callback function(anonymous function)
    //if nothing passed into dependency array, it is only called once
    //dependency array can cause an infinite loop

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