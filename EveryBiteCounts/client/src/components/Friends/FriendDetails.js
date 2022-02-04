import React from "react";
import { Card, CardTitle, CardText, CardBody } from "reactstrap";


export const FriendDetails = ({ friend }) => {

    return (
        <>

            <div>
                <Card>
                    <CardBody>
                        <CardTitle tag="h5">
                            Hello! My name is {friend.fullName}
                        </CardTitle>
                        <CardText>
                            {friend.aboutMe}
                            Here are some details about me and my goals:
                            <ul>
                                <li>My caloric goal for each day: {friend.dailyCaloricGoal}</li>
                                <li> My current weight: {friend.currentWeight}</li>
                            </ul>
                        </CardText>
                    </CardBody>
                </Card>
            </div>
        </>
    )

}