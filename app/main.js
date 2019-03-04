import React from 'react';
import { StyleSheet, Text, View, StatusBar,ScrollView, Switch, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo';
import { primaryStart, primaryEnd } from './utils/colors';
import Header from './components/header';
import CameraScreen from './components/camera';
import Chessboard from './components/chessboard'


const headerTitle = 'Nadimal Predicts Chess';

export default class Main extends React.Component {


  render() {

    return (
      <ScrollView>
      <LinearGradient
        colors={[primaryStart, primaryEnd]}
        style={styles.container}
      >
        <StatusBar barStyle="light-content" />
        <View style={styles.centered}>
          <Header title={headerTitle} />
        </View>
        <CameraScreen />
        <Chessboard />

      </LinearGradient>
      </ScrollView>
    );
    }
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "flex-start"
    },
      switchview: {
      marginTop: 50,
      backgroundColor: "white",
      padding: 10,
      alignItems: "center",
      borderRadius: 5,
      marginBottom: 5
    },
    switch: {
      padding: 5
    },
    cameraview: {
      height: 350,
      width: 350,
      backgroundColor: "white",
      borderRadius: 5,
      justifyContent: "center",
      alignItems: "center"
    },
    camera: {
      height: "95%",
      width: "95%",
      backgroundColor: "white",
      borderRadius: 5,
      justifyContent: "center",
      alignItems: "center"
    },
    camerabuttonview: {
      height: "100%",
      backgroundColor: "transparent"
    },
    cameraButtons: {
      borderColor: "#fff",
      borderWidth: 2,
      padding: 10,
      borderRadius: 5,
      margin: 5
    },
    captureButtonView: {
      height: 200,
      marginRight: 100
    },
    buttonsView: {
      height: 200,
      width: "100%",
      flexDirection: "row",
      justifyContent: "center"
    },
  });
  