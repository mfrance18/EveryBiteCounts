import React, { useState } from "react";
import { Modal, ModalBody, Button } from "reactstrap";
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

    return (
        <>
            <section className="userCard">
                <div className="userImage">
                    <img className="userPic" src={friend.imageLocation} alt="User" />
                </div>
                <div className="friendName">
                    {friend.fullName}
                </div>
                <div>
                    <Button className="friendDetails" variant="secondary" size="sm" type="button" onClick={toggle} >View Details</Button>
                    <Button className="friendDetails" variant="secondary" size="sm" type="button" onClick={toggleForm}>Send Message</Button>
                    <Button className="deleteFriend" variant="secondary" size="sm" type="button" onClick={() => handleDeleteFriend(friend.followship.id)}>Delete Friend</Button>
                </div>
            </section>

            <Modal isOpen={modal} toggle={toggle} className="friendDetailsModal">
                <ModalBody>
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