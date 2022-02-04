import React, { useState } from "react";
import { Card, CardFooter, CardBody, Button, Modal, ModalBody } from "reactstrap";
import { ReplyForm } from "./ReplyForm";
export const MessageDetails = ({ message, render, handleDeleteMessage }) => {

    const [modal, setModal] = useState(false);

    const toggleForm = () => {
        setModal(!modal)
    };

    return (
        <>
            <Card>
                <CardBody>
                    {message.messageContent}
                </CardBody>
                <CardFooter>
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