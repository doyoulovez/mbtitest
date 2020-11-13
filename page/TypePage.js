import React, {useState, useEffect} from 'react';
import { StyleSheet,Text,View,ScrollView,Dimensions,TouchableOpacity,Image,Alert } from 'react-native';

import { firebase_db } from '../firebaseConfig';

import Loading from "./Loading";
import Constants from 'expo-constants';

import {
  setTestDeviceIDAsync,
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded
} from 'expo-ads-admob';

const TypePage = ({navigation,route}) => {

  const [isLoading, setIsLoading] = useState(true)

  const [typeState, setTypeState] = useState({})

  const [idx, setIdx] = useState(route.params.idx);
          if (idx !== route.params.idx) {
            setIsLoading(true);
            setIdx(route.params.idx);
          }
    
    useEffect(()=>{
        navigation.setOptions({
            title: '유형별 특징'
        })

        const { idx } = route.params;
        firebase_db.ref('/types/'+idx).once('value').then((snapshot)=>{
          let types = snapshot.val();
          setTypeState(types)
          setIsLoading(false)
        });
    },[idx])

    const goResult = (typeState) => {

      const new_likes = {
          
          idx:typeState.idx,
          name:typeState.name,
          h_name:typeState.h_name,
          image:typeState.image,
          charicter:typeState.charicter,
  
      }

      const user_id = Constants.installationId;
      console.log(new_likes)
      console.log(user_id)

      
      firebase_db.ref('/likes/'+user_id+'/'+ typeState.idx).set(new_likes,function(error){
          console.log(error)
          if(error == null){
              Alert.alert("저장 완료!")
              }});
      
  }

  const AddAd = async () => {
    Platform.OS === 'ios' 
       ? await AdMobInterstitial.setAdUnitID("ca-app-pub-2462575935379358/1081217650") 
       : await AdMobInterstitial.setAdUnitID("ca-app-pub-2462575935379358/9151279363")
       await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true});
       await AdMobInterstitial.showAdAsync();
       AdMobInterstitial.addEventListener("interstitialDidClose", () => {
           console.log("interstitialDidClose")
           navigation.navigate("Couple",{
            idx: typeState.idx})
       });
  }

  console.log("건네받은 데이터: " + idx)


  return isLoading ? <Loading/> : (
    <View style={styles.container}>
        <View style={styles.typeContainer}>
            <Image source={{uri:typeState.image}}
                resizeMode="cover" 
                style={styles.imageBox}/>
            <View style={styles.textContainer}>
                <Text style={styles.textStyle}>{typeState.name}</Text>
                <Text style={styles.textStyle2}>{typeState.h_name}</Text>
            </View>
            <View style={styles.chaContainer}>
            <ScrollView>
              <Text style={styles.chaTextStyle}>{typeState.charicter}</Text>      
            </ScrollView>
            </View>
        </View>
        <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={()=> AddAd()}
                              style={styles.buttonStyle}>
                <Text style={styles.buttonText}>{typeState.name}과 환상의 짝꿍은?</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>goResult(typeState)}
                              style={styles.goMainStyle}>
                <Text style={styles.goMainText}>저장하기</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default TypePage;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  typeContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    marginTop: 30
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "center"
  },
  imageBox: {
    width: 130,
    height: 130,
  },
  textContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 20,
  },
  textStyle: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  textStyle2: {
    fontSize: 18
  },
  chaContainer: {
    backgroundColor: "#f3f3f3",
    borderRadius: 10,
    marginLeft: 15,
    marginRight: 15,
    padding: 18,
    height: 260
  },
  chaTextStyle: {
    color: '#333333',
    fontSize: 14,
    lineHeight: 20
  },
  buttonContainer: {
    height: 80,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 30,
    paddingBottom: 40
  },
  buttonStyle:{
    width: 200,
    height: 40,
    backgroundColor: "#99caff",
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "bold",
    color: 'white'
  },
  goMainStyle: {
    width: 100,
    height: 40,
    backgroundColor: "#fff",
    borderColor: '#99caff',
    borderWidth: 1,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  goMainText: {
    fontSize: 15,
    color: '#333333'
  }
});