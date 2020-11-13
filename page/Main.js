import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View,ScrollView,Dimensions,TouchableOpacity,ImageBackground } from 'react-native';

import TypeCard from "../components/TypeCard";
//import data from "../data.json";

import {firebase_db} from "../firebaseConfig"
import Loading from "./Loading";

import {
  setTestDeviceIDAsync,
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded
} from 'expo-ads-admob';
import { BorderlessButton } from 'react-native-gesture-handler';

export default function Main({navigation}) {

  const [isLoading,setIsLoading] = useState(true);

  const [state,setState] = useState([])

  useEffect(()=>{
    console.log("나 실행되었다.")
    firebase_db.ref('/types').once('value').then((snapshot) => {
      console.log("파이어베이스에서 데이터 가져왔습니다!!")
      let types = snapshot.val();
    setState(types)
    setIsLoading(false)
    });
  },[])
  

  return isLoading ? <Loading/> : (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
       <Text style={styles.exText}>〔 MBTI types 〕</Text> 
      </View> 
        <ScrollView style={styles.subContainer}>
        <View>
          {state.map((data,i)=>{
            return <TypeCard key={i} 
                             idx={data.idx}
                             name={data.name} 
                             image={data.image} 
                             h_name={data.h_name}
                             navigation={navigation}/>
          })}
        </View>
      </ScrollView>
      {Platform.OS === 'ios' ? (
                <AdMobBanner
                  bannerSize="fullBanner"
                  servePersonalizedAds={true}
                  adUnitID="ca-app-pub-2462575935379358/7343373678"
                  style={styles.banner}
                />
            ) : (
                <AdMobBanner
                  bannerSize="fullBanner"
                  servePersonalizedAds={true}
                  adUnitID="ca-app-pub-2462575935379358/6085938806"
                  style={styles.banner}
                />
            )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titleContainer: {
    height: 30,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  exText:{
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333333'
  },
  subContainer:{
    flex: 1,
    marginBottom: 60,
  },
  banner: {
    position:"absolute",
    bottom:0,
    width:"100%"
  }
});