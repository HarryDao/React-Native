import React from 'react';
import { AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';
import _ from 'lodash';
import { FB_TOKEN_NAME } from '../actions/types';
import Slides from '../components/Slides';

const SLIDE_DATA = [
    { text: 'Welcome to JobApp', color: '#03A9F4' },
    { text: 'Use this to get job', color: '#009688' },
    { text: 'Set your location, then swipe away', color: '#03A9F4' }
];

class WelcomeScreen extends React.Component {
    state = { token: null };

    async componentDidMount() {
        try {
            await AsyncStorage.removeItem(FB_TOKEN_NAME);
            let token = await AsyncStorage.getItem(FB_TOKEN_NAME);

            if (token) {
                this.props.navigation.navigate('map');
            }

            this.setState({ token: token ? true: false });
        }
        catch(err) { console.error(err); }
    }

    onSlideComplete = () => {
        this.props.navigation.navigate('auth');
    }

    render() {
        if (_.isNull(this.state.token)) {
            return <AppLoading/>;
        }

        return (
            <Slides 
                data={SLIDE_DATA}
                onComplete={this.onSlideComplete}
            />
        );
    }
}


export default WelcomeScreen;