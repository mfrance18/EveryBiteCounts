import React, { useState } from "react";
import { MealTypeList } from "./MealTypeList";
import { Modal, ModalHeader, ModalBody, Button } from "reactstrap";
import "./FoodEntry.css"
import { FoodByDay } from "./FoodByDay";


export const DayCard = ({ foods, foodDate, render, mealTypes, handleDeleteFood }) => {

    const [modal, setModal] = useState(false)

    const toggle = () => {
        setModal(!modal)
    }


    return (
        <>


            <section className="dateCard">
                <div className="newDateButton">
                    <h1>Foods entered on {foodDate}</h1>
                    <Button className="addButton" onClick={toggle}>Add Food</Button>
                </div>
                <MealTypeList foods={foods} foodDate={foodDate} mealTypes={mealTypes} render={render} handleDeleteFood={handleDeleteFood} />
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