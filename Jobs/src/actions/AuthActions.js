import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';
import {
    FB_TOKEN_NAME,
    FACEBOOK_LOGIN_SUCCESS,
    FACEBOOK_LOGIN_FAIL,
} from './types';
import { FACEBOOK_APP_ID } from '../../configs';


export const facebookLogin = () => async dispatch => {
    try {
        // await AsyncStorage.removeItem(FB_TOKEN_NAME);
        let token = await AsyncStorage.getItem(FB_TOKEN_NAME);

        if (token) {
            return dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
        }   
    
        await doFacebookLogin(dispatch);
    }
    catch(err) {

    }
}


const doFacebookLogin = async (dispatch) => {
    let { type, token } = await Facebook.logInWithReadPermissionsAsync(FACEBOOK_APP_ID, {
        permissions: ['public_profile'],
    });
    
    if (type === 'cancel') {
        return dispatch({ type: FACEBOOK_LOGIN_FAIL });
    }

    await AsyncStorage.setItem(FB_TOKEN_NAME, token);
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
}