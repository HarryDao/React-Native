import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './AuthReducer';
import EmployeeFormReducer from './EmployeeFormReducer';
import EmployeeReducer from './EmployeeReducer';

export default combineReducers({
    form: formReducer,
    auth: authReducer,
    employee: combineReducers({
        form: EmployeeFormReducer,
        employees: EmployeeReducer
    }),
});