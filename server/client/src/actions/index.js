import 'babel-polyfill';
import axios from 'axios';
import { UPDATE_USER_DETAILS, GET_CARDS } from './types';

export const updateUserDetails = details => {
    return {
        type: UPDATE_USER_DETAILS,
        details
    }
}

export const getCards = details => async dispatch => {
    const res = await axios.post('/api/findcards', details);
    dispatch({ type: GET_CARDS, availableCards: res.data });
}
