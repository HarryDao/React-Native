import _ from 'lodash';
import {
    LIKE_JOB,
    CLEAR_LIKED_JOBS
} from '../actions/types';


export default (state = [], action) => {
    const { payload, type } = action;

    switch(type) {
        case LIKE_JOB:
            return _.uniqBy([payload, ...state], 'jobkey');
        case CLEAR_LIKED_JOBS:
            return [];
        default:
            return state;
    }
}