import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ToastAndroid, Image, ActivityIndicator } from 'react-native';
import { auth } from './firebase';
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import * as SecureStore from 'expo-secure-store';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [rememberPassword, setRememberPassword] = useState(false);

    useEffect(() => {
        const tryAutoLogin = async () => {
            try {
                const storedEmail = await SecureStore.getItemAsync('email');
                const storedPassword = await SecureStore.getItemAsync('password');

                if (storedEmail && storedPassword) {
                    setEmail(storedEmail);
                    setPassword(storedPassword);
                    handleLogin();
                }
            } catch (error) {
                console.error('Error reading stored credentials:', error);
            }
        };

        tryAutoLogin();
    }, []);

    const handleLogin = () => {
        if (email.length === 0 || password.length === 0) {
            console.log('Please enter Email and Password');
            const value = "Please enter Email and Password";
            ToastAndroid.showWithGravityAndOffset(
                value,
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                25,
                50
            );
        } else {
            setLoading(true);
            signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    // User logged in successfully
                    console.log('Login Successful!');
                    const value = "Login Successful!";
                    ToastAndroid.showWithGravityAndOffset(
                        value,
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM,
                        25,
                        50
                    );

                    // Store the credentials if "Remember Me" is enabled
                    saveCredentials(email, password);

                    navigation.navigate('Homes'); // Redirect to the home screen or another screen
                })
                .catch(error => {
                    // Handle login errors (e.g., incorrect email or password)
                    if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                        const value = "Incorrect Email or Password";
                        ToastAndroid.showWithGravityAndOffset(
                            value,
                            ToastAndroid.LONG,
                            ToastAndroid.BOTTOM,
                            25,
                            50
                        );
                    }
                    if (error.code === 'auth/too-many-requests') {
                        const value = "Login disabled due to many attempts. Reset password or retry later.";
                        ToastAndroid.showWithGravityAndOffset(
                            value,
                            ToastAndroid.LONG,
                            ToastAndroid.BOTTOM,
                            50,
                            50
                        );
                    }
                })
                .finally(() => {
                    setLoading(false); // Hide loading indicator
                });
        }
    };
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleRememberPassword = () => {
        setRememberPassword(!rememberPassword);
    };

    const handleRegister = () => {
        navigation.navigate('Register');
    }

    const saveCredentials = async (email, password) => {
        try {
            await SecureStore.setItemAsync('email', email);
            await SecureStore.setItemAsync('password', password);
        } catch (error) {
            console.error('Error saving credentials:', error);
        }
    };


    const handleForgotPassword = () => {
        if (email.length === 0) {
            console.log('Please enter your email');
            const value = 'Please enter your email';
            ToastAndroid.showWithGravityAndOffset(
                value,
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                25,
                50
            );
        } else {
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    console.log('Password reset email sent successfully!');
                    const value = 'Password reset email sent successfully. Check your email for instructions.';
                    ToastAndroid.showWithGravityAndOffset(
                        value,
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM,
                        25,
                        50
                    );
                })
                .catch(error => {
                    console.error(error);
                    console.log('Failed to send password reset email.');
                    const value = 'Failed to send password reset email. Please try again later.';
                    ToastAndroid.showWithGravityAndOffset(
                        value,
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM,
                        25,
                        50
                    );
                });
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.wildlifeText}>My Cardio Med Care</Text>
            <View style={styles.frame1}>
                <View style={styles.fluentBatteryIcon} />
                <Text style={styles.loginTitle}>Login</Text>
                <Image source={require('./assets/logo.jpg')}
                    style={styles.bgLogo}
                />

                <View style={styles.form}>
                    <TextInput
                        style={styles.input}
                        placeholder="Email Address"
                        value={email}
                        onChangeText={text => setEmail(text)}
                    />
                    <View style={styles.passwordInput}>
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            secureTextEntry={!showPassword}
                            value={password}
                            onChangeText={text => setPassword(text)}
                        />
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
                    </View>
                    <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
                        {loading ? (
                            <ActivityIndicator size="small" color="#ffffff" />
                        ) : (
                            <Text style={styles.loginButtonText}>Login</Text>
                        )}
                    </TouchableOpacity>
                </View>
                <View style={styles.group18}>
                    <TouchableOpacity
                        style={styles.rememberPasswordCheckbox}
                        onPress={toggleRememberPassword}
                    >
                        {rememberPassword ? (
                            <Text style={styles.checkboxChecked}>✓</Text>
                        ) : (
                            <Text style={styles.checkboxUnchecked}>◻</Text>
                        )}
                    </TouchableOpacity>
                    <Text style={styles.rememberPasswordText}>Remember password</Text>
                </View>
                <TouchableOpacity onPress={handleForgotPassword} style={styles.forgetPassword}>
                    <Text style={styles.forgetPasswordText}>Forget password</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleRegister} style={styles.createAccount}>
                    <Text style={styles.createAccountText}>Don't have a account? Please register here.</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 430,
        height: 932,
        backgroundColor: '#FFFFFF',
        padding: 20,
    },
    wildlifeText: {
        top: 25,
        right: 25,
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    frame1: {
        width: 380,
        height: 932,
        backgroundColor: '#FFFFFF',
        shadowColor: 'rgba(4, 2, 104, 0.4)',
        shadowOffset: { width: 20, height: 20 },
        shadowRadius: 30,
        shadowOpacity: 0.5,
        top: 100,
        left: 5,
        position: 'absolute',
    },
    bgLogo: {
        width: 150,
        height: 150,
        top: 35,
        left: 110,
    },
    fluentBatteryIcon: {
        width: 33,
        height: 28,
        position: 'absolute',
        left: 320,
        top: 21,
    },
    loginTitle: {
        width: 284,
        height: 50,
        position: 'absolute',
        left: 45,
        fontWeight: '400',
        fontSize: 28,
        lineHeight: 34,
        textAlign: 'center',
        color: '#000000',
    },
    input: {
        top: 100,
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        borderColor: '#FF3939',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
        width: 300,
        left: 35,
    },
    loginButton: {
        top: 180,
        width: 300,
        left: 35,
        height: 45,
        backgroundColor: '#FD3940',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 20,
        lineHeight: 24,
    },
    group18: {
        width: 206,
        height: 22,
        position: 'absolute',
        left: 35,
        top: 360,
    },
    rememberPasswordCheckbox: {
        width: 20,
        height: 20,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#D5C5C5',
        top: 15,
        left: 5,
    },
    rememberPasswordText: {
        width: 176,
        height: 18,
        fontWeight: '400',
        fontSize: 15,
        lineHeight: 18,
        color: '#6B5E5E',
        left: 30,
    },
    forgetPassword: {
        width: 143,
        height: 18,
        position: 'absolute',
        left: 130,
        top: 333,
        fontWeight: '400',
        fontSize: 15,
        lineHeight: 18,
        color: '#1C4EFF',
    },
    forgetPasswordText: {
        width: 143,
        height: 18,
        fontWeight: '400',
        fontSize: 15,
        lineHeight: 18,
        color: '#1C4EFF',
        left: 95,
        top: 48,
        position: 'absolute',
    },
    createAccount: {
        width: 300,
        height: 50,
        position: 'absolute',
        left: 35,
        alignItems: 'center',
        top: 480,
        fontWeight: '400',
        fontSize: 15,
        lineHeight: 18,
        color: '#1C4EFF',
    },
    createAccountText: {
        width: 300,
        height: 50,
        alignItems: 'center',
        fontWeight: '400',
        fontSize: 15,
        lineHeight: 18,
        color: '#1C4EFF',
        // left: 25,
        top: 60,
        position: 'absolute',
    },
    passwordInput: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    eyeIcon: {
        position: 'absolute',
        right: 55,
        top: 110
    },
    eyeIconText: {
        fontSize: 20,
    },
    checkboxChecked: {
        fontSize: 17,
        bottom: 3,
        left: 2
    },
    checkboxUnchecked: {
        fontSize: 40,
    },
});
