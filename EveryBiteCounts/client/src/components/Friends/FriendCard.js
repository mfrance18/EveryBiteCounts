import React, { useState } from "react";
import { ModalTitle } from "react-bootstrap";
import { Modal, ModalHeader, ModalBody, Button } from "reactstrap";
import { SendForm } from "../Messages/SendForm";
import "./Friends.css"
import { FriendDetails } from "./FriendDetails";


export const FriendCard = ({ friend, handleDeleteFriend, render }) => {
    const [modal, setModal] = useState(false);
    const [formModal, setFormModal] = useState(false)

    const toggle = () => {
        setModal(!modal)
    };

    const toggleForm = () => {
        setFormModal(!formModal)
    }

    console.log(friend, "friend")

    return (
        <>
            <section className="userCard">
                <div>
                    {friend.fullName}
                </div>
                <div>
                    <Button className="friendDetails" variant="secondary" size="sm" type="button" onClick={toggle} >View Details</Button>
                    <Button className="friendDetails" variant="secondary" size="sm" type="button" onClick={toggleForm}>Send Message</Button>
                    <Button className="deleteFriend" variant="secondary" size="sm" type="button" onClick={() => handleDeleteFriend(friend.followship.id)}>Delete Friend</Button>
                </div>
            </section>

            <Modal isOpen={modal} toggle={toggle} className="friendDetailsModal">
                <ModalTitle toggle={toggle}>Hi There! My name is {friend.fullName}</ModalTitle>

                <ModalHeader>
                    <h6>About Me: </h6>
                    {friend.aboutMe}
                </ModalHeader>
                <ModalBody>
                    <h5>Here are some details about me and my goals:</h5>
                    <FriendDetails friend={friend} key={friend.id} />
                </ModalBody>
            </Modal>

            <Modal isOpen={formModal} toggle={toggleForm} className="sendModal">
                <ModalBody>
                    <SendForm render={render} receiverId={friend.id} toggleForm={toggleForm} />
                </ModalBody>
            </Modal>
        </>
    )
}