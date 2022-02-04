import { getToken } from "./authManager";
const apiUrl = "/api/Message"

export const getMessageByUserId = () => {
    return getToken().then((token) => {
        return fetch(`${apiUrl}/GetMyMessages`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        ).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("An unknown error occurred while trying to get Messages.");
            }
        });
    });
};

export const addMessage = (newMessage) => {
    return getToken().then((token) => {
        return fetch(apiUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newMessage)
        }).then((res) => {
            if (res.ok) {
                return null;
            } else {
                throw new Error("An unknown error occurred while trying to add message.");
            }
        });
    });
};


export const deleteMessage = (message) => {
    return getToken().then((token) => {
        return fetch(`${apiUrl}/${message}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(message)
        }).then((res) => {
            if (res.ok) {
                return
            } else {
                throw new Error("An unknown error occurred while trying to delete message.");
            }
        });
    });
};