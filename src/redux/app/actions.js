import * as actionTypes from './actionTypes';

export const setMessage = payload => ({
    type: actionTypes.MESSAGE,
    payload,
});