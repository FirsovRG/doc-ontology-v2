import firebase from 'firebase'
import 'firebase/storage'

export const app = firebase.initializeApp({
  "projectId": "doc-ontology",
  "appId": "1:127504942763:web:33414ec3219f50b0e299ee",
  "databaseURL": "https://doc-ontology-default-rtdb.firebaseio.com",
  "storageBucket": "doc-ontology.appspot.com",
  "locationId": "us-central",
  "apiKey": "AIzaSyDVqiWgHFaDmGhbBYuRU4hQ4t3Ayz0EZks",
  "authDomain": "doc-ontology.firebaseapp.com",
  "messagingSenderId": "127504942763"
});

