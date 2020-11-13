import React from 'react';
import { StyleSheet, Text, View,ScrollView,Dimensions,TouchableOpacity,Image } from 'react-native';

import {
  setTestDeviceIDAsync,
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded
} from 'expo-ads-admob';

const TypeCard = ({idx,name,image,h_name,navigation}) => {

  const AddAd = async () => {
    Platform.OS === 'ios' 
       ? await AdMobInterstitial.setAdUnitID("ca-app-pub-2462575935379358/1081217650") 
       : await AdMobInterstitial.setAdUnitID("ca-app-pub-2462575935379358/9151279363")
       await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true});
       await AdMobInterstitial.showAdAsync();
       AdMobInterstitial.addEventListener("interstitialDidClose", () => {
           console.log("interstitialDidClose")
           navigation.navigate("Couple",{
            idx: idx})
       });
  }

return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.viewContainer}>
          <View style={styles.typeBox}>
            <View style={styles.imageBox}>
              <Image source={{uri:image}} 
                     resizeMode="cover" 
                     style={styles.scrollList} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.scrollListHighlight}>{name}</Text>
              <Text style={styles.scrollListHighlight2}>{h_name}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={()=> navigation.navigate("TypePage",{
                                  idx: idx})}
                                  style={styles.button1}>
                  <Text style={styles.buttonText}>유형별 특징</Text>                                    
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> AddAd()}
                                  style={styles.button1}>
                  <Text style={styles.buttonText}>환상의 짝꿍</Text>                                    
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
export default TypeCard;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  viewContainer: {
    flex: 1,
    alignItems: "center",
  },
  typeBox: {
    flex: 1,
    flexDirection: "row",
    width: Dimensions.get("window").width/1.17,
    height: 120,
    backgroundColor: '#fff',
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
    borderColor: "lightgray",
    borderWidth: 0.5,
    borderRadius: 10,
    padding: 15,
    paddingTop: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 2,  
    elevation: 5
  },
  imageBox: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center"
  },
  scrollList: {
    width:85,
    height:85,
  },
    textContainer: {
    flex: 2.1,
    marginLeft: 10,
  },
  scrollListHighlight : {
    fontSize: 22,
    textAlign:'left',
    color:'#333333',
    fontWeight:'bold',
  },
  scrollListHighlight2 : {
    fontSize: 15,
    textAlign:'left',
    color:'#000',
    fontWeight:'normal',
  },
  buttonContainer:{
    flex:1,
    flexDirection: "row",
    justifyContent: 'space-between',
    marginTop: 10
  },
  button1: {
    width: Dimensions.get("window").width/4.15,
    height: 28,
    backgroundColor: "#99caff",
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontWeight: '500',
    fontSize: 13,
    color: 'white'
  },
});