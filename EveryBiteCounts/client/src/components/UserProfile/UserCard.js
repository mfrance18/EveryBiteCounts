import React, { useState } from "react";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import { UserEditForm } from "./UserEditForm";
import "./UserProfile.css"
import { logout } from "../../modules/authManager";


export const UserCard = ({ user, render }) => {

    const [editModal, setEditModal] = useState(false);

    const toggleEdit = () => {
        setEditModal(!editModal)

    }


    return (
        <>

            <section className="introContainer">
                <img className="profilePic" onClick={() => toggleEdit()} src={user.imageLocation} alt="Profile" />
                <div className="intro">
                    <h1>Hi {user.firstName}!</h1>
                    <div>
                        <Button className="editProfile" variant="secondary" size="sm" type="button" onClick={toggleEdit}>Click To Edit Profile</Button>
                        <Button className="logoutButton" variant="secondary" size="sm" type="button" onClick={logout}>Logout</Button>
                    </div>
                </div>
            </section>

            <Modal isOpen={editModal} toggle={toggleEdit} className="commentModal">
                <ModalHeader toggle={toggleEdit}>Edit User Info</ModalHeader>
                <ModalBody>
                    <UserEditForm render={render} user={user} toggleEdit={toggleEdit} />
                </ModalBody>
            </Modal>
        </>
    )
}