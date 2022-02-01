import React, { useState, useEffect } from "react";
import { MealTypeList } from "./MealTypeList";
import { Modal, ModalHeader, ModalBody, Button } from "reactstrap";
import { FoodEntryForm } from "./FoodEntryForm";


export const DayCard = ({ foods, foodDate, modal, toggle, render, mealTypes, handleDeleteFood }) => {
    console.log(foods)
    console.log(foodDate)


    return (
        <>


            <section>
                <div>
                    <h1>Date of Entry: {foodDate}</h1>
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