import React, { Component } from 'react';
import { Link } from 'react-router';
import './KNav.css';
import '../style/color.css';

export default class KNav extends Component {
  render(){
    return(
      <nav className="container-fluid color_1">
        <div className="row align-items-end">
          <div className="col-1"> 
            <img src={require('../rsc/logo-solo-blanco.png')} alt="Kimuk Logo Picture" className="nav-logo"/>
            </div>
          <div className="col-7"> 
            {/*} <img src={require('../../rsc/name-blanco.png')} alt="Kimuk Name" className="nav-name"/> */}
            <h1 className="text-white display-4"> Kimuk </h1>
          </div>
          <div className="col-4 "> 
            <ul class="nav">
              <li class="nav-item">
                <a class="nav-link text-white align-text-bottom" href="#">Crear Voluntariado</a>
              </li>
              <li class="nav-item">
                <a class="nav-link text-white align-text-bottom" href="#">Información</a>
              </li>
              <li class="nav-item">
                <a class="nav-link text-white align-text-bottom" href="#">Contacto</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
