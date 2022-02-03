import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useHistory, Link } from "react-router-dom";
import { login } from "../../modules/authManager";
import MainLogo from "../../images/EveryBiteCountsLogo.png"
import "./Auth.css"

export default function Login() {
    const history = useHistory();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const loginSubmit = (e) => {
        e.preventDefault();
        login(email, password)
            .then(() => history.push("/"))
            .catch(() => alert("Invalid email or password"));
    };

    return (
        <section className="mainLogin">
            <main className="container--login">
                <div className="login-logo"><img className="loginImage" src={MainLogo} alt="Rx Tracker Logo" /></div>
                <Form onSubmit={loginSubmit} className="form--login">
                    <fieldset>
                        <FormGroup>
                            <h2 className="signIn">Welcome!</h2>
                            <h4>Please sign in below:</h4>
                            <Label for="email">Email</Label>
                            <Input id="email" type="text" autoFocus onChange={e => setEmail(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Button>Login</Button>
                        </FormGroup>
                        <em>
                            Not registered? <Link to="register">Register</Link>
                        </em>
                    </fieldset>
                </Form>
            </main>
        </section>
    );
}