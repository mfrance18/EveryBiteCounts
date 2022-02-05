import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import { getCurrentUser } from "../../modules/userProfileManager";
import { UserEditForm } from "./UserEditForm";
import "./UserProfile.css"


export const UserCard = () => {

    const [user, setUser] = useState({})

    const getUser = () => {
        getCurrentUser()
            .then(res => setUser(res))
    }

    const [editModal, setEditModal] = useState(false);

    const toggleEdit = () => {
        setEditModal(!editModal)

    }

    useEffect(() => {
        getUser()
    }, [])





    return (
        <>

            <section className="introContainer">
                <div className="intro">
                    <img className="profilePic" onClick={() => toggleEdit()} src={user.imageLocation} alt="Profile" />
                    <h1>Hi {user.firstName}!</h1>
                </div>
                <div className="img__wrap">
                    <div>
                        <Button className="editProfile" className="reply" variant="secondary" size="sm" type="button" onClick={toggleEdit}>Click To Edit Profile</Button>
                    </div>
                </div>
            </section>

            <Modal isOpen={editModal} toggle={toggleEdit} className="commentModal">
                <ModalHeader toggle={toggleEdit}>Edit User Info</ModalHeader>
                <ModalBody>
                    <UserEditForm user={user} toggleEdit={toggleEdit} />
                </ModalBody>
            </Modal>
        </>
    )
}