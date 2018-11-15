/**
 * Archivo que contiene un objeto para ser reutilizado 
 * cuando se hace una pregunta en la aplicación y su respuesta es Sí o No.
 */


import React, { Component } from 'react';
import '../style/color.css';

export default class KFormPregunta extends Component {
	constructor(props) {
		super(props);
		this.state = {
		description: this.props.description,
		title: this.props.title,
		question: this.props.question
		};
	}

	/**
	 * Estructura de una pregunta
	 */
	questionData(){
		return (
		<div className="row">
			<div className="row">
			<br />
			<br />
			<div clasName="container">
				<h2 name="title"> {this.state.title} </h2>
				<div class="form-group">
				<p name="description">{this.state.description}</p>
				</div>
				<h5 name="question">{this.state.question} </h5>
			</div>
			</div>
		</div>
		);
	}

	/**
	 * Muestra los componentes deseados. 
	 * Actualiza la interfaz dependiendo de lo que pase en la aplicación.
	 */
	render(){
		return(
			<div className="container">
			{this.questionData()}
			</div>
		);
	}
}
