import React, { useState } from "react";
import { Card, CardFooter, CardBody, Button, Modal, ModalBody, CardHeader } from "reactstrap";
import { ReplyForm } from "./ReplyForm";
import "./Message.css"
export const MessageDetails = ({ message, render, handleDeleteMessage }) => {

    const [modal, setModal] = useState(false);

    const toggleForm = () => {
        setModal(!modal)
    };
    console.log(message, "message")
    return (
        <>
            <Card className="messageCard">
                <CardHeader className="messageHeader">
                    <div className="userImage">
                        <img className="userPic" src={message.userProfile.imageLocation} alt="User" />
                    </div>
                    <h5>{message.userProfile.firstName}</h5>
                </CardHeader>
                <CardBody>
                    {message.messageContent}
                </CardBody>
                <CardFooter className="messageFooter">
                    <div className="messageButtons">
                        <Button className="messageDelete" variant="secondary" size="sm" type="button" onClick={() => handleDeleteMessage(message.id)}>Delete</Button>
                        <Button className="reply" variant="secondary" size="sm" type="button" onClick={toggleForm}>Reply</Button>
                    </div>
                </CardFooter>
            </Card>

            <Modal isOpen={modal} toggle={toggleForm} className="messageDetailsModal">
                <ModalBody>
                    <ReplyForm render={render} message={message} toggleForm={toggleForm} />
                </ModalBody>
            </Modal>
        </>
    )
}