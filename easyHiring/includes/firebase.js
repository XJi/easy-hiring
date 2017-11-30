import * as firebase from "firebase";
var findname = '';
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
      var ref = firebase.database().ref();
      var userRef = ref.child("company").child(name);
      userRef.set({
          name: name,
          email: email,
          jobs: null
      });
      console.log(email + ' ' + password);
    }

    static authUser(email, password){
      firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
      //  console.log(noError + ', errorMSG: '+ errorMessage);
      });
      /**var ref = firebase.database().ref().child('company');
      ref.orderByChild('email').equalTo(email).once("value").
      then(function(snapshot) {
        if(snapshot.exists()){
          //  console.log('PRODUCT EXIST');
          //  console.log(snapshot);
            snapshot.forEach((entry) => {
              findname = entry.val().name;
            });
            console.log("Found:  " + findname);
            return findname;
        }
        else{
            console.log('Account doesnt exist');
        }
      }).catch(function(error){console.log('Cant retrieve account', error)});**/
    }

    static addNewJob(name, jobTitle, jobDescription, skills){
      var comRef = firebase.database().ref().child('company').child(name).child('Jobs');

      comRef.child(jobTitle).set({
            description: jobDescription,
            skills: skills
      });
      console.log(skills);
    }
}

module.exports = Firebase;
