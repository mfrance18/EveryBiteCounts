import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { DayList } from "./FoodEntries/DayList";
import { UserList } from "./Friends/UsersList";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import "./ApplicationViews.css"
import { FriendsList } from "./Friends/FriendList";
import MainLogo from "../images/EveryBiteCountsLogo.png"
import { Button } from "reactstrap";
import { logout } from "../modules/authManager";



export default function ApplicationViews({ isLoggedIn }) {

    return (
        <main>
            <Switch>
                <Route exact path="/">


                    <section className="homePage">
                        <div className="navImage">

                            <img className="navLogo" src={MainLogo} alt="Rx Tracker Logo" />
                            <div className="welcome">
                                <h3>Welcome to Every Bite Counts!</h3>
                                <h5>This app allows you to keep track of what you have eaten </h5>
                                <h5>throughout each day, and howmany calories each food item is. </h5>
                                <h5>Once you are through with your day, you can simply logout below</h5>
                                <Button onClick={logout}>Logout</Button>
                            </div>
                        </div>

                        <div>
                            {isLoggedIn ? <DayList /> : <Redirect to="/login" />}
                        </div>

                        <div className="myLists">
                            <div className="userList">
                                {isLoggedIn ? <UserList /> : <Redirect to="/login" />}
                            </div>
                            <div className="friendsList">
                                {isLoggedIn ? <FriendsList /> : <Redirect to="/login" />}
                            </div>
                        </div>

                    </section>


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
