import {combineReducers} from 'redux'
import SearchReducer from './SearchReducer'

export default combineReducers({
    AuthToken: SearchReducer, 
    UserEmail: SearchReducer,
    UserSendEmail: SearchReducer
})