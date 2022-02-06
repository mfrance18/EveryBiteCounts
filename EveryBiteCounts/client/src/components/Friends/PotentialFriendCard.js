import React from "react";
import { Button } from "reactstrap";
import { addFriend } from "../../modules/friendManager";
import "./Friends.css"


export const PotentialFriendCard = ({ potentialFriend, render }) => {

    const friendObj = {
        "followingUserProfileId": potentialFriend.id
    }

    const handleClickSaveFriend = (event) => {
        event.preventDefault()
        addFriend(friendObj)
            .then(render)
    }

    return (
        <>
            <section className="userCard">
                <div>
                    {potentialFriend.fullName}
                </div>
                <div>
                    <Button className="addFriend" size="sm" type="button" onClick={handleClickSaveFriend}>Add Friend</Button>
                </div>
            </section>
        </>
    )
}