import React, { useEffect } from "react";
import { Button } from "reactstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { addFriend } from "../../modules/friendManager";
import "./Friends.css"


export const UserCard = ({ user, render }) => {


    console.log(user.id, "userid")


    const friendObj = {
        "followingUserProfileId": user.id
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
                    {user.fullName}
                </div>
                <div>
                    <Button className="addFriend" size="sm" type="button" onClick={handleClickSaveFriend}>Add Friend</Button>
                </div>
            </section>
        </>
    )
}