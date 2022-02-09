import React from "react";
import { PotentialFriendCard } from "./PotentialFriendCard";
import "./Friends.css"


export const PotentialFriendsList = ({ potentialFriends, render }) => {


    return (
        <>

            {potentialFriends.map(pf => <PotentialFriendCard render={render} potentialFriend={pf} key={pf.id} />)}
        </>
    )

}