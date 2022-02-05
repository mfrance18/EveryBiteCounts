import React, { useState } from "react";
import { MealTypeList } from "./MealTypeList";
import { Modal, ModalHeader, ModalBody, Button } from "reactstrap";
import "./FoodEntry.css"
import { FoodByDay } from "./FoodByDay";


export const DayCard = ({ foods, foodDate, render, mealTypes, handleDeleteFood, dataBaseDate }) => {

    const [modal, setModal] = useState(false)

    const toggle = () => {
        setModal(!modal)
    }


    const calories = foods.map(f => f.calories)
    const caloricGoal = foods[0].userProfile.dailyCaloricGoal



    //acc = accumulator, elm = element
    //add the accumulator to the element 
    const calorieCount = calories.reduce((acc, elm) => acc + elm)


    return (
        <>


            <section className="dateCard">
                <div className="newDateButton">
                    <h1>Foods entered on {foodDate}</h1>
                    <h3>Your daily Caloric Goal is {caloricGoal} calories</h3>
                    <h5>You currently have {caloricGoal - calorieCount} calories left</h5>
                </div>
                <div>
                    <Button className="addButton" onClick={toggle}>Add Food</Button>
                </div>
                <MealTypeList foods={foods} foodDate={foodDate} mealTypes={mealTypes} render={render} handleDeleteFood={handleDeleteFood} />
                <div>
                    <h4>Total Calories for the day: {calorieCount}</h4>
                </div>
                {calorieCount > caloricGoal ? <h5>You went over your caloric goal for the day, but that's ok. You can do this!</h5> : null}
            </section>

            <Modal isOpen={modal} toggle={toggle} className="dailyModal">
                <ModalHeader toggle={toggle}>Add New Food</ModalHeader>
                <ModalBody>
                    <FoodByDay toggle={toggle} render={render} dataBaseDate={dataBaseDate} />
                </ModalBody>
            </Modal>


        </>
    )

}