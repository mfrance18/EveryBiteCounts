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
            <section className="myMessagesCards">
                <h2>Your Messages</h2>
                <hr></hr>
                <div className="messageList">
                    <MessageList render={render} messages={messages} />
                </div>
            </section>

            <section className="myFriendsCards">
                <h2>Friends List</h2>
                <hr></hr>
                <div className="friendsList">
                    <FriendsList friends={friends} render={render} />
                </div>
            </section>

            <section className="potentialFriendsCards">
                <h2>Add Friends</h2>
                <hr></hr>
                <div className="userList">
                    <PotentialFriendsList potentialFriends={potentialFriends} render={render} />
                </div>
            </section>

        </>
    )
}