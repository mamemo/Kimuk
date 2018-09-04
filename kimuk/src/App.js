import React, { Component } from 'react';

import KNav from './components/KNav/KNav';
import KIndex from './components/KIndex/KIndex';
import KFormVoluntariado from './components/kFormVoluntariado/KFormVoluntariado'
import KFormVoluntario from './components/KFormVoluntario/KFormVoluntario'
import KAdmin from './components/KAdmin/KAdmin'

class App extends Component {
  render() {
    switch (2) {
      case 1:
        return (
          <div className="App">
            <KNav/>
            <KIndex/>
          </div>);
      case 2:
        return (
          <div className="App">
            <KNav/>
            <KFormVoluntariado/>
          </div>
        );
      case 3:
        return (
          <div className="App">
            <KNav/>
            <KFormVoluntario/>
          </div>
        );
      case 4:
        return (
          <div className="App">
            <KNav/>
            <KAdmin/>
          </div>
        );
    }  
    
  }
}

export default App;
