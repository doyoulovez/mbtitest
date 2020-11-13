import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View,ScrollView,Dimensions,TouchableOpacity,Image } from 'react-native';
import Loading from "./Loading";
import CoupleCard from '../components/CoupleCard';
//import data from "../data.json";
import {firebase_db} from "../firebaseConfig";

import {Share} from "react-native";

const Couple = ({navigation,route}) => {

    const [isLoading, setIsLoading] = useState(true)

    const [coupleState,setCoupleState] = useState({})

    const [idx, setIdx] = useState(route.params.idx);
    if (idx !== route.params.idx) {
        setIsLoading(true);
        setIdx(route.params.idx);
    }

    useEffect(()=>{
        navigation.setOptions({
            title: '결과'
        })

        const { idx } = route.params;
        firebase_db.ref('/types/'+idx).once('value').then((snapshot) => {
            let types = snapshot.val();
            setCoupleState(types)
            setIsLoading(false)
        });
    },[idx])

    const goMain = () => {
        navigation.navigate("TabNavigator")
    }

    const doShare = () => {
        Share.share({
            message:`${coupleState.name} \n\n ${coupleState.answer}`,
        });
    }

    console.log("커플 데이터: " + coupleState.idx)

    return isLoading ? <Loading/> : (
    <View style={styles.container}>
        <Text style={styles.titleText}>〔 {coupleState.name}의 환상의 짝꿍 〕</Text>
        <ScrollView>
            <View style={styles.vScroll}>
                {coupleState.answer.map((a,i)=>{
                    return <CoupleCard key={i}
                                    idx={a.answer_idx}
                                    name={a.answer_title}
                                    h_name={a.answer_h_title}
                                    image={a.answer_image}
                                    navigation={navigation}/>
                })}
            </View>            
        </ScrollView>
        <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={()=> doShare()}
                              style={styles.shareStyle}>
                <Text style={styles.buttonText}>결과 공유하기</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> goMain()}
                              style={styles.goMainStyle}>
                <Text style={styles.goMainText}>Home</Text>
            </TouchableOpacity>
        </View>
    </View>
    )
}

export default Couple;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: "center",
        marginBottom: 20
    },
    vScroll: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
        padding: 10
    },
    buttonContainer:{
        height: 80,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        padding: 30,
        paddingBottom: 40
    },
    shareStyle: {
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
      }
  });