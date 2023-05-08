import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Router from "./components/routes/Router";
import * as firebase from "firebase/app";
import {AuthProvider} from "./components/providers/AuthProvider";


firebase.initializeApp({
  apiKey: "AIzaSyCDBYiZckKz0_gYLbYUlBO2fEbsUU82U8I",
  authDomain: "vk-copy-a4a51.firebaseapp.com",
  projectId: "vk-copy-a4a51",
  storageBucket: "vk-copy-a4a51.appspot.com",
  messagingSenderId: "779617388787",
  appId: "1:779617388787:web:0bb38c98bed61434208f86"
});

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
      <AuthProvider>
        <Router/>
      </AuthProvider>
    </React.StrictMode>
);

