import React from "react";


export const FriendDetails = ({ friend }) => {

    return (
        <>
            <ul>
                <li> Current Weight: {friend.currentWeight}</li>
                <li> Daily Caloric Goal: {friend.dailyCaloricGoal}</li>
            </ul>
        </>
    )

}