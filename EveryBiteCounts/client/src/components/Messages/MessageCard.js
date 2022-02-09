import React from "react";
import { MessageDetails } from "./MessageDetails";

import "./Message.css"

export const MessageCard = ({ render, message, handleDeleteMessage }) => {


    return (
        <>
            <section className="messageCardContainer">
                <div className="messageButtons">
                    <MessageDetails render={render} message={message} key={message.id} handleDeleteMessage={handleDeleteMessage} />
                </div>
            </section>

        </>
    )
}