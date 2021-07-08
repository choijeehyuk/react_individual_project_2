import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import "firebase/storage";
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCNLT7CpJxKKw4AUErmXgFA-49bsrxJ0xQ",
    authDomain: "image-community-38469.firebaseapp.com",
    projectId: "image-community-38469",
    storageBucket: "image-community-38469.appspot.com",
    messagingSenderId: "469234203134",
    appId: "1:469234203134:web:3400462f9da291c046a8af",
    measurementId: "G-8S5LJ711XL"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const apiKey = firebaseConfig.apiKey;
const firestore = firebase.firestore();
const storage = firebase.storage();
const realtime = firebase.database();

export {auth, apiKey, firestore, storage, realtime};