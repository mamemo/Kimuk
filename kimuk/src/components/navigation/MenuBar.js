import React, { Component } from 'react';
import { Link } from 'react-router';
import '../../styles/Menubar.css';

export default class Menubar extends Component {
  render(){
    return(
      <nav className="nav-container">
        <div className="nav-brand">
          <img src={require('../../rsc/logo-solo-blanco.png')} alt="Kimuk Logo Picture" className="nav-logo"/>
          <img src={require('../../rsc/name-blanco.png')} alt="Kimuk Name" className="nav-name"/>
        </div>

        <ul className="nav-list">
          <li className="nav-item">Crear Voluntariado</li>
          <li className="nav-item">Información</li>
          <li className="nav-item">Contacto</li>
        </ul>
      </nav>
    );
  }
}
