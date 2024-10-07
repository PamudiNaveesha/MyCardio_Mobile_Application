import { Image } from 'react-native';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import Predict from './Predict';
import UserForm from './UserForm';
import ECGScreen from './ECGScreen';
import StressPredict from './StressPredict';
import MyComponent from './MyComponent';
import PredictHomeScreen from './PredictHomeScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SplashScreen from './SplashScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  const HomeTabNavigator = () => (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#FF3939',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={() => ({
          tabBarIcon: () => (
            <Image
              source={require('./assets/HomeBlack.png')}
              style={{ width: 35, height: 35 }}
            />
          ),
          headerShown: false,
          headerLeft: null,
        })}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={() => ({
          tabBarIcon: () => (
            <Image
              source={require('./assets/profile.png')}
              style={{ width: 25, height: 25 }}
            />
          ),
          headerShown: false,
          headerLeft: null,
        })}
      />

      <Tab.Screen
        name="PredictHome"
        component={PredictHomeScreen}
        options={() => ({
          tabBarIcon: () => (
            <Image
              source={require('./assets/predict.png')}
              style={{ width: 25, height: 25 }}
            />
          ),
          title: 'Get Predictions', headerTitleAlign: 'center', headerTintColor: '#ffff', headerStyle: { backgroundColor: '#FF3939' }
        })}
        
      />
    </Tab.Navigator>
  );


  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Splash" component={SplashScreen}
          options={() => ({
            headerShown: false,
            headerLeft: null,
          })} />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={() => ({
            headerShown: false,
            headerLeft: null,
          })}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={() => ({
            headerShown: false,
            headerLeft: null,
          })}
        />
        <Stack.Screen
          name="UserForm"
          component={UserForm}
          options={{ title: 'Heart Disease Prediction', headerTitleAlign: 'center', headerTintColor: '#ffff', headerStyle: { backgroundColor: '#FF3939' } }}
        />
        <Stack.Screen
          name="MyComp"
          component={MyComponent}
          options={() => ({
            headerShown: false,
            headerLeft: null,
          })}
        />
        <Stack.Screen
          name="Stress"
          component={StressPredict}
          options={{ title: 'Stress Prediction', headerTitleAlign: 'center', headerTintColor: '#ffff', headerStyle: { backgroundColor: '#FF3939' } }}
        />
        <Stack.Screen
          name="Predict"
          component={Predict}
          options={{ title: 'Wound Healing Stage Predictions', headerTitleAlign: 'center', headerTintColor: '#ffff', headerStyle: { backgroundColor: '#FF3939' } }}
        />
        <Stack.Screen
          name="ECG"
          component={ECGScreen}
          options={() => ({
            headerShown: false,
            headerLeft: null, // Remove the back button
          })}
        />

        <Stack.Screen
          name="Homes"
          component={HomeTabNavigator}
          options={() => ({
            headerShown: false,
            headerLeft: null, // Remove the back button
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;