import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, RefreshControl, Alert, ActivityIndicator, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Baseurl } from './components/baseUrl';

const Predict = ({ navigation }) => {
    const [age, setAge] = useState('');
    const [sex, setSex] = useState('');
    const [sys, setSys] = useState('');
    const [dia, setDia] = useState('');
    const [week, setWeek] = useState('');
    const [cut, setCut] = useState('');
    const [blister, setBlister] = useState('');
    const [rub, setRub] = useState('');
    const [swollen, setSwollen] = useState('');
    const [round, setRound] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);


    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setAge('');
        setSys('');
        setDia('');
        setWeek('');

        setSex('');
        setCut('');
        setBlister('');
        setRub('');
        setSwollen('');
        setRound('');

        setRefreshing(false);
    }, []);

    const GetPredict = () => {
        if (
            age === '' ||
            sex === '' ||
            sys === '' ||
            dia === '' ||
            week === '' ||
            cut === '' ||
            blister === '' ||
            rub === '' ||
            swollen === '' ||
            round === ''
        ) {
            Alert.alert('Error', 'Please fill and select values for all dropdowns.');
        } else {
            setIsLoading(true);

            const requestBody = {
                "age": age,
                "sex": sex,
                "sysBP": sys,
                "diaBP": dia,
                "apro_weeks": week,
                "typeof_cut": cut,
                "are_there_blisters": blister,
                "do_you_rub_the_wound": rub,
                "is_it_swollen": swollen,
                "colour_around_the_wound": round
            };

            fetch(`${Baseurl}/wondHealPredict`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            })
                .then(response => {
                    // Handle response
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    setIsLoading(false);
                    Alert.alert('State of your wound', `Percentage of Heal: ${data.Precentage_of_heal}\nStage: ${data.stage}`);
                })
                .catch(error => {
                    console.error('Error:', error);
                    Alert.alert('Error', 'Failed to process. Please try again later.');
                    setIsLoading(false);
                });
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
        
            <View style={styles.container}>
                <Image
                    style={styles.homePic}
                    source={require('./assets/homeCover.jpg')}
                />
                <View style={styles.rectangle81}></View>
                <Text style={styles.predictText}>Get Predict for Your Wound</Text>
                <View style={styles.rectangle49}></View>

                <View style={styles.redBox}>
                    <Text style={styles.selectLocationText}>Select All Dropdowns and Enter all Value</Text>
                    <Text style={styles.question}> Age</Text>
                    <TextInput style={styles.textInput} 
                    keyboardType='number-pad'
                        placeholder='Enter your Age'
                        value={age}
                        onChangeText={(text) => setAge(text)}
                    />

                    <Text style={styles.question}>Sex</Text>
                    <Picker
                        selectedValue={sex}
                        style={styles.dropdown}
                        onValueChange={(itemValue, itemIndex) =>
                            setSex(itemValue)
                        }>
                        <Picker.Item label="Select One" value="" />
                        <Picker.Item label="Male" value="1" />
                        <Picker.Item label="Female" value="0" />
                    </Picker>

                    <Text style={styles.question}> SysBP</Text>
                    <TextInput style={styles.textInput}
                        keyboardType='number-pad'
                        placeholder='Enter SysBP'
                        value={sys}
                        onChangeText={(text) => setSys(text)}
                    />

                    <Text style={styles.question}> DiaBP</Text>
                    <TextInput style={styles.textInput}
                        keyboardType='number-pad'
                        placeholder='Enter DiaBP'
                        value={dia}
                        onChangeText={(text) => setDia(text)}
                    />

                    <Text style={styles.question}> Approximate Weeks </Text>
                    <TextInput style={styles.textInput}
                        keyboardType='number-pad'
                        placeholder='Enter Number of Weeks'
                        value={week}
                        onChangeText={(text) => setWeek(text)}
                    />
                    
                    <Text style={styles.question}>Type of Cut</Text>
                    <Picker
                        selectedValue={cut}
                        style={styles.dropdown}
                        onValueChange={(itemValue, itemIndex) =>
                            setCut(itemValue)
                        }>
                        <Picker.Item label="Select One" value="" />
                        <Picker.Item label="Double bypass surgery" value="1" />
                        <Picker.Item label="Traditional CABG" value="2" />
                        <Picker.Item label=" Triple bypass surgery" value="3" />
                        <Picker.Item label="Quintuple bypass surgery" value="4" />
                    </Picker>
                    <Text style={styles.question}>Are there Blister?</Text>
                    <Picker
                        selectedValue={blister}
                        style={styles.dropdown}
                        onValueChange={(itemValue, itemIndex) =>
                            setBlister(itemValue)
                        }>
                        <Picker.Item label="Select One" value="" />
                        <Picker.Item label="Yes" value="1" />
                        <Picker.Item label="No" value="0" />
                    </Picker>
                    <Text style={styles.question}>Do you rub the wound?</Text>
                    <Picker
                        selectedValue={rub}
                        style={styles.dropdown}
                        onValueChange={(itemValue, itemIndex) =>
                            setRub(itemValue)
                        }>
                        <Picker.Item label="Select One" value="" />
                        <Picker.Item label="Yes" value="1" />
                        <Picker.Item label="No" value="0" />
                    </Picker>
                    <Text style={styles.question}>Is it swollen?</Text>
                    <Picker
                        selectedValue={swollen}
                        style={styles.dropdown}
                        onValueChange={(itemValue, itemIndex) =>
                            setSwollen(itemValue)
                        }>
                        <Picker.Item label="Select One" value="" />
                        <Picker.Item label="Yes" value="1" />
                        <Picker.Item label="No" value="2" />
                    </Picker>
                    <Text style={styles.question}>Color round the wound</Text>
                    <Picker
                        selectedValue={round}
                        style={styles.dropdown}
                        onValueChange={(itemValue, itemIndex) =>
                            setRound(itemValue)
                        }>
                        <Picker.Item label="Select One" value="" />
                        <Picker.Item label="Yellow" value="1" />
                        <Picker.Item label="Red" value="2" />
                        <Picker.Item label="Brown" value="3" />
                        <Picker.Item label="Dark Red" value="4" />
                    </Picker>
                    
                </View>
                <TouchableOpacity style={styles.rectangle84} onPress={TentProcess}>
                    {isLoading ? (
                        <ActivityIndicator size="small" color="#ffffff" />
                    ) : (
                        <Text style={styles.processText}>Process</Text>
                    )}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.rectangle84} onPress={GetPredict}>
                        {isLoading && <ActivityIndicator size="large" color="#000" />}
                        <Text style={styles.processText}>Process</Text>
                    </TouchableOpacity>
                    <View style={styles.rectangle93}></View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
    },
    container: {
        position: 'relative',
        width: 'auto',
        height: 1350,
        backgroundColor: '#FFFFFF',
    },
    predictText: {
        position: 'absolute',
        width: 'auto',
        height: 24,
        left: '2.5%',
        top: '16%',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: 20,
        lineHeight: 24,
        textAlign: 'center',
        color: '#000000',
    },
    rectangle81: {
        position: 'absolute',
        width: 430,
        height: 165,
        left: 0,
        top: 0,
    },
    rectangle49: {
        position: 'absolute',
        width: 23,
        height: 23,
        left: 108,
        top: 887,
        backgroundColor: 'url(48)',
    },
    redBox: {
        position: 'absolute',
        width: '85%',
        height: 'auto',
        alignSelf: 'center',
        top: '20%',
        backgroundColor: '#FF3939',
        borderRadius: 10,
        padding: 20,
    },
    selectLocationText: {
        marginBottom: 10,
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 17,
        lineHeight: 19,
        textAlign: 'center',
        color: '#fff',
    },
    rectangle84: {
        position: 'absolute',
        width: 131,
        height: 37,
        left: '30%',
        top: 1290,
        backgroundColor: '#FF3939',
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 15,
    },
    processText: {
        position: 'absolute',
        width: 80,
        height: 24,
        left: '20%',
        top: '12%',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: 20,
        lineHeight: 24,
        textAlign: 'center',
        color: 'rgba(0, 0, 0, 0.89)',
    },
    rectangle93: {
        position: 'absolute',
        width: 10,
        height: 10,
        left: 368,
        top: 285,
        backgroundColor: 'url(Inputs (22))',
    },

    homePic: {
        position: 'absolute',
        width: '100%',
        height: '15%',
        left: 0,
        top: '0%',
    },
    question: {
        fontSize: 15,
        marginBottom: 12,
        color: '#FFFF',
    },
    dropdown: {
        height: 50,
        width: '100%',
        marginBottom: 20,
        backgroundColor: '#fafafa',
    },
    textInput: {
        backgroundColor:'#FFFF',
        height: 45,
        fontSize: 15,
        textAlign: 'auto',
        paddingHorizontal: 16,
    },
});

export default Predict;
