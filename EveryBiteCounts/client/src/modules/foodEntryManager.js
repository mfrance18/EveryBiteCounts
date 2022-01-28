import { getToken } from "./authManager";

const apiUrl = "/api/FoodEntry"

export const getFoodByUserId = (mealTypeId) => {
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