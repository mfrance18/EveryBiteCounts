import React from "react";
import { Button } from "reactstrap";
import "./Food.css"

export const Food = ({ food }) => {

    return (
        <>
            <div className="foodItem">
                <p>{food.name}</p>
                <p>{food.calories}</p>
                <Button variant="secondary" size="sm">Edit</Button>
                <Button variant="secondary" size="sm">Delete</Button>
            </div>
        </>
    )

}