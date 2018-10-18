import React, { Component } from 'react';
import './KIndex.css';
import '../style/color.css';

export default class KIndex extends Component {
  render(){
    return(
      <main>

        <div id="quote" className="container index">
          <h1 className="text-center">Hazte Voluntario</h1>
          <br />
          <h3 id="quote-h3" className="text-center">
            Tu tiempo y talento pueden marcar una diferencia real en la vida de las personas
          </h3>
          <div id="div-btn-crear-voluntariado" className="text-center">
            <a href="/voluntariado" type="button" className="btn-lg btn-success">
              Crear volutariado
            </a>
          </div>
        </div>

      </main>
    );
  }
}
