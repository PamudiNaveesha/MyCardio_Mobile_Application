import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Baseurl } from './components/baseUrl';

export default function App() {
    const [jobSatisfaction, setJobSatisfaction] = useState(null);
    const [sleepHours, setSleepHours] = useState(null);
    const [entryText, setEntryText] = useState('');
    const [loading, setLoading] = useState(false);

    const handleAddData = async () => {
        setLoading(true);
        const body = {
            text: entryText,
            sleep_hours: sleepHours,
            job_satisfaction: jobSatisfaction === 'yes' ? 1 : 0,
        };

        try {
            const response = await fetch(`${ Baseurl }/stressPredict`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            const result = await response.json();
            Alert.alert('Prediction Result', `Prediction: ${result.prediction}\nProbability: ${result.probability}`);
        } catch (error) {
            Alert.alert('Error', 'Failed to get prediction. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleClear = () => {
        setJobSatisfaction(null);
        setSleepHours(null);
        setEntryText('');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select Your Job Satisfaction</Text>
            <View style={styles.satisfactionContainer}>
                <TouchableOpacity
                    style={[styles.iconButton, jobSatisfaction === 'yes' && styles.selected]}
                    onPress={() => setJobSatisfaction('yes')}
                >
                    <Text style={styles.iconText}>😊</Text>
                    <Text style={styles.buttonText}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.iconButton, jobSatisfaction === 'no' && styles.selected]}
                    onPress={() => setJobSatisfaction('no')}
                >
                    <Text style={styles.iconText}>😞</Text>
                    <Text style={styles.buttonText}>No</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.title}>Select Your Sleep Hours</Text>
            <View style={styles.sleepHoursContainer}>
                {[5, 6, 7, 8, 9].map(hour => (
                    <TouchableOpacity
                        key={hour}
                        style={[styles.sleepButton, sleepHours === hour && styles.selected]}
                        onPress={() => setSleepHours(hour)}
                    >
                        <Text style={styles.buttonText}>{hour}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <Text style={styles.title}>Write Your Entry</Text>
            <TextInput
                style={styles.textInput}
                placeholder="Enter Text ..."
                placeholderTextColor="#aaa"
                value={entryText}
                onChangeText={setEntryText}
                multiline
            />

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.addButton} onPress={handleAddData} disabled={loading}>
                    {loading ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>PREDICT DATA</Text>
                    )}
                </TouchableOpacity>
                <TouchableOpacity style={styles.closeButton} onPress={handleClear}>
                    <Text style={styles.buttonText}>CLEAR</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F4F4',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    satisfactionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 20,
    },
    iconButton: {
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    iconText: {
        fontSize: 30,
    },
    sleepHoursContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 20,
    },
    sleepButton: {
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    textInput: {
        height: 100,
        width: '100%',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#ff0000',
        color: '#fff',
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    addButton: {
        backgroundColor: '#ff0000',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: '45%',
    },
    closeButton: {
        backgroundColor: '#00ff00',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: '45%',
    },
    buttonText: {
        color: '#000',
        fontWeight: 'bold',
    },
    selected: {
        borderColor: '#000',
        borderWidth: 2,
    },
});
