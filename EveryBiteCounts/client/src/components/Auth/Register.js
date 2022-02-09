import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useHistory } from "react-router-dom";
import { register } from "../../modules/authManager";
import MainLogo from "../../images/EveryBiteCountsLogo.png"
import "./Auth.css"

export default function Register() {
    const history = useHistory();

    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [currentWeight, setCurrentWeight] = useState();
    const [dailyCaloricGoal, setDailyCaloricGoal] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [aboutMe, setAboutMe] = useState();

    const registerClick = (e) => {
        e.preventDefault();
        if (password && password !== confirmPassword) {
            alert("Passwords don't match. Do better.");
        } else {
            const userProfile = { firstName, lastName, email, imageLocation: "https://res.cloudinary.com/mfrance18/image/upload/v1635191829/piyed1wnh5ehtg0dp5h9.png", currentWeight, dailyCaloricGoal, aboutMe };
            register(userProfile, password)
                .then(() => history.push("/"));
        }
    };

    const handleCancel = () => {
        history.push("/login")
    }

    return (
        <section className="mainRegister">
            <main className="container--register">
                <div className="login-logo"><img className="loginImage" src={MainLogo} alt="Every Bite Counts Logo" /></div>
                <Form onSubmit={registerClick} className="form--register">
                    <fieldset>
                        <FormGroup>
                            <Label htmlFor="firstName">First Name</Label>
                            <Input id="firstName" type="text" onChange={e => setFirstName(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input id="lastName" type="text" onChange={e => setLastName(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input id="email" type="text" onChange={e => setEmail(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="currentWeight">What's Your Current Weight?</Label>
                            <Input id="currentWeight" type="text" onChange={e => setCurrentWeight(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="caloricGoal">Caloric Goal Per Day</Label>
                            <Input id="caloricGoal" type="text" onChange={e => setDailyCaloricGoal(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="confirmPassword">Confirm Password</Label>
                            <Input id="confirmPassword" type="password" onChange={e => setConfirmPassword(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="aboutMe">Tell us about yourself</Label>
                            <Input id="aboutMe" type="textarea" onChange={e => setAboutMe(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Button>Register</Button>
                            <Button className="registerCancel" onClick={handleCancel}>Cancel</Button>
                        </FormGroup>
                    </fieldset>
                </Form>
            </main>
        </section>
    );
}
