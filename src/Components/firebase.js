import firebase from 'firebase/app';
import 'firebase/storage';

// Initialize Firebase
 var firebaseConfig = {
    apiKey: "AIzaSyCscCVWa8zmHqHbspo6TbZby7r46VE6vjE",
    authDomain: "beproject-729e7.firebaseapp.com",
    databaseURL: "https://beproject-729e7.firebaseio.com",
    projectId: "beproject-729e7",
    storageBucket: "beproject-729e7.appspot.com",
    messagingSenderId: "886682891443",
    appId: "1:886682891443:web:a34e185dfc9d0fdea6acc6"
 }
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export {
    storage, firebase as default
}