import {combineReducers} from "redux";
import TypeReducers from './types';
import LoginReducer from './LoginReducer';
import MessagesReducer from './MessagesReducer';

const allReducers = combineReducers({
    types: TypeReducers,
    logins: LoginReducer,
    messages: MessagesReducer,
});

export default allReducers;