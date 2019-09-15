export const LOGIN = 'LOGIN';
export const CHANGE_TEMP_LOGIN = 'CHANGE_TEMP_LOGIN';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const CHANGE_TEMP_MESSAGE = 'CHANGE_TEMP_MESSAGE';
export const SEND_TEMP_MESSAGE = 'SEND_TEMP_MESSAGE';
export const NEW_MESSAGE ='NEW_MESSAGE';


export const toggleExpand = (login) => ({
    type: LOGIN,
    login
});
export const makeLogin = () => {
    return {
        type: LOGIN
    };
};
export const changeTempLogin = (tempLogin) => {
    return {
        type: CHANGE_TEMP_LOGIN,
        tempLogin
    };
};
export const changeTempMessage = (tempMessage) => {
    return {
        type: CHANGE_TEMP_MESSAGE,
        tempMessage
    };
};
export const sendTempMessage = () => {
    return {
        type: SEND_TEMP_MESSAGE
    };
};
export const newMessage = (messageObject) => {
    return {
        type: NEW_MESSAGE,
        messageObject
    };
};
