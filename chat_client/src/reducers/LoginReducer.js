import {LOGIN, CHANGE_TEMP_LOGIN, CLOSE_CONNECTION, LOGIN_PROCESS} from '../actions/actions';

const initialState = {
    login: '',
    tempLogin: '',
    switchPages: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            window.socket.emit('login', state.tempLogin);
            return state;
        case LOGIN_PROCESS:
            if (action.switchPages) {
                state.switchPages = true;
                window.toastr.info(action.message);
                return {...state, login: state.tempLogin};
            } else {
                window.toastr.info(action.message);
            }
            return state;
        case CHANGE_TEMP_LOGIN:
            return {...state, tempLogin: action.tempLogin};
        case CLOSE_CONNECTION:
            return {...initialState};
        default:
            return state;
    }
}