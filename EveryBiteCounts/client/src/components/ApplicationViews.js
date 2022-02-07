import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import "./ApplicationViews.css"
import { MainComponent } from "./MainComponent";



export default function ApplicationViews({ isLoggedIn }) {



    return (
        <main>
            <Switch>
                <Route exact path="/">
                    {isLoggedIn ? <MainComponent /> : <Redirect to="/login" />}
                </Route>

                <Route exact path="/login">
                    {isLoggedIn ? <Redirect to="/" /> : <Login />}
                </Route>

                <Route exact path="/register">
                    <Register />
                </Route>
            </Switch>
        </main>
    );
};
