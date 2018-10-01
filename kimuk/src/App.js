import React, { Component } from 'react';

import KNav from './components/KNav/KNav';
import KIndex from './components/KIndex/KIndex';
import KFormVoluntariado from './components/kFormVoluntariado/KFormVoluntariado'
import KFormVoluntario from './components/KFormVoluntario/KFormVoluntario'
import KAdmin from './components/KAdmin/KAdmin'
import KContacto from './components/KContacto/KContacto';
import KInfo from './components/KInfo/KInfo';
import {base} from "./base"; // This import MUST remain here, DO NOT DELETE

///////////////////////  FIREBASE  //////////////////////////
/*
const firebase = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://kimuk-backend.firebaseio.com"
});
*/
/////////////////////////////////////////////////////////////

class App extends Component {
  
  constructor(){
    super();
    this.state ={
        link:1
    }
    this.ir=this.ir.bind(this);
  }
  ir(nlink){
    this.setState({
        link:nlink
    });
  }
/*
http://localhost:3000/voluntariado
http://localhost:3000/voluntario
http://localhost:3000/info
http://localhost:3000/admin
http://localhost:3000/contacto
*/
  render() {
    const url=window.location.href.split("/")
    console.log(url);
    switch (url[3]) {
      case "":
        return (
          <div className="App">
            <KNav ir={this.ir}/>
            <KIndex/>
          </div>);
      case "voluntariado":
        return (
          <div className="App">
            <KNav ir={this.ir}/>
            <KFormVoluntariado/>
          </div>
        );
      case "voluntario":
        return (
          <div className="App">
            <KNav ir={this.ir}/>
            <KFormVoluntario/>
          </div>
        );
      case "admin":
        return (
          <div className="App">
            <KNav ir={this.ir}/>
            <KAdmin/>
          </div>
        );
      case "contacto":
        return (
          <div className="App">
            <KNav ir={this.ir}/>
            <KContacto/>
          </div>
        );
      case "info":
        return (
          <div className="App">
            <KNav ir={this.ir}/>
            <KInfo/>
          </div>
        );
    }  
    
  }
}

export default App;
