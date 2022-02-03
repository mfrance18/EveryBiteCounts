import React, { useState, useEffect } from "react";
import { deleteFriend, getUserFriends } from "../../modules/friendManager";
import { FriendCard } from "./FriendCard";
import "./Friends.css"


export const FriendsList = () => {
    const [friends, setFriends] = useState([])

    const getFriends = () => {
        getUserFriends()
            .then(res => setFriends(res))
    }

    const handleDeleteFriend = (id) => {
        deleteFriend(id)
            .then(() => getFriends())
    }

    useEffect(() => {
        getFriends()
    }, [])


    return (
        <>
            <h2>Friends List</h2>
            <hr></hr>
            {friends.map(friend => <FriendCard handleDeleteFriend={handleDeleteFriend} friend={friend} key={friend.id} />)}

        </>
    )

}