import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Modal, ScrollView, TouchableHighlight } from 'react-native';
import { BackHandler } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { auth } from './firebase';
import ConfirmationDialog from './ConfirmationDialog';

const SupportDetailsModal = ({ isVisible, onClose }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>About Us</Text>
                    <ScrollView contentContainerStyle={styles.modalTextContainer}>
                        <Text style={styles.modalText}>
                            Welcome to [MyCardio MedCare] – your companion in postoperative care. 
                            We're dedicated to supporting heart bypass patients on their journey to recovery. 
                            With predictive analytics and personalized insights, 
                            we're here to help you monitor surgical wound healing with ease and confidence. 
                            Join us and experience peace of mind in your recovery process.
                        </Text>
                    </ScrollView>
                    <TouchableHighlight style={styles.modalCloseButton} onPress={onClose}>
                        <Text style={styles.modalCloseButtonText}>Close</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </Modal>
    );
};

const HomeScreen = ({ navigation }) => {
    const [username, setUsername] = useState(null);
    const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
    const [showSupportDetails, setShowSupportDetails] = useState(false);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            console.log('HomeScreen focused, refreshing data...');

            const user = getAuth().currentUser;

            if (user) {
                setUsername(user.displayName);
            }

            const backAction = () => {
                if (navigation.isFocused()) {
                    BackHandler.exitApp();
                    return true;
                }
                return false;
            };

            const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
        });

        return unsubscribe;
    }, [navigation]);


    const handleButtonPress = () => {
        navigation.navigate('PredictHome');
    };

    const handleProfileButtonPress = () => {
        navigation.navigate('Profile');
        // navigation.navigate('UserForm');
    };

    const handleAboutUsButtonPress = () => {
        setShowSupportDetails(true);
    };
    const handleSupportDetailsClose = () => {
        setShowSupportDetails(false);
    };

    const handleLogoutButtonPress = () => {
        setShowConfirmationDialog(true);
    };


    const handleLogoutCancelled = () => {
        setShowConfirmationDialog(false);
    };

    const handleLogoutConfirmed = () => {
        setShowConfirmationDialog(false);
        signOut(auth)
            .then(() => {
                navigation.navigate('Login');
            })
            .catch((error) => {
                console.error('Error logging out:', error);
            });
    };

    

    return (
        <View style={styles.container}>
            <View style={styles.rectangle25}>
                <Image
                    style={styles.homePic}
                    source={require('./assets/homeCover.jpg')}
                />
            </View>
            <Text style={styles.welcomeText}>Hi {username},</Text>
            <Text style={styles.welcomeText}>Welcome to MyCardio MedCare!</Text>

            <TouchableOpacity
                style={styles.button}
                onPress={handleProfileButtonPress}
            >
                <Image source={require('./assets/profile.png')} style={styles.vectorIcon} />
                <Text style={styles.buttonText}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.buttonPredict}
                onPress={handleButtonPress}
            >
                <Image source={require('./assets/p.png')} style={styles.vectorIcon} />
                <Text style={styles.buttonTextPredict}>Get Predict</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.buttonAbout}
                onPress={handleAboutUsButtonPress}
            >
                <Image source={require('./assets/aboutUs.png')} style={styles.vectorIconUs} />
                <Text style={styles.buttonTextPredict}>About Us</Text>
            </TouchableOpacity>
            <SupportDetailsModal
                isVisible={showSupportDetails}
                onClose={handleSupportDetailsClose}
            />
            <TouchableOpacity
                style={styles.buttonLogout}
                onPress={handleLogoutButtonPress}
            >
                <Image source={require('./assets/logout.png')} style={styles.vectorIcon} />
                <Text style={styles.buttonTextPredict}>Logout</Text>
            </TouchableOpacity>

            <ConfirmationDialog
                isVisible={showConfirmationDialog}
                message="Are you sure you want to logout?"
                onCancel={handleLogoutCancelled}
                onConfirm={handleLogoutConfirmed}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderTopColor: '#FF3939',
        borderTopWidth: 50,
        width: 'auto',
        height: '100%'
    },
    homePic: {
        position: 'relative',
        width: 430,
        height: 337,
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button: {
        position: 'absolute',
        width: 150,
        height: 80,
        left: 20,
        top: 480,
        backgroundColor: '#FF3939',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#F81414',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 6,
        elevation: 6,
    },

    buttonPredict: {
        position: 'absolute',
        width: 150,
        height: 80,
        left: 210,
        top: 480,
        backgroundColor: '#FF3939',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#F81414',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 6,
        elevation: 6,
    },
    buttonAbout: {
        position: 'absolute',
        width: 150,
        height: 80,
        left: 20,
        top: 580,
        backgroundColor: '#FF3939',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#F81414',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 6,
        elevation: 6,
    },
    buttonLogout: {
        position: 'absolute',
        width: 150,
        height: 80,
        left: 210,
        top: 580,
        backgroundColor: '#FF3939',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#F81414',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 6,
        elevation: 6,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonTextPredict: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        left: 5,
    },
    vectorIcon: {
        position: 'absolute',
        left: 10,
        top: 10,
        width: 25,
        height: 25,
    },
    vectorIconUs: {
        position: 'absolute',
        left: 5,
        top: 5,
        width: 40,
        height: 40,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 350,
        borderRadius: 40,
    },
    modalContent: {
        backgroundColor: "rgba(255, 134, 145, 1)",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 10,
        color: "black",
    },
    modalTextContainer: {
        paddingBottom: 40,
    },
    modalText: {
        fontSize: 20,
        marginBottom: 10,
        color: '#000',
        fontWeight: '600',
    },
    modalCloseButton: {
        height: 40,
        borderColor: '#FF3939',
        backgroundColor: '#FF3939',
        borderWidth: 2,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    modalCloseButtonText: {
        color: "white",
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default HomeScreen;
