import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const firebaseConfig = {
  apiKey: "AIzaSyA11OmtD28nPSb1qjtDaH-KzmwzQ_OtS8M",
  authDomain: "project-619875822020544650.firebaseapp.com",
  projectId: "project-619875822020544650",
  storageBucket: "project-619875822020544650.appspot.com",
  messagingSenderId: "895833625937",
  appId: "1:895833625937:web:d7a0564a01522aacb82f70",
  measurementId: "G-PB1N8T8FSS"
};

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);