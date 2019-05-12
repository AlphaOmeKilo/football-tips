import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyDKhkLlzsSHzGTOxPLg_4x37brREONQY0g",
    authDomain: "football-tips-21d85.firebaseapp.com",
    databaseURL: "https://football-tips-21d85.firebaseio.com",
    projectId: "football-tips-21d85",
    storageBucket: "football-tips-21d85.appspot.com",
    messagingSenderId: "723695302552",
    appId: "1:723695302552:web:be2a46c6fc94516d"
};

firebase.initializeApp(firebaseConfig);

export default firebase;