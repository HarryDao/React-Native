import { combineReducers } from 'redux';
import auth from './AuthReducer';
import jobs from './JobReducer';
import likedJobs from './LikedJobReducer';

export default combineReducers({
    auth,
    jobs,
    likedJobs
});