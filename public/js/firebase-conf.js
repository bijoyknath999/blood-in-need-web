// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyB1AOqk3kL_ILS-7CPezp2LB8jpdohNvz0",
    authDomain: "blood-in-need-web.firebaseapp.com",
    projectId: "blood-in-need-web",
    storageBucket: "blood-in-need-web.appspot.com",
    messagingSenderId: "697849039020",
    appId: "1:697849039020:web:9fd38ceb4306ad2f0c3709",
    measurementId: "G-8KES1F63X2"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var facebookProvider = new firebase.auth.FacebookAuthProvider();

  var googleProvider = new firebase.auth.GoogleAuthProvider();

