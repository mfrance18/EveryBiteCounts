import React, { useState, useEffect } from "react";
import { getPotentialFriends, getUserFriends } from "../../modules/friendManager";
import { PotentialFriendsList } from "./PotentialFriendsList";
import { FriendsList } from "./FriendList";
import { MessageList } from "../Messages/MessageList";
import "../../components/ApplicationViews.css"
import { getMessageByUserId } from "../../modules/messageManager";



export const MyLists = () => {
    const [potentialFriends, setPotentialFriends] = useState([])
    const [friends, setFriends] = useState([])
    const [messages, setMessages] = useState([])


    const getMyPotentialFriends = () => {
        getPotentialFriends()
            .then(res => setPotentialFriends(res))
    }

    const getMyFriends = () => {
        getUserFriends()
            .then(res => setFriends(res))
    }

    const getMyMessages = () => {
        getMessageByUserId()
            .then(res => setMessages(res))
    }

    const render = () => {
        getMyFriends()
        getMyPotentialFriends()
        getMyMessages()
    }

    useEffect(() => {
        getMyFriends()
        getMyPotentialFriends()
        getMyMessages()
    }, [])

    return (
        <>
            <div className="messageList">
                <MessageList render={render} messages={messages} />
            </div>

            <div className="friendsList">
                <FriendsList friends={friends} render={render} />
            </div>

            <div className="userList">
                <PotentialFriendsList potentialFriends={potentialFriends} render={render} />
            </div>


        </>
    )
}