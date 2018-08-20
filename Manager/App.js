import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import Thunk from './src/middlewares/Thunk';
import Firebase from 'firebase';
import Router from './src/Routers';
import reducers from './src/reducers';
import { FIREBASE_CONFIGS } from './configs';

export default class App extends React.Component {
  componentWillMount() {
    Firebase.initializeApp(FIREBASE_CONFIGS);
  }

  render() {
    const store = applyMiddleware(Thunk)(createStore)(reducers);
    return (
      <Provider store={store}>
        <Router/>
      </Provider>
    );
  }
}
