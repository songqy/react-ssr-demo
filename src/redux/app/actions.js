import * as actionTypes from './actionTypes';

export const setMessage = payload => ({
    type: actionTypes.MESSAGE,
    payload,
});

export const setData = payload => ({
    type: actionTypes.DATA,
    payload,
});
