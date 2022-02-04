import React, { useState } from "react";
import { addMessage } from "../../modules/messageManager";
import { Form, Label, Input, FormGroup, Button } from "reactstrap";

export const ReplyForm = ({ message, render, toggleForm }) => {

    const [messages, setMessage] = useState({
        messageContent: "",
        receiverId: message.senderId
    })

    const handleControlledInputChange = (event) => {
        const newMessage = { ...messages }
        let selectedVal = event.target.value

        if (event.target.value.includes("Id")) {
            selectedVal = parseInt(selectedVal)
        }

        newMessage[event.target.id] = selectedVal
        setMessage(newMessage)
    }

    const handleClickSaveMessage = (event) => {
        event.preventDefault()
        addMessage(messages)
            .then(toggleForm)
            .then(render)
            .then(alert("Message Sent"))
    }

    return (
        <>
            <div>
                <Form>
                    <FormGroup>
                        <Label htmlFor="name">Reply</Label>
                        <Input className="form-control" type="textarea" id="messageContent" onChange={handleControlledInputChange} value={messages.messageContent} />
                    </FormGroup>
                </Form>

            </div>

            <div >
                <Button className="foodSave"
                    variant="secondary" size="sm"
                    onClick={handleClickSaveMessage}>
                    Send Message
                </Button>
            </div>
        </>
    )


}