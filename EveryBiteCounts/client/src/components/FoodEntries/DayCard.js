import React, { useState } from "react";
import { MealTypeList } from "./MealTypeList";
import { Modal, ModalHeader, ModalBody, Button } from "reactstrap";
import "./FoodEntry.css"
import { FoodByDay } from "./FoodByDay";


export const DayCard = ({ foods, foodDate, render, mealTypes, handleDeleteFood, dateId }) => {

    const [modal, setModal] = useState(false)

    const toggle = () => {
        setModal(!modal)
    }

    const calories = foods.map(f => f.calories)
    const createdDate = foods.map(f => f.createDateTime)

    console.log(createdDate)

    //acc = accumulator, elm = element
    //add the accumulator to the element 
    const calorieCount = calories.reduce((acc, elm) => acc + elm)




    return (
        <>


            <section className="dateCard">
                <div className="newDateButton">
                    <h1>Foods entered on {foodDate}</h1>
                    <Button className="addButton" onClick={toggle}>Add Food</Button>
                </div>
                <MealTypeList foods={foods} foodDate={foodDate} mealTypes={mealTypes} render={render} handleDeleteFood={handleDeleteFood} />
                <div>
                    <h4>Total Calories for the day: {calorieCount}</h4>
                </div>
            </section>

            <Modal isOpen={modal} toggle={toggle} className="dailyModal">
                <ModalHeader toggle={toggle}>Add New Food</ModalHeader>
                <ModalBody>
                    <FoodByDay toggle={toggle} render={render} foodDate={foodDate} />
                </ModalBody>
            </Modal>


        </>
    )

}