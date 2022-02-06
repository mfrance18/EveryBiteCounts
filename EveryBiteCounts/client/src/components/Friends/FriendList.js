import React from "react";
import { deleteFriend } from "../../modules/friendManager";
import { FriendCard } from "./FriendCard";
import "./Friends.css"


export const FriendsList = ({ friends, render }) => {

    const handleDeleteFriend = (id) => {
        deleteFriend(id)
            .then(render)
    }

    return (
        <>
            <h2>Friends List</h2>
            <hr></hr>
            {friends.map(friend => <FriendCard render={render} handleDeleteFriend={handleDeleteFriend} friend={friend} key={friend.id} />)}

        </>
    )

}