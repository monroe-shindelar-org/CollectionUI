import axios from "axios";
import { API_BASE_URL } from "../constants"

export const getCards = () => {
    return axios
        .get(`${API_BASE_URL}/cards`)
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            console.log(err);
        });
}

export const filterCards = (filters) => {
    return axios
        .post(
            `${API_BASE_URL}/cards/filter`,
            filters
        )
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            console.log(err);
        });
}

export const getRacesByType = (type) => {
    return axios
        .post(
            `${API_BASE_URL}/cards/ygo/race?type=${type}`,
        )
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            console.log(err);
        });
}