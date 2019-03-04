import React from 'react';
import { StyleSheet, Text, View, StatusBar, Switch, TouchableOpacity, Image } from 'react-native';
import { Camera, Permissions, ImageManipulator } from 'expo';
import FileService from '../store/fileservice';



export default class CameraScreen extends React.Component {

  state = {
    switchValue: false,
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    image: null
  };

  componentDidMount() {
    FileService.getSubject().subscribe(value => {
      console.log("Subscription got it", value);
   })
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  cameraChange = () => {
    this.setState({
      type:
        this.state.type === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back
    });
  };

 snap = async () => {
  if (this.camera) {
    let rawPhoto = await this.camera.takePictureAsync();
    let photo = await ImageManipulator.manipulateAsync(rawPhoto.uri, [
      {resize: {width: 256, height: 256}}
    ], {base64: true});
    this.setState({ image: photo });
    console.log('snapping photo');
  }
};

  getPrediction = () => {
    FileService.predictImage(this.state.image.base64);
}

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return (
        <View>
          <Text>No access to camera</Text>
        </View>
      );
    } else {

    return (

       <View style={styles.container}>
          <View style={styles.switchview}>
            <Text>Show camera</Text>
            <Switch
              onValueChange={value => {
                this.setState({ switchValue: value });
              }}
              value={this.state.switchValue}
              style={styles.switch}
            />
          </View>
          {this.state.switchValue ? (
            <View style={styles.cameraview}>

                <Camera
                  style={styles.camera}
                  type={this.state.type}
                  ref={ref => {
                    this.camera = ref;
                  }}
                >
                  <View style={styles.camerabuttonview}>
                    <TouchableOpacity
                      style={styles.cameraButtons}
                      onPress={this.cameraChange}
                    >
                      <Text
                        style={{
                          fontSize: 18,
                          marginBottom: 10,
                          color: "white"
                        }}
                      >
                        Flip
                      </Text>
                    </TouchableOpacity>
                  </View>
                </Camera>
            </View>
          ) : (
            <View style={styles.cameraview}>
              <Text>Camera off</Text>
            </View>
          )}
          {this.state.switchValue ? (
            <View style={styles.buttonsView}>
                <View style={styles.captureButtonView}>
                  <TouchableOpacity
                    style={styles.cameraButtons}
                    onPress={this.snap}
                  >
                    <Text
                      style={{ fontSize: 18, marginBottom: 10, color: "white" }}
                    >
                      Capture
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.captureButtonView}>
                  <TouchableOpacity
                    style={styles.cameraButtons}
                    onPress={this.getPrediction}
                    disabled={!this.state.image}
                  >
                    <Text
                      style={{ fontSize: 18, marginBottom: 10, color: "white" }}
                    >
                      Predict
                    </Text>
                  </TouchableOpacity>
                </View>
            </View>
          ) : null}
        </View>
    );
    }
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
  },
  buttonsView: {
    height: 200,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    marginRight: 110
  },
});