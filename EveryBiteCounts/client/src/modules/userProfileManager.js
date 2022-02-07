import { getToken } from "./authManager";

const apiUrl = "/api/UserProfile"


export const getCurrentUser = () => {
    return getToken().then((token) => {
        return fetch(`${apiUrl}/GetCurrentUser`,
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
                throw new Error("An unknown error occurred while trying to get CurrentUser.");
            }
        });
    });
};

export const getUserById = (id) => {
    return getToken().then(token => {
        return fetch(`${apiUrl}/GetById/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => res.json())
    })
}

export const updateUser = (editedUser) => {
    return getToken().then((token) => {
        return fetch(`${apiUrl}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedUser)
        }).then((res) => {
            if (res.ok) {
                return
            } else {
                throw new Error("An unknown error occurred while trying to update user.");
            }
        });
    });
};


