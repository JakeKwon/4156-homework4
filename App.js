import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase';
import firebaseConfig from './config.js';


const firebaseApp = firebase.initializeApp(firebaseConfig);
var database = firebaseApp.database()

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      count: 0,
    }
    this.onPress = this.onPress.bind(this)

    firebase.database().ref('/counter').once('value').then(snapshot =>
      this.setState({
        count: snapshot.val().count
      })
    );
  }

  onPress() {
    var nextCount = this.state.count + 1
    this.setState({
      count: nextCount,
    })
    firebase.database().ref('counter').set({
      count: nextCount,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.count}</Text>
        <Button
          onPress={this.onPress}
          title="Increment"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
