import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { DayList } from "./FoodEntries/DayList";
import { UserList } from "./Friends/UsersList";
import Login from "./Login";
import Register from "./Register";
import "./ApplicationViews.css"
import { FriendsList } from "./Friends/FriendList";



export default function ApplicationViews({ isLoggedIn }) {

    return (
        <main>
            <Switch>
                <Route exact path="/">


                    <section className="homePage">
                        <div>
                            {isLoggedIn ? <DayList /> : <Redirect to="/login" />}
                        </div>

                        <section>
                            <div className="myLists">
                                <div className="userList">
                                    {isLoggedIn ? <UserList /> : <Redirect to="/login" />}
                                </div>
                                <div className="friendsList">
                                    {isLoggedIn ? <FriendsList /> : <Redirect to="/login" />}
                                </div>
                            </div>
                        </section>
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
