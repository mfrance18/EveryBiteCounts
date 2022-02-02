import React, { useState, useEffect } from "react";
import { getAllUsers } from "../../modules/friendManager";
import { UserCard } from "./UserCard";
import "./Friends.css"


export const UserList = () => {
    const [users, setUsers] = useState([])

    const getUsers = () => {
        getAllUsers()
            .then(res => setUsers(res))
    }

    useEffect(() => {
        getUsers()
    }, [])


    return (
        <>
            <h2>Add Friends</h2>
            <hr></hr>
            {users.map(user => <UserCard user={user} key={user.id} />)}
        </>
    )

}