import React, {useState} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './navigation/StackNavigator' 

//import Main from "./page/Main"
//import Loading from "./page/Loading"
//import TypePage from "./page/TypePage"

import {AppLoading} from 'expo';

import * as Font from "expo-font";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

import { StatusBar } from 'expo-status-bar';

export default function App() {

  const [isLoading,setIsLoading] = useState(true)

  const cacheFonts = fonts => fonts.map(font => Font.loadAsync(font));

  const funcStart = () => {
    console.log("시작")
    cacheFonts([Ionicons.font, FontAwesome.font]);
  }

  const funcError = () => {
    console.log("에러")
  }

  const funcFinish = () => {
    console.log("완료")
    setIsLoading(false)
  }

  return isLoading ? <AppLoading startAsync={funcStart} onError={funcError} onFinish={funcFinish} /> : (
    <NavigationContainer>
    <StatusBar style="black" />
    <StackNavigator/>
    </NavigationContainer>
    )
}