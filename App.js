import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AllPlaces from './src/screens/AllPlaces';
import AddPlace from './src/screens/AddPlace';
import {StatusBar} from 'react-native';
import IconButton from './src/components/UI/IconButton';
import { Colors } from './src/constants/colors';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <>
      <StatusBar barStyle={'dark-content'} />
      <NavigationContainer>
        <Stack.Navigator 
        screenOptions={{
          headerStyle:{backgroundColor: Colors.primary500},
          headerTintColor:Colors.gray700,
          contentStyle:{backgroundColor:Colors.gray700}
        }}>
          <Stack.Screen
            name="AllPlaces"
            component={AllPlaces}
            options={({navigation}) => ({
              title: 'Your Favorite Places',
              headerRight: ({tintColor}) => (
                <IconButton
                  icon={'add-outline'}
                  size={24}
                  color={tintColor}
                  onPress={() => navigation.navigate('AddPlace')}
                />
              ),
            })}
          />
          <Stack.Screen
            name="AddPlace"
            component={AddPlace}
            options={{
              title: 'Add a new place',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
