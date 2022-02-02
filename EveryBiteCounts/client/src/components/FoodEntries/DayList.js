import React, { useState, useEffect } from "react";
import { getFoodByUserId } from "../../modules/foodEntryManager";
import { getAllMealTypes } from "../../modules/mealTypeManager";
import { deleteFood } from "../../modules/foodEntryManager";
import { FoodEntryForm } from "./FoodEntryForm";
import { Modal, ModalHeader, ModalBody, Button } from "reactstrap";
import { DayCard } from "./DayCard";
import "./FoodEntry.css"


export const DayList = () => {
    const [foods, setFoods] = useState([])
    const [meals, setMeals] = useState([])
    const [modal, setModal] = useState(false);

    const getFoods = () => {
        getFoodByUserId().then(resp => setFoods(resp))
    }

    const toggle = () => {
        setModal(!modal)
    };

    const render = () => {
        getFoods()
    }

    const handleDeleteFood = (id) => {
        deleteFood(id)
            .then(() => getFoods())
    }

    const getMealTypes = () => {
        return getAllMealTypes()
            .then(resp => {
                setMeals(resp)
            })
    }

    useEffect(() => {
        getFoods()
        getMealTypes()
    }, [])

    const dates = []

    let dayId = 1
    let pointer = 0




    for (let i = 0; i < foods.length; i++) {

        let foodDate = foods[i].createDateTime.slice(0, 10)

        if (dates[pointer] == undefined) {
            let newDateObj = {
                "id": dayId,
                "date": foodDate
            }
            dates.push(newDateObj)
            dayId++
        } else if (dates[pointer].date < foodDate) {
            pointer++
            let newDateObj = {
                "id": dayId,
                "date": foodDate
            }
            dates.push(newDateObj)
            dayId++
        }

    }




    return (
        <>

            <section className="dateList">
                <div>
                    <Button className="addDayButton" onClick={toggle}>Create A New Day</Button>
                </div>

                <div>
                    {dates.map(d => <DayCard key={d.id} toggle={toggle} modal={modal} render={render} mealTypes={meals} foodDate={d.date} foods={foods} render={render} handleDeleteFood={handleDeleteFood} />)}
                </div>
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