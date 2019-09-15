import {LOGIN, CHANGE_TEMP_LOGIN, CLOSE_CONNECTION} from '../actions/actions';

const initialState = {
    login: '',
    tempLogin: '',
    switchPages: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            window.socket.emit('login', state.tempLogin);
            state.switchPages = true;
            return {...state, login: state.tempLogin};
        case CHANGE_TEMP_LOGIN:
            return {...state, tempLogin: action.tempLogin};
        case CLOSE_CONNECTION:
            return {...initialState};
        default:
            return state;
    }
}