import * as actionTypes from './actionTypes';

const defaultState = {
    message: 'hello world',
};


export default (state = defaultState, action) => {
    switch(action.type) {
        case actionTypes.MESSAGE :
            return { ...state, message: action.payload };
        default:
            return state;
    }
};
