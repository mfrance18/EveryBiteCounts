import React, { useState, useEffect } from "react";
import { deleteFriend } from "../../modules/friendManager";
import { FriendCard } from "./FriendCard";
import "./Friends.css"


export const FriendsList = ({ friends, render }) => {
    // const [friends, setFriends] = useState([])

    // const getFriends = () => {
    //     getUserFriends()
    //         .then(res => setFriends(res))
    // }

    const handleDeleteFriend = (id) => {
        deleteFriend(id)
            .then(render)
    }

    // useEffect(() => {
    //     getFriends()
    // }, [])


    return (
        <>
            <h2>Friends List</h2>
            <hr></hr>
            {friends.map(friend => <FriendCard handleDeleteFriend={handleDeleteFriend} friend={friend} key={friend.id} />)}

        </>
    )

}