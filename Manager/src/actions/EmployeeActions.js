import Firebase from 'firebase';
import {
    EMPLOYEE_FORM_INPUT_CHANGED,
    EMPLOYEE_LOADING,
    EMPLOYEE_LOADED,
    EMPLOYEES_FETCHED,
    EMPLOYEE_CREATED,
    EMPLOYEE_EDITED,
    EMPLOYEE_REMOVED,
} from '../actions/types';


export const onEmployeeFormInputChange = (prop, value) => {
    return {
        type: EMPLOYEE_FORM_INPUT_CHANGED,
        payload: { prop, value }
    }
}


export const onEmployeesFetch = (cb) => {
    return (dispatch) => {
        const { currentUser: { uid } } = Firebase.auth();

        Firebase.database().ref(`/users/${uid}/employees`)
        .on('value', snapshot => {
            dispatch({
                type: EMPLOYEES_FETCHED,
                payload: snapshot.val(),
            });
            return cb();
        });
    }
}


export const onEmployeeCreate = ({ name, phone, shift }, cb) => {
    return (dispatch) => {
        dispatch({ type: EMPLOYEE_LOADING });

        const { currentUser: { uid } } = Firebase.auth();

        if (name && phone && shift) {
            Firebase.database().ref(`/users/${uid}/employees`)
            .push({ name, phone, shift })
            .then(() => {
                dispatch({ type: EMPLOYEE_CREATED });
                return cb();
            })
            .catch(err => {
                dispatch({ type: EMPLOYEE_LOADED });
            });
        }
    }
}

export const onEmployeeEdit = ({ uid, name, phone, shift }, cb) => {
    return (dispatch) => {
        const { currentUser } = Firebase.auth();

        if (name && phone && shift) {
            Firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
            .set({ name, phone, shift })
            .then(() => {
                dispatch({ type: EMPLOYEE_EDITED });
                return cb();
            })
            .catch(err => cb(err));
        }
    }
} 

export const onEmployeeRemove = ({ uid }, cb) => {
    return (dispatch) => {
        const { currentUser } = Firebase.auth();

        if (uid) {
            Firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
            .remove()
            .then(() => {
                dispatch({ type: EMPLOYEE_REMOVED });
                return cb();
            })
            .catch(err => cb(err));
        }
    }
}