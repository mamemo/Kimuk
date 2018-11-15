/**
 * Archivo que contiene el componente de la barra que 
 * se encuentra en todas las páginas de la aplicación.
 */


import React, { Component } from 'react';
import { Link } from 'react-router';
import Modal from 'react-modal';
import './KNav.css';

const infoModalStyle = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        height                : '500px',
        transform             : 'translate(-50%, -50%)',
        overflow              : 'auto', // <-- This tells the modal to scrol
    }
};

const contactModalStyle = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        transform             : 'translate(-50%, -50%)',
        overflow              : 'auto', // <-- This tells the modal to scrol
    }
};


export default class KNav extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		openCollapse: false,
		contactIsOpen: false,
		infoIsOpen: false
		};

		this.showContactModal = this.showContactModal.bind(this);
		this.showInfoModal = this.showInfoModal.bind(this);
	}

	/**
	 * Función para cuando la pantalla se hace más pequeña.
	 * (celulare, tablets)
	 */
	showCollapseResponsive(e) {
		e.preventDefault();
		this.setState({
		openCollapse: !this.state.openCollapse
		});
	}

	/**
	 * Cuando se abre la opción de Contacto.
	 */
	showContactModal(e) {
		e.preventDefault();
		this.setState({
		contactIsOpen: !this.state.contactIsOpen
		});
	}

	/**
	 * Cuando se abre la opción de Información.
	 */
	showInfoModal(e) {
		e.preventDefault();
		this.setState({
		infoIsOpen: !this.state.infoIsOpen
		});
	}

	/**
	 * Muestra la ventana con Información de Contacto.
	 */
	contacModal() {
		return(
		<Modal
			isOpen={this.state.contactIsOpen}
			onRequestClose={this.showContactModal}
			style={contactModalStyle}
			ariaHideApp={false}
		>
			<h4>Información de Contacto</h4>
			<hr/>
			<h5>Dirección Principal</h5>
			<h6><b>Teléfono: </b>+506 2542-5000</h6>
			<h6><b>Dirección: </b>Calle 8, Avenida 14, Distrito Hospital, San José 10103, Costa Rica</h6>
			<h6><b>Otras Señas: </b>200 m sur, 50 oeste,  Parque la Merced, San José</h6>
			<hr />
			<h5>Sede Administrativa Zapote</h5>
			<h6><b>Teléfono: </b>+506 2528-0000</h6>
			<h6><b>Dirección: </b>Avenida 20A, Zapote, San José, 10105, Costa Rica</h6>
			<h6><b>Otras Señas: </b>De Casa Presidencial, 300 m noroeste y 25 metros norte</h6>
			<div className="div_btn text-center">
			<button className="btn-md btn-primary text-center" aria-label="Close" onClick={this.showContactModal}>
				<span aria-hidden="true">Cerrar</span>
			</button>
			</div>
		</Modal>
		);
	}

	/**
	 * Muestra la ventana con Información de la aplicación.
	 */
	infoModal() {
		return(
		<Modal
			isOpen={this.state.infoIsOpen}
			onRequestClose={this.showInfoModal}
			style={infoModalStyle}
			ariaHideApp={false}
		>
			<h4>Información General</h4>
			<hr/>
			<p>
			El Ciclo de Gestión de Voluntariado, es el proceso que garantiza la inclusión de los voluntarios en los programas de asistencia de la Cruz Roja Costarricense. Este proceso busca fortalecer y organizar los esfuerzos realizados por la institución y los voluntarios para poder cumplir con sus labores y objetivos, así como con su misión y visión.
			</p>
			<p>
			El Ciclo tiene como objetivo primordial el fortalecer el talento humano de todos los voluntarios que apoyan el alcance de los objetivos y metas de la Cruz Roja Costarricense, a través de etapas de reclutamiento, capacitación, integración, nivelación, transición y salida de la Sociedad Nacional. Por lo tanto, el Ciclo contempla desde el ingreso del personal hasta su salida de la organización (si se diera el caso), buscando la especialización dentro del área de trabajo respectiva para cada sección de servicio.
			</p>
			<h5> Etapas del Ciclo de Voluntariado. </h5>
			<p>
			Como se menciona, el Ciclo está compuesto por varias fases o etapas que responden a momentos críticos en el proceso de reclutamiento y formación del recurso humano voluntario, procesos que todo voluntario deberá de completar para formar parte de la organización; las etapas son:
			</p>
			<ol>
			<li>
				Captación y reclutamiento: durante esta fase se realiza la campaña de reclutamiento, las entrevistas de aspirantes, los convivios y la inscripción de aspirantes a voluntarios.
			</li>
			<li>
				Capacitación: una de las fases primordiales del Ciclo, comprende todo el proceso de formación del voluntario, la capacitación básica institucional, la formación general y la formación especializada; además de incluir el proceso de consolidación, en la cual los aspirantes seleccionan la sección de servicio a la cual se integrarán.
			</li>
			<li>
				Nivelación: este proceso está enfocado en los voluntarios con mayor tiempo de pertenecer a la organización, y que por algún motivo no han podido completar su proceso de capacitación, aprovechando el ingreso de nuevos aspirantes, se unen a estos para continuar con el cumplimiento de la malla curricular correspondiente.
			</li>

			</ol>
			<div className="div_btn text-center">
			<button className="btn-md btn-primary" aria-label="Close" onClick={this.showInfoModal}>
				<span aria-hidden="true">Cerrar</span>
			</button>
			</div>
		</Modal>
		);
	}

	/**
	 * Muestra los componentes deseados. 
	 * Actualiza la interfaz dependiendo de lo que pase en la aplicación.
	 */
	render() {
		const classCollapseNavbar = 'collapse navbar-collapse' + (this.state.openCollapse ? ' show' : '')
		return(
		<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
			<a className="navbar-brand" href="/">
			<img src={require('../rsc/logo-solo-blanco.png')} width="30" height="30" class="d-inline-block align-top" alt=""/>
			Kimuk
			</a>
			<button
			className="navbar-toggler"
			type="button"
			data-toggle="collapse"
			data-target="#navbarSupportedContent"
			aria-controls="navbarSupportedContent"
			aria-expanded="false"
			aria-label="Toggle navigation"
			onClick={(e) => {this.showCollapseResponsive(e)}}>
			<span className="navbar-toggler-icon"></span>
			</button>

			<div className={classCollapseNavbar} id="navbarSupportedContent">
			<div className="navbar-nav mr-auto"> </div>
			<div className="form-inline my-2 my-lg-0">
				<ul className="navbar-nav mr-auto">
				<li className="nav-item">
					<a className="nav-link" href="/voluntariado">Crear Voluntariado</a>
				</li>
				<li className="nav-item">
					<a
					className="nav-link"
					href='javascript:'
					onClick={(e) => {this.showInfoModal(e)}}
					>
					Información
					</a>
				</li>
				<li className="nav-item">
					<a
					className="nav-link"
					href='javascript:'
					onClick={(e) => {this.showContactModal(e)}}
					>
					Contacto
					</a>
				</li>

				</ul>
			</div>
			</div>
			{this.contacModal()}
			{this.infoModal()}
		</nav>
		);
	}
}
