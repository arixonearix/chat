import {CHANGE_TEMP_MESSAGE, NEW_MESSAGE, SEND_MESSAGE, SEND_TEMP_MESSAGE} from '../actions/actions';

const initialState = {
    messages: [
        {nickname: 'Server', message: 'Welcome!'}
    ]
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SEND_TEMP_MESSAGE:
            if(state.tempMessage) {
                window.socket.emit('message', state.tempMessage);
            } else {
                console.log('Enter message');
            }
            state.tempMessage = '';
            return {...state};
        case CHANGE_TEMP_MESSAGE:
            state.tempMessage = action.tempMessage;
            return {...state};
        case NEW_MESSAGE:
            state.messages.push(action.messageObject);
            return {...state};
        default:
            return state;
    }
}