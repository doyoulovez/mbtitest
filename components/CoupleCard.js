import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View,ScrollView,Dimensions,TouchableOpacity,Image } from 'react-native';

const CoupleCard = ({idx,name,image,h_name,navigation}) => {

    console.log("데이터" + idx)


    return (
            <TouchableOpacity onPress={()=> navigation.navigate("TypePage",{
                              idx: idx})}
                              style={styles.coupleBox}>
                <Image source={{uri:image}}
                       style={styles.imageBox}/>
                <Text style={styles.nameText}>{name}</Text>
                <Text style={styles.hnameText}>{h_name}</Text>
            </TouchableOpacity>
    )
}

export default CoupleCard;

const styles = StyleSheet.create({
    coupleBox: {
        flexDirection: 'column',
        width: Dimensions.get('window').width/2.35,
        height: 210,
        backgroundColor: '#fff',
        borderColor: 'lightgray',
        borderWidth: 0.5,
        borderRadius: 10,
        padding: 18,
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 2,  
        elevation: 5
    },
    imageBox: {
        width: 110,
        height: 110
    },
    nameText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        color: '#333333'
    },
    hnameText: {
        fontSize: 15,
        color: '#333333'
    }
  });