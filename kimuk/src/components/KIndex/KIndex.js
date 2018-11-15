/**
 * Archivo que contiene los componentes que se 
 * muestran en el Inicio de la aplicación.
 */


import React, { Component } from 'react';
import './KIndex.css';
import '../style/color.css';

export default class KIndex extends Component {
  
  	/**
	 * Muestra los componentes deseados. 
	 * Actualiza la interfaz dependiendo de lo que pase en la aplicación.
	 */
	render(){
    return(
		<main>
			<div className="imgFondo">
			<div id="quote" className="container index">
				<h1 className="text-center">Hazte Voluntario</h1>
				<br />
				<h3 id="quote-h3" className="text-center">
				Tu tiempo y talento pueden marcar una diferencia real en la vida de las personas.
				</h3>
				<div id="div-btn-crear-voluntariado" className="text-center">
				<a href="/voluntariado" type="button" className="btn-lg btn-success">
					Crear volutariado
				</a>
				</div>
			</div>
			</div>
		</main>
    );
  }
}
