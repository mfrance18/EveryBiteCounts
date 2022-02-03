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
    const [displayName, setDisplayName] = useState();
    const [email, setEmail] = useState();
    const [currentWeight, setCurrentWeight] = useState();
    const [caloricGoal, setCaloricGoal] = useState();
    const [imageLocation, setImageLocation] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const registerClick = (e) => {
        e.preventDefault();
        if (password && password !== confirmPassword) {
            alert("Passwords don't match. Do better.");
        } else {
            const userProfile = { firstName, lastName, displayName, email, imageLocation, currentWeight, caloricGoal };
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
                <div className="login-logo"><img className="loginImage" src={MainLogo} alt="Rx Tracker Logo" /></div>
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
                            <Label htmlFor="displayName">Display Name</Label>
                            <Input id="displayName" type="text" onChange={e => setDisplayName(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input id="email" type="text" onChange={e => setEmail(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="imageLocation">Profile Image URL</Label>
                            <Input id="imageLocation" type="text" onChange={e => setImageLocation(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="currentWeight">What's Your Current Weight?</Label>
                            <Input id="currentWeight" type="text" onChange={e => setCurrentWeight(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="caloricGoal">Caloric Goal Per Day</Label>
                            <Input id="caloricGoal" type="text" onChange={e => setCaloricGoal(e.target.value)} />
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
                            <Button>Register</Button>
                            <Button className="registerCancel" onClick={handleCancel}>Cancel</Button>
                        </FormGroup>
                    </fieldset>
                </Form>
            </main>
        </section>
    );
}
