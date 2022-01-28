import React, { useState, useEffect } from "react";
import { Food } from "./Food";
import { deleteFood, getFoodByUserId } from "../../modules/foodEntryManager";
import { Modal, ModalHeader, ModalBody, Button } from "reactstrap";
import { FoodEntryForm } from "./FoodEntryForm";

export const FoodList = ({ mealTypeId }) => {
    const [foods, setFoods] = useState([])

    const [modal, setModal] = useState(false);

    const toggle = () => {
        setModal(!modal)
    };

    const getFoods = () => {
        getFoodByUserId().then((resp) => setFoods(resp))
    }

    const render = () => {
        getFoods()
    }

    const handleDeleteFood = (id) => {
        deleteFood(id)
            .then(() => getFoods())
    }

    useEffect(() => {
        getFoods()
    }, [])

    let meal = mealTypeId
    console.log(meal)
    return (
        <>
            <div>
                <Button className="addButton" onClick={toggle}>Add Food</Button>
            </div>
            <div className="foodList">
                {foods.map(food => {
                    if (food.mealTypeId == meal) {
                        return <Food key={food.id} food={food} handleDeleteFood={handleDeleteFood} render={render} />
                    }
                })}
            </div>

            <Modal isOpen={modal} toggle={toggle} className="dailyModal">
                <ModalHeader toggle={toggle}>Add New Food</ModalHeader>
                <ModalBody>
                    <FoodEntryForm meal={mealTypeId} toggle={toggle} render={render} />
                </ModalBody>
            </Modal>

        </>
    )
}
