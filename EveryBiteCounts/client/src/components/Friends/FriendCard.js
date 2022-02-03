import React, { useState } from "react";
import { ModalTitle } from "react-bootstrap";
import { Modal, ModalHeader, ModalBody, Button } from "reactstrap";
import "./Friends.css"
import { UserDetails } from "./UserDetails";


export const FriendCard = ({ friend, handleDeleteFriend }) => {
    const [modal, setModal] = useState(false);

    const toggle = () => {
        setModal(!modal)
        console.log(friend)
    };

    return (
        <>
            <section className="userCard">
                <div>
                    {friend.fullName}
                </div>
                <div>
                    <Button className="friendDetails" variant="secondary" size="sm" type="button" onClick={toggle} >View Details</Button>
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
                    <UserDetails friend={friend} key={friend.id} />
                </ModalBody>
            </Modal>
        </>
    )
}