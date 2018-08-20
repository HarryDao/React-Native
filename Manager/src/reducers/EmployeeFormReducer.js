import {
    EMPLOYEE_FORM_INPUT_CHANGED,
    EMPLOYEE_LOADING,
    EMPLOYEE_LOADED,
    EMPLOYEE_CREATED,
    EMPLOYEE_EDITED,
    EMPLOYEE_REMOVED,
} from '../actions/types';

const INITIAL_STATE = {
    name: '',
    phone: '',
    shift: '',
    loading: false,
}

export default (state = INITIAL_STATE, action) => {
    const { payload } = action;

    switch(action.type) {
        case EMPLOYEE_FORM_INPUT_CHANGED:
            return { ...state, [payload.prop]: payload.value };
        case EMPLOYEE_LOADING:
            return { ...state, loading: true };
        case EMPLOYEE_LOADED:
            return { ...state, loading: false };
        case EMPLOYEE_CREATED:
            return { ...INITIAL_STATE };
        case EMPLOYEE_EDITED:
            return { ...INITIAL_STATE };
        case EMPLOYEE_REMOVED:
            return { ...INITIAL_STATE };
        default: 
            return state; 
    }
}