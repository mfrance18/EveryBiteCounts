import React, { useReducer } from "react";
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
            <section className="potentialFriendCard">
                <div className="userImage">
                    <img className="userPic" src={potentialFriend.imageLocation} alt="User" />
                </div>
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