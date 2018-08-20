import Firebase from 'firebase';
import {
    AUTH_INPUT_CHANGED,
    USER_LOGIN_LOADING,
    USER_LOGIN_SUCCEEDED,
    USER_LOGIN_FAILED,
} from './types';


export const onAuthInputChange = (prop, value) => {
    return {
        type: AUTH_INPUT_CHANGED,
        payload: { prop, value }
    }
}   

export const onUserLogin = (email, password, cb) => {
    return (dispatch) => {
        dispatch({ type: USER_LOGIN_LOADING });

        Firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => loginSucceeded(dispatch, cb))
            .catch(err => {
                Firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(() => loginSucceeded(dispatch, cb))
                    .catch(err => loginFailed(dispatch));
            });
    }
}

const loginSucceeded = (dispatch, cb) => {
    dispatch({
        type: USER_LOGIN_SUCCEEDED
    });

    if (cb && typeof cb === 'function') {
        return cb();
    }
}

const loginFailed = (dispatch) => {
    return dispatch({
        type: USER_LOGIN_FAILED
    })
}