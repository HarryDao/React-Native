import axios from 'axios';
import reverseGeocode from 'latlng-to-zip';
import qs from 'qs';

import {
    FETCH_JOBS,
    LIKE_JOB,
    CLEAR_LIKED_JOBS,
} from './types';
import MOCK_DATA from './MockData.json';

const JOB_ROOT_URL = 'http://api/indeed.com/ads/apisearch';
const JOB_QUERY_PARAMS = {
    publisher: '', //input the indeed id here
    format: 'json',
    v: '2',
    latlong: 1,
    q: 'developer'
}

const buildJobsUrl = (zip) => {
    const query = qs.stringify({ ...JOB_QUERY_PARAMS, l: zip });
    return `${JOB_ROOT_URL}${query}`;
}

export const fetchJobs = (region, cb) => async dispatch => {
    try {

        // // Uncomment below if having valid Indeed account

        // let zip =  await reverseGeocode(region);
        // const url = buildJobsUrl(zip);
        // let { data } = await axios.get(url);
        // dispatch({ type: FETCH_JOBS, payload: data });

        // // Comment out below if having valid Indeed account
        dispatch({ type: FETCH_JOBS, payload: MOCK_DATA });

        return cb();
    }
    catch(err) {
        console.error(err);
    }
}   

export const likeJob = (job) => {
    return {
        type: LIKE_JOB,
        payload: job
    }
}

export const clearLikedJobs = () => {
    return { type: CLEAR_LIKED_JOBS }
}