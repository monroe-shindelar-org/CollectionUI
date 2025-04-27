import axios from "axios";

export const getCards = () => {
    return axios
        .get(`http://localhost:8080/cards`)
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
            `http://localhost:8080/cards/filter`,
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
            `http://localhost:8080/cards/ygo/race?type=${type}`,
        )
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            console.log(err);
        });
}