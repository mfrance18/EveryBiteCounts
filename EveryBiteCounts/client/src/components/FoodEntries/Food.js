import React, { useState } from "react";
import { Modal, ModalBody, Button } from "reactstrap";
import { FoodEditForm } from "./FoodEditForm";
import "./Food.css"

export const Food = ({ food, foodDate, handleDeleteFood, render }) => {

    const [selectedFood, setSelectedFood] = useState({ food: {} })

    const [editModal, setEditModal] = useState(false);
    const toggleEdit = () => setEditModal(!editModal);

    if (food.createDateTime.slice(0, 10) == foodDate) {
        return (
            <>
                <div className="foodItem">
                    <p>{food.name}</p>
                    <p>{food.calories}</p>
                    <Button className="foodEdit" variant="secondary" size="sm" type="button"
                        onClick={() => { setSelectedFood({ food }); toggleEdit() }}>Edit</Button>
                    <Button className="foodDelete" variant="secondary" size="sm" type="button" onClick={() => handleDeleteFood(food.id)}>Delete</Button>
                </div>

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