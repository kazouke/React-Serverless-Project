/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { withAuthenticator } from 'aws-amplify-react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};


import { Auth } from 'aws-amplify'

class App extends React.Component {
  state = {
    username: '',
    password: '',
    phone_number: '',
    email: '',
    authCode: '',
    user: {}
  }
  async signUp() {
    const { username, password, email, phone_number } = this.state
    await Auth.signUp({
      username,
      password,
      attributes: { email, phone_number }
    })
    console.log('sign up successful!')
  }
  async confirmSignUp() {
    const { username, authCode } = this.state
    await Auth.configSignignUp(username, authCode)
    console.log('confirm sign up successful!')
  }
  async signIn() {
    const { username, password  } = this.state
    const user = await Auth.signIn(username, password)
    this.setState({ user })
    console.log('sign in successful!')
  }
  async confirmSignIn() {
    const { user, authCode } = this.state
    await Auth.configSignignIn(user, authCode)
    console.log('user now successfully signed in to the app!!')
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}

export default withAuthenticator(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});


