import React, { Component } from 'react';
import './KIndex.css';
import '../style/color.css';

export default class KIndex extends Component {
  render(){
    return(
      <main>

        <div className="container text-center index">
          <div className="row h-100">
            <div className="col-lg-6 offset-lg-3  align-self-center">
              <h1>Hazte Voluntario</h1>
              <h3>"Tu tiempo y talento pueden marcar una diferencia real en la vida de las personas"</h3>
              <br />
              <br />
              <a href="#" type="button" class="btn-lg btn-success">Crear volutariado</a>
            </div>
          </div>


        </div>
      </main>
    );
  }
}
