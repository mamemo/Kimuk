/**
 * Archivo que controla la parte superior de la interfaz 
 * a la hora de crear un Voluntariado, donde se muestra el nombre y la foto.
 */


import React, { Component } from 'react';
import './KFormVoluntariado.css';
import '../style/color.css';
import '../style/general.css';
import './KHeaderVoluntariado.css'
import ReactTooltip from 'react-tooltip'

export default class KHeaderVoluntariado extends Component {
	constructor(props) {
		super(props);
		this.state = {
		inputType: 'hidden'
		};

		this.handleHiddenInput = this.handleHiddenInput.bind(this);
	}

	handleHiddenInput() {
		this.setState({inputType: 'text'});
	}
	/*
	* Volunteering Data Component
	* Parts: Image, name
	*/
	volunteeringData() {
		return (
		<div className="flex-container">
			<div className="flex-item">
			<img
				id="profile-img"
				src={(this.props.url === "") ?  require('../../media/image1-icon.png') : this.props.url}
				className={'img-responsive'}
				accept="image/*"
				width="200"
				height="200" />
			<div id="img-div" className="form-group">

				<label className="btn btn-link">
					Agregar imagen al voluntariado
					<input
						id="image-file"
						name="volImage"
						type="file"
						style={{display: 'none'}}
						value={this.props.image}
						onChange={this.props.handlerImage}
					/>
				</label>

				<input
					className="form-control input-lg"
					type={this.state.inputType}
					value={this.props.image}
					onChange={this.props.handlerImage}
				/>

			</div>

			</div>

			<div className="flex-item-name">

			<div className="input-group input-group-lg" data-tip data-for='must-tooltip'>

				<input
				name="volName"
				type="text"
				className="form-control"
				aria-label="Large"
				placeholder="Nombre del voluntariado"
				value={this.props.name}
				onChange={this.props.handler} />
			</div>

			</div>

			<span
			id="must-tooltip"
			className = 'red'> *
			</ span>

			<ReactTooltip id='must-tooltip' type='error' effect='solid'>
			<span>
				Campo Obligatorio
			</span>
			</ReactTooltip>

			<div className="flex-item-bar">
			<progress max={100} id={"barimg"}>0%</progress>
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
			{this.volunteeringData()}
			</div>
		);
	}
}
