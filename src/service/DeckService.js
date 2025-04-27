import axios from "axios";
import { API_BASE_URL } from "../constants"

export const getDeck = (deckId) => {
    return axios
        .get(`${API_BASE_URL}/decks/${deckId}`)
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            console.log(err);
        });
}

export const updateDeck = (deckId, cardIds) => {
    return axios
        .post(
            `${API_BASE_URL}/decks/${deckId}`,
            cardIds
        )
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            console.log(err);
        });
}

export const filterDeck = (deckId, filters) => {
    return axios
        .post(
            `${API_BASE_URL}/decks/${deckId}/filters`,
            filters
        )
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            console.log(err);
        });
}