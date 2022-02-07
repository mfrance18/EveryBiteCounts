import React from "react";
import { MessageCard } from "./MessageCard";
import { deleteMessage } from "../../modules/messageManager";
import "./Message.css"

export const MessageList = ({ messages, render }) => {

    const handleDeleteMessage = (id) => {
        deleteMessage(id)
            .then(render)
    }

    return (
        <>
            <h2>Your Messages</h2>
            <hr></hr>
            {messages.map(message => <MessageCard render={render} message={message} key={message.id} handleDeleteMessage={handleDeleteMessage} />)}
        </>
    )
}