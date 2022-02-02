import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { DayList } from "./FoodEntries/DayList";
import Login from "./Login";
import Register from "./Register";



export default function ApplicationViews({ isLoggedIn }) {

    return (
        <main>
            <Switch>
                <Route exact path="/">
                    {isLoggedIn ? <DayList /> : <Redirect to="/login" />}
                </Route>

                <Route exact path="/friends">

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
