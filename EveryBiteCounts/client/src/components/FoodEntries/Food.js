import React, { useState } from "react";
import { Modal, ModalBody, Button } from "reactstrap";
import { FoodEditForm } from "./FoodEditForm";
import { formatDate } from "../Date";
import "./FoodEntry.css"

export const Food = ({ food, foodDate, handleDeleteFood, render, }) => {

    const [selectedFood, setSelectedFood] = useState({ food: {} })

    const [editModal, setEditModal] = useState(false);
    const toggleEdit = () => setEditModal(!editModal);


    if (formatDate(food.createDateTime) == foodDate) {
        return (
            <>
                <section className="foodCardContainer">
                    <div className="foodCard">

                        <div>
                            {food.name}
                        </div>

                        <div className="foodButtons">
                            <div className="foodCalories">
                                Calories: {food.calories}
                            </div>
                            <Button className="foodEdit" variant="secondary" size="sm" type="button"
                                onClick={() => { setSelectedFood({ food }); toggleEdit() }}>Edit</Button>
                            <Button className="foodDelete" variant="secondary" size="sm" type="button" onClick={() => handleDeleteFood(food.id)}>Delete</Button>
                        </div>
                    </div>
                </section>
                <Modal isOpen={editModal} toggle={toggleEdit}>

                    <ModalBody>
                        <FoodEditForm render={render} food={food} key={food.id} toggleEdit={toggleEdit}  {...selectedFood} />
                    </ModalBody>
                </Modal>
            </>
        )
    }
    else {
        return null
    }


}