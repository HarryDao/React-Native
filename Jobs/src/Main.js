import React from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux';
import { Icon } from 'react-native-elements';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './stores';
import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import ReviewScreen from './screens/ReviewScreen';
import SettingsScreen from './screens/SettingsScreen';


class Main extends React.Component {
    render() {
        const MainNavigator = createBottomTabNavigator({
            welcome: WelcomeScreen,
            auth: AuthScreen,
            main: {
                screen: createBottomTabNavigator({
                    map: MapScreen,
                    deck: DeckScreen,
                    review: {
                        screen: createStackNavigator({
                            review: ReviewScreen,
                            settings: SettingsScreen,
                        }),
                        navigationOptions: {
                            tabBarLabel: 'Review Jobs',
                            tabBarIcon: ({ tintColor }) => {
                                return <Icon name='favorite' size={30} color={tintColor} />
                            }
                        }
                    }
                }, {
                    tabBarPosition: 'bottom',
                    tabBarOptions: {
                        labelStyle: { fontSize: 12 }
                    }
                })
            }
        }, {
            lazy: true,
            navigationOptions: {
                tabBarVisible: false
            }
        });

        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <MainNavigator/>
                </PersistGate>
            </Provider>
        );
    }
}

export default Main;