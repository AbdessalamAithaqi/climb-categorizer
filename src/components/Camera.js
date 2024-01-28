import React, { useRef } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { RNCamera } from "react-native-camera";

const CameraPage = () => {
    const cameraRef = useRef(null);

    const takePicture = async () => {
        if (cameraRef.current) {
            const options = { quality: 0.5, base64: true };
            const data = await cameraRef.current.takePictureAsync(options);
            console.log(data.uri);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <RNCamera
                ref={cameraRef}
                style={{ flex: 1 }}
                type={RNCamera.Constants.Type.back}
                flashMode={RNCamera.Constants.FlashMode.auto}
            >
                <View
                    style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}
                >
                    <TouchableOpacity onPress={takePicture} style={{ marginBottom: 20 }}>
                        <Text style={{ fontSize: 20, marginBottom: 13, color: "white" }}>
                            Take Picture
                        </Text>
                    </TouchableOpacity>
                </View>
            </RNCamera>
        </View>
    );
};

export default CameraPage;