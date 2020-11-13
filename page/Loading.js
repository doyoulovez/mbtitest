import React from "react";
import {View,Text,StyleSheet} from "react-native"

export default function Loading(){
    return (<View style={styles.readyContainer}><Text style={styles.readyText}>로딩 중 ···</Text></View>)
}

const styles = StyleSheet.create({
    readyContainer: {
      flex: 1,
      backgroundColor: '#fff',
      alignContent:'center',
      justifyContent:'center',
      alignItems:'center'
    },
    readyText: {
      color:'#000',
      fontSize: 20,
      fontWeight: 'bold'
    }
  });