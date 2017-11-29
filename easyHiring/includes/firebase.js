import * as firebase from "firebase";

class Firebase {
    static initialise() {
      firebase.initializeApp({
        apiKey: "AIzaSyAP_kR74BktkP-f-4Op_vi2pb56X0jCtRo",
        authDomain: "easy-hiring-57516.firebaseapp.com",
        databaseURL: "https://easy-hiring-57516.firebaseio.com",
        projectId: "easy-hiring-57516",
        storageBucket: "easy-hiring-57516.appspot.com",
        messagingSenderId: "165151062127"
      });
    }
    static createUser(name, email, password){
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
      });
      //let rootRef = firebase.database().reference()
      /**firebase.database().ref('recruiter/' + email).set({
        username: name,
        email: email,
        password: password
      });**/
      var ref = firebase.database().ref();
      var usersRef = ref.child("company");
      usersRef.set({
          name: {
          email: email,
          jobs: null
        }
      });
      console.log(email + ' ' + password);
    }

    static authUser(email, password){
      var noError = true;
      firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        noError = false;
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
      });
      console.log('lala');
      return noError;
    }

}

module.exports = Firebase;
