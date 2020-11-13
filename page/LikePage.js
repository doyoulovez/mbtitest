import React,{useState, useEffect} from "react";
import {View,Text,StyleSheet,TouchableOpacity, ScrollView, Dimensions, Image} from "react-native"

import CoupleCard from '../components/CoupleCard'

import {firebase_db} from "../firebaseConfig"

import Loading from "./Loading";
import Constants from 'expo-constants';

const LikePage = ({navigation}) => {

  const [isLoading, setIsLoading] = useState(true);
  const [likes,setLikes] = useState({});

  useEffect(()=>{     
      const user_id = Constants.installationId;  
      firebase_db.ref('/likes/'+user_id).once('value').then((snapshot) => {
          let likes = snapshot.val();
          console.log("1")
          if(likes){
            console.log("2")
              setLikes(Object.values(likes))
              setIsLoading(false)
          }
      });
  },[])

        return isLoading ? <Loading/> : (
        <View style={styles.readyContainer}>
          <Text style={styles.readyText}>〔 저장한 MBTI 유형 〕</Text>
        <ScrollView>
          <View style={styles.Vscroll}>
             {likes.map((a,i)=>{
                return (
                  <CoupleCard key={i}
                              idx={a['idx']}
                              image={a['image']}
                              name={a['name']}
                              h_name={a['h_name']}
                              navigation={navigation}/>             
                )
             })}
          </View>
        </ScrollView>
        </View>)
}
export default LikePage ;

const styles = StyleSheet.create({
    readyContainer: {
      flex: 1,
      backgroundColor: '#fff',
    },
    readyText: {
      color:'#333333',
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 20
    },
  Vscroll: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingHorizontal: 10,
  },
  });