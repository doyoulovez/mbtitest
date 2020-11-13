import * as firebase from 'firebase/app';

import "firebase/database";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDcucCJie_jTzkiNBcsCVpljmCPuoFvbFo",
    authDomain: "mbti-dylz.firebaseapp.com",
    databaseURL: "https://mbti-dylz.firebaseio.com",
    projectId: "mbti-dylz",
    storageBucket: "mbti-dylz.appspot.com",
    messagingSenderId: "59677390477",
    appId: "1:59677390477:web:b752fc248dc6b27abc94c4",
    measurementId: "G-VWE7QY0VFM"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const firebase_db = firebase.database()