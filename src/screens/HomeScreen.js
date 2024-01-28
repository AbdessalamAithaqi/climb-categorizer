import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';

SERVER_URL = "http://ec2-18-205-36-146.compute-1.amazonaws.com"
POST_ENDPOINT = "upload"
GET_ENDPOINT = "next"

const HomeScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  // Request permission
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const cameraRef = useRef(null);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 1, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);

      console.log("TOOK PIC")
      let response
      try {
        response = await (await fetch(`${SERVER_URL}/${POST_ENDPOINT}`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'image/jpeg'
          },
          body: data.base64
        })).json()
      }
      catch (e) {
        console.log(e)
      }

      console.log(response)

      // Handle the taken picture, you can send it to the server, save it locally, etc.
      token = response['token']
      colors = response['colors']
      console.log(token)
      console.log(colors)

      fetch(`${SERVER_URL}/${GET_ENDPOINT}?color=${colors[3]}&token=${token}`).then(
        async (data) => {
          data = await data.json()
          const img = data.image
          console.log(img)
        })

      // const images = colors.map(async color => {
      //   return color
      // })
      // console.log(images)
    }
  };

  return (
    <View style={styles.container}>
      <Camera ref={cameraRef} style={styles.camera} type={type}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              await takePicture();
              navigation.navigate('Result')
            }}
          >
            <Text style={styles.text}>Capture</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

const ImageDisplay = () => {
  const [base64Data, setBase64Data] = useState('');

  useEffect(() => {
    // Fetch or set your base64 data here
    const fetchedBase64Data = '...'; // Replace with your actual base64 data
    setBase64Data(fetchedBase64Data);
  }, []); // Run only once on component mount

  return (
    <div>
      <h1>Image Display</h1>
      {base64Data && (
        <img
          src={`data:image/jpeg;base64,${base64Data}`}
          alt="Base64 Image"
          style={{ maxWidth: '100%', maxHeight: '400px' }}
        />
      )}
    </div>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
    marginBottom: 60, // Increased bottom margin
    justifyContent: 'space-around',
    alignItems: 'flex-end',
  },
  button: {
    backgroundColor: 'orange',
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: 20,
    elevation: 2,  // Add shadow for Android (optional)
  },
  text: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default HomeScreen;
