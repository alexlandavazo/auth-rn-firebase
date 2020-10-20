import React, {Component} from 'react';
import {View} from 'react-native';
import firebase from 'firebase';
import {Button, Card, CardSection, Header, Spinner} from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  state = {
    loggedIn: null,
  };
  componentDidMount() {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: 'AIzaSyDsmdXUmaRFuQWL1nN4M-YbRwY1oYSffKo',
        authDomain: 'rn-authentication-efe33.firebaseapp.com',
        databaseURL: 'https://rn-authentication-efe33.firebaseio.com',
        projectId: 'rn-authentication-efe33',
        storageBucket: 'rn-authentication-efe33.appspot.com',
        messagingSenderId: '972699987940',
        appId: '1:972699987940:web:13b46c02b8c57a69df61f1',
        measurementId: 'G-HVMQBPGM74',
      });
    }
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({loggedIn: true});
      } else {
        this.setState({loggedIn: false});
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <Card>
            <CardSection>
              <Button onPress={() => firebase.auth().signOut()}>Log Out</Button>
            </CardSection>
          </Card>
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
        <Header title="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
