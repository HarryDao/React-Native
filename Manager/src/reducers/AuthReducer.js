import {
    AUTH_INPUT_CHANGED,
    USER_LOGIN_LOADING,
    USER_LOGIN_SUCCEEDED,
    USER_LOGIN_FAILED,
} from '../actions/types';

const INITIAL_STATE = {
    email: '',
    password: '',
    error: '',
    loading: '',
    authenticated: false,
}

export default (state = INITIAL_STATE, action) => {
    const { payload } = action;

    switch(action.type) {
        case AUTH_INPUT_CHANGED:
            return { ...state, [payload.prop]: payload.value }
        case USER_LOGIN_LOADING:
            return { ...state, loading: true, error: '' }
        case USER_LOGIN_FAILED:
            return { ...state, error: 'Login Failed!', loading: false }
        case USER_LOGIN_SUCCEEDED:
            return { ...INITIAL_STATE, authenticated: true }
        default:
            return state;
    }
}