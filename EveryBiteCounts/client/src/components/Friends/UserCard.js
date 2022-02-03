import React, { useEffect } from "react";
import { Button } from "reactstrap";
import "./Friends.css"


export const UserCard = ({ user }) => {


    console.log()
    return (
        <>
            <section className="userCard">
                <div>
                    {user.fullName}
                </div>
                <div>
                    <Button className="addFriend" size="sm" type="button">Add Friend</Button>
                </div>
            </section>
        </>
    )
}