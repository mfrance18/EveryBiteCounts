import React from "react";
import { Button } from "reactstrap";
import "./Friends.css"


export const FriendCard = ({ friend, handleDeleteFriend }) => {
    console.log(friend.followship.id, "friend")
    return (
        <>
            <section className="userCard">
                <div>
                    {friend.fullName}
                </div>
                <div>
                    <Button className="friendDetails" variant="secondary" size="sm" type="button">View Details</Button>
                    <Button className="deleteFriend" variant="secondary" size="sm" type="button" onClick={() => handleDeleteFriend(friend.followship.id)}>Delete Friend</Button>
                </div>
            </section>
        </>
    )
}