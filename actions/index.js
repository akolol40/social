import {getToken, getEmail, getUserSendEmail} from '../types/type'

export const getUserToken = (text) => {
    return {
        type: getToken,
        payload: text
    }
}

export const getUseFromSendEmail = (text) => {
    return {
        type: getUserSendEmail, 
        payload: text
    }
}

export const getUserEmail = (text) => {
    return {
        type: getEmail,
        payload: text
    }
}