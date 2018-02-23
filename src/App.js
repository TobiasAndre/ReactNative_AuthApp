import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';

import { Header, Button, Spinner } from './components/common';

import LoginForm from './components/LoginForm';


class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyApNkt8fHU8q5oqUWGU0Wcq9P4zudS_Y6o',
      authDomain: 'auth-49fbc.firebaseapp.com',
      databaseURL: 'https://auth-49fbc.firebaseio.com',
      projectId: 'auth-49fbc',
      storageBucket: 'auth-49fbc.appspot.com',
      messagingSenderId: '40321711524'
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
           <Button onPress={() => firebase.auth().signOut()}>
             Log Out
           </Button>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
    }
  }

  render() {
    return (
        <View>
          <Header headerText="Authentication" />
          {this.renderContent()}
        </View>
    );
  }
}

export default App;
