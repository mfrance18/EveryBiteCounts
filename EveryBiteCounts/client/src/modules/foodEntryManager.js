import { getToken } from "./authManager";

const apiUrl = "/api/FoodEntry"

export const getFoodByUserId = () => {
    return getToken().then((token) => {
        return fetch(`${apiUrl}/GetMyFoods`,
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
                throw new Error("An unknown error occurred while trying to get Food Entries.");
            }
        });
    });
};

export const getFoodById = (id) => {
    return getToken().then(token => {
        return fetch(`${apiUrl}/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => res.json())
    })
}

export const addFood = (newFood) => {
    return getToken().then((token) => {
        return fetch(apiUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newFood)
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("An unknown error occurred while trying to add food.");
            }
        });
    });
};

export const updateFood = (editedFood) => {
    return getToken().then((token) => {
        return fetch(`${apiUrl}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedFood)
        }).then((res) => {
            if (res.ok) {
                return
            } else {
                throw new Error("An unknown error occurred while trying to update food.");
            }
        });
    });
};

export const deleteFood = (food) => {
    return getToken().then((token) => {
        return fetch(`${apiUrl}/${food}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(food)
        }).then((res) => {
            if (res.ok) {
                return
            } else {
                throw new Error("An unknown error occurred while trying to delete food.");
            }
        });
    });
};