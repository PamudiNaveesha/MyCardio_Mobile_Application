import React, { useState } from 'react';
import { StatusBar, StyleSheet, View, TextInput, Text, Pressable, Alert, ActivityIndicator } from 'react-native';
import { ref, set } from "firebase/database";
// import { db } from './config';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { Baseurl } from './components/baseUrl';

export default function App() {
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [cp, setCp] = useState("");
  const [trestbps, setTrestbps] = useState("");
  const [chol, setChol] = useState("");
  const [restecg, setRestecg] = useState("");
  const [thalach, setThalach] = useState("");
  const [thal, setThal] = useState("");
  const [predictionResult, setPredictionResult] = useState("");
  const [loading, setLoading] = useState(false);

  function create() {
    // try {
    //   const databaseRef = ref(db, 'users/');
    //   set(databaseRef, {
    //     age: age !== "" ? parseInt(age) : 0,
    //     sex: sex !== "" ? parseInt(sex) : 0,
    //     cp: cp !== "" ? parseInt(cp) : 0,
    //     trestbps: trestbps !== "" ? parseInt(trestbps) : 0,
    //     chol: chol !== "" ? parseInt(chol) : 0,
    //     restecg: restecg !== "" ? parseInt(restecg) : 0,
    //     thalach: thalach !== "" ? parseInt(thalach) : 0,
    //     thal: thal !== "" ? parseInt(thal) : 0,
    //   }).then(() => {
    //     alert('Your Data updated successfully');
    //   }).catch((error) => {
    //     console.error('Error writing data:', error);
    //     alert('Failed to update data. Please check the console for details.');
    //   });
    // } catch (error) {
    //   console.error('Error:', error);
    //   alert('Failed to update data');
    // }
  }

  async function predict() {
    try {
      setLoading(true);
      const response = await axios.post(`${Baseurl}/heartPredict`, {
        age: age !== "" ? parseInt(age) : 0,
        sex: sex !== "" ? parseInt(sex) : 0,
        cp: cp !== "" ? parseInt(cp) : 0,
        trestbps: trestbps !== "" ? parseInt(trestbps) : 0,
        chol: chol !== "" ? parseInt(chol) : 0,
        restecg: restecg !== "" ? parseInt(restecg) : 0,
        thalach: thalach !== "" ? parseInt(thalach) : 0,
        thal: thal !== "" ? parseInt(thal) : 0,
      });
      console.log('Prediction response:', response.data);
      const prediction = response.data.prediction_text;
      if (prediction.includes("Heart problem")) {
        Alert.alert('Prediction Result', "Patient has heart disease risk detected. Please consult a doctor.");
      } else {
        Alert.alert('Prediction Result', "Heart disease risk not detected. You're doing good!");
      }
    } catch (error) {
      console.error('Prediction failed:', error.response ? error.response.data : error.message);
      Alert.alert('Failed to make prediction', 'Please check the console for details.');
    } finally {
      setLoading(false);
    }
  }

  function clearDetails() {
    Alert.alert(
      "Clear Data",
      "Are you sure you want to clear all data?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => {
            setAge("");
            setSex("");
            setCp("");
            setTrestbps("");
            setChol("");
            setRestecg("");
            setThalach("");
            setThal("");
          }
        }
      ]
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Patient Information</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Age</Text>
        <TextInput
          style={styles.input}
          onChangeText={setAge}
          value={age}
          placeholder="Enter Your Age"
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Sex</Text>
        <View style={styles.pickerContainer}>
          <Picker
            style={styles.input}
            selectedValue={sex}
            onValueChange={(itemValue) => setSex(itemValue)}
          >
            <Picker.Item label="Female" value="0" />
            <Picker.Item label="Male" value="1" />
          </Picker>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Chest Pain Type</Text>
        <View style={styles.pickerContainer}>
          <Picker
            style={styles.input}
            selectedValue={cp}
            onValueChange={(itemValue) => setCp(itemValue)}
          >
            <Picker.Item label="Typical angina" value="0" />
            <Picker.Item label="Atypical angina" value="1" />
            <Picker.Item label="Non-anginal pain" value="2" />
            <Picker.Item label="Asymptomatic" value="3" />
          </Picker>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Resting Blood Pressure</Text>
        <TextInput
          style={styles.input}
          onChangeText={setTrestbps}
          value={trestbps}
          placeholder="Enter Resting BP in mmHg"
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Cholesterol</Text>
        <TextInput
          style={styles.input}
          onChangeText={setChol}
          value={chol}
          placeholder="Enter Cholesterol in mg/dl"
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Resting ECG</Text>
        <View style={styles.pickerContainer}>
          <Picker
            style={styles.input}
            selectedValue={restecg}
            onValueChange={(itemValue) => setRestecg(itemValue)}
          >
            <Picker.Item label="Nothing to note" value="0" />
            <Picker.Item label="ST-T Wave abnormality" value="1" />
            <Picker.Item label="Possible" value="2" />
          </Picker>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Maximum Heart Rate</Text>
        <TextInput
          style={styles.input}
          onChangeText={setThalach}
          value={thalach}
          placeholder="Enter maximum heart rate"
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Thalium stress result</Text>
        <View style={styles.pickerContainer}>
          <Picker
            style={styles.input}
            selectedValue={thal}
            onValueChange={(itemValue) => setThal(itemValue)}
          >
            <Picker.Item label="Normal" value="1" />
            <Picker.Item label="Fixed defect" value="2" />
            <Picker.Item label="Reversible defect" value="3" />
          </Picker>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.saveButton} onPress={create}>
          <Text style={styles.saveButtonText}>SAVE</Text>
        </Pressable>
        <Pressable style={styles.predictButton} onPress={predict} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.predictButtonText}>Predict</Text>
          )}
        </Pressable>
        <Pressable style={styles.clearButton} onPress={clearDetails}>
          <Text style={styles.clearButtonText}>CLEAR</Text>
        </Pressable>
      </View>
      <StatusBar style="auto" />
      {predictionResult ? <Text style={styles.predictionResult}>{predictionResult}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    width: 120,
    marginRight: 5,
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    flex: 1,
    height: 30,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  pickerContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    height: 30,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 6,
  },
  predictButton: {
    backgroundColor: '#FF3131',
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 8,
    elevation: 2,
  },
  predictButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  saveButton: {
    backgroundColor: '#008CBA',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
    elevation: 2,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  title: {
    color: '#888',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    top: 5,
    left: 0.01,
  },
  predictionResult: {
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
  },
  clearButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
    elevation: 2,
  },
});
