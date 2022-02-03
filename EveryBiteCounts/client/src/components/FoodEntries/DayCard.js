import React from "react";
import { MealTypeList } from "./MealTypeList";
import { Modal, ModalHeader, ModalBody, Button } from "reactstrap";
import { FoodEntryForm } from "./FoodEntryForm";
import "./FoodEntry.css"


export const DayCard = ({ foods, foodDate, modal, toggle, render, mealTypes, handleDeleteFood }) => {

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
                    <FoodEntryForm toggle={toggle} render={render} />
                </ModalBody>
            </Modal>


        </>
    )

}