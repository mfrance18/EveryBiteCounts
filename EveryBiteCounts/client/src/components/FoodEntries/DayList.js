import React, { useState } from "react";
import { FoodEntryForm } from "./FoodEntryForm";
import { Modal, ModalHeader, ModalBody, Button } from "reactstrap";
import { formatDate } from "../Date";
import { DayCard } from "./DayCard";
import "./FoodEntry.css"
import { Carousel } from "react-bootstrap";



export const DayList = ({ meals, foods, render, handleDeleteFood }) => {

    const [modal, setModal] = useState(false);

    const toggle = () => {
        setModal(!modal)
    };



    const dates = []

    let dayId = 1
    let pointer = 0

    for (let i = 0; i < foods.length; i++) {

        let foodDate = formatDate(foods[i].createDateTime)
        let dataBaseDateFormat = foods[i].createDateTime.slice(0, 10)

        if (dates[pointer] == undefined) {
            let newDateObj = {
                "id": dayId,
                "date": foodDate,
                "dataBaseDateFormat": dataBaseDateFormat,
                "foods": [foods[i]]
            }
            dates.push(newDateObj)
            dayId++
        } else if (dates[pointer].date > foodDate || dates[pointer].date < foodDate) {
            pointer++
            let newDateObj = {
                "id": dayId,
                "date": foodDate,
                "dataBaseDateFormat": dataBaseDateFormat,
                "foods": [foods[i]]
            }
            dates.push(newDateObj)
            dayId++
        } else {
            dates[pointer].foods.push(foods[i])
        }
    }

    console.log(dates[1])

    return (
        <>

            <section className="dateList">
                <div>
                    <Button className="addDayButton" onClick={toggle}>Create A New Day</Button>
                </div>

                <div>
                    <Carousel interval={null} variant="dark" wrap={false} slide>
                        {dates.map(d =>

                            <Carousel.Item >
                                <DayCard key={d.id} toggle={toggle} modal={modal} render={render} mealTypes={meals} dataBaseDate={d.dataBaseDateFormat} foodDate={d.date} foods={d.foods} render={render} handleDeleteFood={handleDeleteFood} />
                            </Carousel.Item>

                        )}
                    </Carousel>
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