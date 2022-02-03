import React, { useState, useEffect } from "react";
import { getPotentialFriends, getUserFriends } from "../../modules/friendManager";
import { UserList } from "./UsersList";
import { FriendsList } from "./FriendList";
import "../../components/ApplicationViews.css"


export const BothLists = () => {
    const [users, setUsers] = useState([])
    const [friends, setFriends] = useState([])

    const getMyPotentialFriends = () => {
        getPotentialFriends()
            .then(res => setUsers(res))
    }

    const getMyFriends = () => {
        getUserFriends()
            .then(res => setFriends(res))
    }

    const render = () => {
        getMyFriends()
        getMyPotentialFriends()
    }

    useEffect(() => {
        getMyFriends()
        getMyPotentialFriends()
    }, [])

    return (
        <>
            <div className="userList">
                <UserList users={users} render={render} />
            </div>
            <div className="friendsList">
                <FriendsList friends={friends} render={render} />
            </div>
        </>
    )
}