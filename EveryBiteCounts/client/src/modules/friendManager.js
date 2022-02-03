import { getToken } from "./authManager";

const _apiUrl = "/api/userprofile";
const apiUrl = "/api/Followship"

export const getAllUsers = () => {
    return getToken().then((token) => {
        return fetch(`${_apiUrl}/GetAllProfiles`,
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
                throw new Error("An unknown error occurred while trying to get Users.");
            }
        });
    });
};

export const getUserFriends = () => {
    return getToken().then((token) => {
        return fetch(`${_apiUrl}/GetFriends`,
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
                throw new Error("An unknown error occurred while trying to get Friends.");
            }
        });
    });
};

export const addFriend = (newFriend) => {
    return getToken().then((token) => {
        return fetch(apiUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newFriend)
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("An unknown error occurred while trying to add friend.");
            }
        });
    });
};

export const deleteFriend = (friend) => {
    return getToken().then((token) => {
        return fetch(`${apiUrl}/${friend}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(friend)
        }).then((res) => {
            if (res.ok) {
                return
            } else {
                throw new Error("An unknown error occurred while trying to delete friend.");
            }
        });
    });
};






