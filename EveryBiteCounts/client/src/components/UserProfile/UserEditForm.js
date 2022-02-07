import React, { useEffect, useState } from "react";
import { Label, Button, Input } from "reactstrap"
import { updateUser, getUserById } from "../../modules/userProfileManager";
import { Form } from "react-bootstrap";
import "./UserProfile.css"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


export const UserEditForm = ({ render, user, toggleEdit }) => {

    const [users, setUsers] = useState({
        firstName: "",
        lastName: "",
        aboutMe: "",
        currentWeight: "",
        dailyCaloricGoal: "",
        imageLocation: "",
        email: user.email
    })

    const [image, setImage] = useState("")

    const [isLoading, setIsLoading] = useState(false)

    const history = useHistory();

    const userId = user.id

    const handleFieldChange = event => {
        const stateToChange = { ...users }
        stateToChange[event.target.id] = event.target.value;
        setUsers(stateToChange)
    }

    const uploadImage = async (e) => {
        const files = e.target.files;
        const data = new FormData();
        data.append("file", files[0]);
        data.append("upload_preset", "fcfo8agr");
        setIsLoading(true);
        const res = await fetch(
            "https://api.cloudinary.com/v1_1/mfrance18/image/upload",
            {
                method: "POST",
                body: data,
            }
        );
        const file = await res.json();
        setImage(file.secure_url);
        setIsLoading(false);
    };



    const updateExistingUser = event => {
        event.preventDefault()
        setIsLoading(true)

        const editedUser = {
            id: userId,
            email: user.email,
            firstName: users.firstName,
            lastName: users.lastName,
            aboutMe: users.aboutMe,
            currentWeight: users.currentWeight,
            dailyCaloricGoal: users.dailyCaloricGoal,
            imageLocation: image ? image : users.imageLocation
        }

        updateUser(editedUser)
            .then(toggleEdit)
            .then(render)
    }

    useEffect(() => {
        getUserById(userId)
            .then(res => {
                setUsers(res)
                setIsLoading(false)
            })
    }, [])


    return (
        <>
            <div>
                <Form className="commentForm">
                    <h1>Edit User</h1>
                    <Form.Group>
                        <div>
                            <Label className="update-user-header" htmlFor="first name">First Name:</Label>
                            <Input className="form-control" type="text" id="firstName" onChange={handleFieldChange} placeholder="First Name" value={users.firstName} />
                        </div>
                        <div>
                            <Label className="update-user-header" htmlFor="last name">Last Name:</Label>
                            <Input className="form-control" type="text" id="lastName" onChange={handleFieldChange} placeholder="Last Name" value={users.lastName} />
                        </div>
                        <div>
                            <Label className="update-user-header" htmlFor="about me">About Me:</Label>
                            <Input className="form-control" type="text" id="aboutMe" onChange={handleFieldChange} placeholder="About Me" value={users.aboutMe} />
                        </div>
                        <div>
                            <Label className="update-user-header" htmlFor="current weight">Current Weight:</Label>
                            <Input className="form-control" type="text" id="currentWeight" onChange={handleFieldChange} placeholder="Current Weight" value={users.currentWeight} />
                        </div>
                        <div>
                            <Label className="update-user-header" htmlFor="current weight">Daily Caloric Goal:</Label>
                            <Input className="form-control" type="text" id="dailyCaloricGoal" onChange={handleFieldChange} placeholder="Daily Caloric Goal" value={users.dailyCaloricGoal} />
                        </div>
                        <div>
                            <Label className="update-user-header" htmlFor="image location">Add Image:</Label>{" "}
                            <Input className="form-control" type="file" id="imageLocation" onChange={uploadImage} placeholder="Image" />
                        </div>
                        <div className="profileImageEdit">
                            {isLoading ? (
                                <h4 style={{ marginTop: 20 }}>Loading...</h4>
                            ) : (
                                <>
                                    <img className="mainImage" src={image} />

                                    <Button className="comment-save-button"
                                        variant="secondary" size="sm"
                                        disabled={isLoading}
                                        onClick={updateExistingUser}>
                                        Update
                                    </Button>

                                </>)}
                        </div>
                    </Form.Group>
                </Form>
            </div>
        </>
    )
}
