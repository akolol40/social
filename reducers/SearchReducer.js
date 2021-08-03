import {getToken, getEmail, getUserSendEmail } from '../types/type'

const INITIAL_STATE = {
    token: '',
    email: '', 
    userEmail: ''
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case getToken: 
            return {
                ...state, 
                token: action.payload
            }
            
            case getEmail: 
            return {
                ...state, 
                email: action.payload
            }

            case getUserSendEmail: 
            return {
                ...state, 
                userEmail: action.payload
            }


            default: return state
        }
}