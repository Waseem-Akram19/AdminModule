import firebase from "firebase";
const firebaseConfig = {
    // add your own config values here
    apiKey: "AIzaSyAmVXYAiYFPmKoXDO3jmMsM6xhcXdl3qqk",
    authDomain: "foodgrid-1.firebaseapp.com",
    projectId: "foodgrid-1",
    
    storageBucket: "foodgrid-1.appspot.com",
    messagingSenderId: "1022672518984",
    appId: "1:1022672518984:web:c7562ba82450d931a9fd7d",
    measurementId: "G-M9EFVZMT0J"
  };
  firebase.initializeApp(firebaseConfig);
  export default firebase;