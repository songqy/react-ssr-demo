
import appReducer from './app/reducer';
import { combineReducers } from 'redux';

export const finalReducer = combineReducers({
    app: appReducer,
});
