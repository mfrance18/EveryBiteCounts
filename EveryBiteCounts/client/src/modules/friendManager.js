import { getToken } from "./authManager";

const _apiUrl = "/api/userprofile";


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



