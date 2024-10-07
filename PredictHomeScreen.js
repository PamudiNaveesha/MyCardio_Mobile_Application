import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const PredictHomeScreen = ({ navigation }) => {

    const updateProfile = () => {
        navigation.navigate('Stress');
    };

    const handleWound = () => {
        navigation.navigate('Predict');
    };
    const handleUserForm = () => {
        navigation.navigate('UserForm');
    };
    const handleECG = () => {
        navigation.navigate('ECG');
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Predict Home Screen</Text>
            <TouchableOpacity style={styles.predictButton} onPress={updateProfile}>
                <Text style={styles.predictButtonText}>Stress Prediction</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.predictButton} onPress={handleUserForm}>
                <Text style={styles.predictButtonText}>Heart Disease Prediction</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.predictButton} onPress={handleWound}>
                <Text style={styles.predictButtonText}>Heart Wound Healing Stage Prediction</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.predictButton} onPress={handleECG}>
                <Text style={styles.predictButtonText}>ECG Prediction</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: '500',
        bottom: '25%'
    },
    predictButton: {
        backgroundColor: '#F81414',
        borderRadius: 5,
        paddingVertical: 10,
        alignItems: 'center',
        marginVertical: 20,
        width: '82%',
        bottom: '15%'
    },
    predictButtonText: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
    },
});

export default PredictHomeScreen;
