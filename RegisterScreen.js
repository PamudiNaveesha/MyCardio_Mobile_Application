import React, { useState } from 'react';
import { Text, Image, TextInput, TouchableOpacity, StyleSheet, ToastAndroid, Button, ScrollView, ActivityIndicator } from 'react-native'; // Import ActivityIndicator
import { auth, db, app } from './firebase';
import { createUserWithEmailAndPassword, updateProfile, AuthErrorCodes } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getStorage } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import 'firebase/storage';

export default function SignupScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [Contact, setContact] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [imageUri, setImageUri] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // State for loading indicator

    const handleSignup = async () => {
        if (!email || !Contact || !username || !password || !confirmPassword) {
            const value = 'Please fill in all fields.';
            ToastAndroid.showWithGravityAndOffset(
                value,
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                25,
                50
            );
        } else if (password !== confirmPassword) {
            const value = 'Passwords do not match.';
            ToastAndroid.showWithGravityAndOffset(
                value,
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                25,
                50
            );
        } else {
            setIsLoading(true);
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                console.log('User registered successfully:', user.email);
                console.log('Signup Successful!');

                await updateProfile(auth.currentUser, { displayName: username });
                console.log('Username:', user.displayName);

                const userData = {
                    email: user.email,
                    contactNumber: Contact,
                };

                const docRef = doc(db, 'users', user.uid);

                const storage = getStorage(app);

                await setDoc(docRef, userData);

                if (imageUri) {
                    const storageRef = ref(storage, `user_images/${user.uid}.jpeg`);
                    const response = await fetch(imageUri);
                    const blob = await response.blob();
                    await uploadBytes(storageRef, blob);
                    // console.log('Image uploaded to Firebase Storage');
                } else {
                    console.log('Image URI is null');
                }

                const value = 'Signup Successful!';
                ToastAndroid.showWithGravityAndOffset(
                    value,
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );
                navigation.navigate('Login');

            } catch (error) {
                setIsLoading(false); // Hide loading indicator on error
                if (error.code === AuthErrorCodes.EMAIL_EXISTS) {
                    const value = 'Email is already in use. Please use a different email.';
                    ToastAndroid.showWithGravityAndOffset(
                        value,
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM,
                        25,
                        50
                    );
                } else {
                    console.log(error);
                    setErrorMessage('An error occurred during signup. Please try again later.');
                }
            }
            setIsLoading(false); // Hide loading indicator after signup attempt
        }
    };

    const handleLogin = () => {
        navigation.navigate('Login');
    };
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const togglePasswordVisibility1 = () => {
        setShowPassword1(!showPassword1);
    };

    const handleImageUpload = async () => {
        if (Constants.platform.android) {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need media library permissions to make this work!');
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });

            if (!result.canceled) {
                setImageUri(result.assets[0].uri);
            } else {
                console.log('Image selection canceled');
            }
        }
    };


    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Create an Account</Text>

            {imageUri ? (
                <Image source={{ uri: imageUri }} style={styles.image} />
            ) : (
                <Image source={require('./assets/users.png')} style={styles.image} />
            )}

            <TouchableOpacity onPress={handleImageUpload}>
                <Image source={require('./assets/camVector.png')} style={styles.camera} />
            </TouchableOpacity>

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={(text) => setUsername(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Contact Number"
                value={Contact}
                onChangeText={(Number) => setContact(Number)}
                keyboardType="number-pad"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry={!showPassword1}
                value={password}
                onChangeText={(text) => setPassword(text)}
            />

            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                secureTextEntry={!showPassword}
                value={confirmPassword}
                onChangeText={(text) => setConfirmPassword(text)}
            />
            <TouchableOpacity style={styles.eyeIcon1} onPress={togglePasswordVisibility1}>
                {showPassword1 ? (
                    <Image
                        source={require('./assets/eye.png')}
                        style={{ width: 24, height: 24 }}
                    />
                ) : (
                    <Image
                        source={require('./assets/hide.png')}
                        style={{ width: 24, height: 24 }}
                    />
                )}
            </TouchableOpacity>
            <TouchableOpacity style={styles.eyeIcon} onPress={togglePasswordVisibility}>
                {showPassword ? (
                    <Image
                        source={require('./assets/eye.png')}
                        style={{ width: 24, height: 24 }}
                    />
                ) : (
                    <Image
                        source={require('./assets/hide.png')}
                        style={{ width: 24, height: 24 }}
                    />
                )}
            </TouchableOpacity>
            <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
                <Text style={styles.signupButtonText}>Create Account</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginLink} onPress={handleLogin}>
                <Text style={styles.loginLinkText}>Already have an account? Login</Text>
            </TouchableOpacity>
            {<Text style={styles.errorMessage}>{errorMessage}</Text>}
            {isLoading && <ActivityIndicator size="large" color="#FF3939" />} 
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 430,
        height: 932,
        backgroundColor: '#ffff',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
        left: 70,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        left: 130,
        top: 30,
    },
    camera: {
        top: -70,
        left: 200,
    },
    input: {
        width: '80%',
        left: 20,
        height: 40,
        borderColor: '#FF3939',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 10,
        top: 30,
    },
    signupButton: {
        backgroundColor: '#FD3940',
        borderRadius: 5,
        paddingVertical: 15,
        width: '80%',
        left: 20,
        top: 20,
        alignItems: 'center',
        marginVertical: 20,
    },
    signupButtonText: {
        color: 'white',
        fontSize: 18,
    },
    loginLink: {
        left: 75,
        marginTop: 20,
    },
    loginLinkText: {
        color: 'blue',
    },
    errorMessage: {
        color: 'red',
        marginTop: 20,
    },
    RegisterLabel: {
        width: 100,
        height: 23,
        position: 'absolute',
        left: 220,
        top: 0,
        fontWeight: '400',
        fontSize: 20,
        lineHeight: 24,
        color: 'blue',
    },
    loginLabel: {
        width: 58,
        height: 23,
        position: 'absolute',
        left: 80,
        top: 0,
        fontWeight: '400',
        fontSize: 20,
        lineHeight: 24,
        color: 'gray',
    },
    eyeIcon: {
        position: 'absolute',
        right: 90,
        top: 500
    },
    eyeIcon1: {
        position: 'absolute',
        right: 90,
        top: 440
    },
    eyeIconText: {
        fontSize: 20,
    },
    eyeIconText1: {
        fontSize: 20,
    },
    wildlifeText: {
        top: 25,
        right: 25,
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center'
    },
});