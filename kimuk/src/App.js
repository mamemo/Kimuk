import React, { Component } from 'react';

import KNav from './components/KNav/KNav';
import KIndex from './components/KIndex/KIndex';
import KFormVoluntariado from './components/kFormVoluntariado/KFormVoluntariado'
import KFormVoluntario from './components/KFormVoluntario/KFormVoluntario'
import KAdmin from './components/KAdmin/KAdmin'
import KContacto from './components/KContacto/KContacto';
import KInfo from './components/KInfo/KInfo';
import {base} from "./base"; // This import MUST remain here, DO NOT DELETE


class App extends Component {

  constructor(){
    super();
    this.state ={
        link:1
    };
    this.ir=this.ir.bind(this);
  }
  ir(nlink){
    this.setState({
        link:nlink
    });
  }


  render() {
    const url=window.location.href.split("/");
    const len=url.length-1;
    switch (url[len]) {
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
      
    }
    switch (url[len-1]) {   
      case "admin":
        return (
          <div className="App">
            <KNav ir={this.ir}/>
            <KAdmin url = {url[len]}/>
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
      case "voluntario":
        return (
          <div className="App">
            <KNav ir={this.ir}/>
            <KFormVoluntario url = {url[len]}/>
          </div>
        );

      default:
        return (
          <div className="App">
            <KNav ir={this.ir}/>
            <KIndex/>
          </div>);
    }


  }
}

export default App;