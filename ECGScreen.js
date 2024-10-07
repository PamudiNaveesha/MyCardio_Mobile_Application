import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Image, Alert, ActivityIndicator } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Button from "./components/Button";
import ImageViewer from "./components/ImageViewer";
import Header from "./components/Header";
import axios from "axios";
import { Baseurl } from './components/baseUrl';

const PlaceholderImage = require("./assets/images/sample ecg 3.jpg");

export default function App() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: false,
            quality: 1,
        });

        console.log("Image Picker Result:", result);

        if (!result.canceled && result.assets.length > 0) {
            const selectedImageUri = result.assets[0].uri;
            console.log("Selected Image URI:", selectedImageUri);

            setSelectedImage(selectedImageUri);
        } else {
            alert("You did not select any image.");
        }
    };

    const submitImage = async () => {
        console.log("1");
        if (selectedImage) {
            setLoading(true);
            try {
                const formData = new FormData();
                formData.append("file", {
                    uri: selectedImage,
                    name: "image.jpg",
                    type: "image/jpeg",
                });
                const response = await axios.post(`${Baseurl}/ecgPredict`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                if (response.status === 200) {
                    const data = response.data;
                    alert("Prediction: " + data.prediction);
                } else {
                    alert("Failed to get prediction from server.");
                }
            } catch (error) {
                if (error.response) {
                    console.error("Server responded with error:", error.response.data);
                    alert("Server responded with error: " + error.response.data);
                } else if (error.request) {
                    console.error("No response received from server:", error.request);
                    alert("No response received from server.");
                } else {
                    console.error("Error setting up request:", error.message);
                    alert("Error setting up request: " + error.message);
                }
            } finally {
                setLoading(false);
            }
        } else {
            alert("Please choose an image first.");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Header title="ECG Classifier" />
            </View>
            <View style={styles.imageContainer}>
                <ImageViewer
                    placeholderImageSource={PlaceholderImage}
                    selectedImage={selectedImage}
                />
            </View>
            <View style={styles.footerContainer}>
                <Button
                    theme="primary"
                    label="Choose a ECG Image"
                    onPress={pickImageAsync}
                />
                <Button label="Predict" onPress={submitImage} />
                {loading && <ActivityIndicator size="large" color="#F81414" />}
            </View>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    imageContainer: {
        flex: 1,
        paddingTop: 60,
        alignItems: "center",
    },
    image: {
        width: 320,
        height: 440,
        borderRadius: 18,
        alignItems: "center",
    },
    footerContainer: {
        paddingBottom: 60,
        alignItems: "center",
    },
});
