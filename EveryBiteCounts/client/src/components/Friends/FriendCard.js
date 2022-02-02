import React from "react";
import { Button } from "reactstrap";
import "./Friends.css"


export const FriendCard = ({ friend }) => {


    console.log()
    return (
        <>
            <section className="userCard">
                <div>
                    {friend.fullName}
                </div>
                <div>
                    <Button className="friendDetails" variant="secondary" size="sm" type="button">View Details</Button>
                </div>
                <div>
                    <Button className="deleteFriend" variant="secondary" size="sm" type="button">Delete Friend</Button>
                </div>
            </section>
        </>
    )
}