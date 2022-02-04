import React, { useState, useEffect } from "react";
import { PotentialFriendCard } from "./PotentialFriendCard";
import "./Friends.css"


export const PotentialFriendsList = ({ potentialFriends, render }) => {


    return (
        <>
            <h2>Add Friends</h2>
            <hr></hr>
            {potentialFriends.map(pf => <PotentialFriendCard render={render} potentialFriend={pf} key={pf.id} />)}
        </>
    )

}