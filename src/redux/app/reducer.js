import * as actionTypes from './actionTypes';

const defaultState = {
    message: 'hello world',
    data: [],
};


export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.MESSAGE:
            return { ...state, message: action.payload };
        case actionTypes.DATA:
            return { ...state, data: action.payload };
        default:
            return state;
    }
};
