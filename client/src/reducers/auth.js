import { REGISTER_SUCCESS,  USER_LOADED, LOGIN_SUCCESS, LOGOUT, ACCOUNT_DELETED } from '../actions/types';
const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    user: null
}
export default function(state = initialState, action){
    const {type, payload} = action; 
    switch(type){
        case USER_LOADED:
            return {  ...state, isAuthenticated: true, user: payload }
        case REGISTER_SUCCESS: 
        case LOGIN_SUCCESS: 
            localStorage.setItem('token', payload.token);
            return{ ...state,...payload,isAuthenticated: true }
        case LOGOUT:
        case ACCOUNT_DELETED:
            localStorage.removeItem('token');
            return{...state, token: null, isAuthenticated: false, user: null}
        default: return state; 
    }
}