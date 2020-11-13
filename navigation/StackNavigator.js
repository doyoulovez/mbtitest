import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import TabNavigator from './TabNavigator';
import TypePage from '../page/TypePage';
import Couple from '../page/Couple';

const Stack = createStackNavigator();

const StackNavigator = () =>{
    return (
        <Stack.Navigator
            screenOptions={{
            headerStyle: {
                backgroundColor: "white",
                borderBottomColor: "white",
                shadowColor: "white",
                height: 70
            },
            headerTintColor: "#000",
            headerBackTitleVisible: false
            }}
            
        >
            <Stack.Screen name="TabNavigator" component={TabNavigator}/>
            <Stack.Screen name="TypePage" component={TypePage}/>
            <Stack.Screen name="Couple" component={Couple}/>
        </Stack.Navigator>
    )
}

export default StackNavigator;