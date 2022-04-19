import { USER_CONTEXT_TYPES } from './user.types';

export const INITIAL_STATE = {
    currentUser: null,
    isLoading: false,
    error: null
}

export const userReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;
    
    switch(type){
        case USER_CONTEXT_TYPES.SIGN_IN_SUCCESS:
            return {...state, currentUser: payload, isLoading: false};
        case USER_CONTEXT_TYPES.SIGN_OUT_SUCCESS:
            return {...state, currentUser: null};
        case USER_CONTEXT_TYPES.SIGN_OUT_FAILED:
        case USER_CONTEXT_TYPES.SIGN_UP_FAILED:
        case USER_CONTEXT_TYPES.SIGN_IN_FAILED:
            return {...state, error: payload};
        default:
            return state;
    }
}

