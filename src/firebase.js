import firebase from 'firebase/app';
import 'firebase/auth';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyD_X2NE1AJgEum3mv3hf9-sjH94VxQJ0Vg',
  authDomain: 'fir-b6286.firebaseapp.com',
  projectId: 'fir-b6286',
  storageBucket: 'fir-b6286.appspot.com',
  messagingSenderId: '392016671351',
  appId: '1:392016671351:web:13a6b0e809ac78c036cc72',
  measurementId: 'G-6LXWQKZKSQ',
};

firebase.initializeApp(firebaseConfig);

export default firebase.auth();
