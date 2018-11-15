/**
 * Archivo que contiene todos los componentes para 
 * ingresar la información de un voluntariado a la hora de crearlo.
 */


import React, { Component } from 'react';
import KModalAddAdmin from '../KModals/KModalAddAdmin';
import ReactTooltip from 'react-tooltip'
import TimeInput from 'material-ui-time-picker'
import DatePicker from 'react-datepicker';
import { FaLongArrowAltRight } from 'react-icons/fa';

import './KFormVoluntariado.css';
import '../style/color.css';
import 'react-datepicker/dist/react-datepicker.css';

export default class KInfoVoluntariado extends Component {
	constructor(props) {
		super(props);
		this.state = {
		errors: {}
		};

		this.submitDataRegistrationForm = this.submitDataRegistrationForm.bind(this);
	}

	/**
	 * Función para validar los campos de la interfaz.
	 */
	validateForm() {
		//let fields = this.state.fields;
		let errors = {};
		let formIsValid = true;

		if (!this.props.campana.identification) {
			formIsValid = false;
			errors["identification"] = "*Por favor ingrese número de identificación del encargado.";
		}

		if (typeof this.props.campana.identification !== "undefined") {
			if (!this.props.campana.identification.match(/^[0-9]{9,12}$/)) {
				formIsValid = false;
				errors["identification"] = "*Por favor, introduzca una identificación válida.";
			}
		}

		if (!this.props.campana.volName) {
			formIsValid = false;
			errors["volName"] = "*Por favor ingrese nombre del voluntariado.";
		}

		if (!this.props.campana.name) {
			formIsValid = false;
			errors["name"] = "*Por favor ingrese nombre del encargado.";
		}

		if (!this.props.campana.lastname) {
			formIsValid = false;
			errors["lastname"] = "*Por favor ingresar apellidos del encargado.";
		}

		if (typeof this.props.campana.name !== "undefined" &&
			typeof this.props.campana.lastname !== "undefined") {
			if (!this.props.campana.name.match(/^[a-zA-Z ]*$/) &&
				!this.props.campana.lastname.match(/^[a-zA-Z ]*$/)) {
				formIsValid = false;
				errors["name"] = "*Por favor introduzca solo caracteres del alfabeto.";
				errors["lastname"] = "*Por favor introduzca solo caracteres del alfabeto.";
			}
		}

		if (!this.props.campana.email) {
			formIsValid = false;
			errors["email"] = "*Por favor ingrese correo electrónico del encargado.";
		}

		if (typeof this.props.campana.email !== "undefined") {
			//regular expression for email validation
			const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			if (!re.test(this.props.campana.email)) {
				formIsValid = false;
				errors["email"] = "*Por favor, introduzca una dirección de correo electrónico válida.";
			}
		}

		if (!this.props.campana.tel) {
			formIsValid = false;
			errors["tel"] = "*Por favor ingrese número de teléfono del encargado.";
		}

		if (typeof this.props.campana.tel !== "undefined") {
			if (!this.props.campana.tel.match(/^[0-9]{8}$/)) {
				formIsValid = false;
				errors["tel"] = "*Por favor, introduzca un número de teléfono válido.";
			}
		}

		if (!this.props.campana.description) {
			formIsValid = false;
			errors["description"] = "*Por favor ingrese descripción del voluntariado.";
		}

		if (!this.props.campana.address) {
			formIsValid = false;
			errors["address"] = "*Por favor ingrese dirección del lugar del voluntariado.";
		}

		this.setState({errors: errors});
		return formIsValid;
	}

	/**
	 * Método para pasar a la siguiente sección de Crear un Voluntariado.
	 */
	submitDataRegistrationForm(e) {
		e.preventDefault();
		if (this.validateForm()) {
			this.props.siguiente();
		}
	}

	/*
	* Enseña los campos para llenar la información del voluntariado.
	*
	*/
	volunteeringFormData() {
		return (
		<div>

			<div className="errorMsg">{this.state.errors.volName}</div>

			<div className="form-group">

			<label
			for="description"
			className="col-2 col-form-label"
			data-tip data-for='must-tooltip'>
			Descripción
			<span id="must-tooltip" className = "red"> * </ span>
			</label>

			<div className="col-sm-10">

			<textarea
				id='description'
				name='description'
				placeholder='Por favor ingrese descripción del voluntariado'
				value={this.props.campana.description}
				onChange={this.props.handler}
				className="form-control"
				/>

			</div>

			<div className="errorMsg">{this.state.errors.description}</div>

			</div>

			<div className="form-group">

			<label
			for="description"
			className="col-2 col-form-label"
			data-tip data-for='must-tooltip'>
			Lugar
			<span id="must-tooltip" className = "red"> * </ span>
			</label>

			<div className="col-sm-10">

				<textarea
				id='address'
				name='address'
				placeholder='Por favor ingrese dirección exacta del lugar a llevar a cabo el voluntariado'
				value={this.props.campana.address}
				onChange={this.props.handler}
				className="form-control"
				/>

			</div>

			<div className="errorMsg">{this.state.errors.address}</div>

			</div>

			<div className="form-group">

			<label className="col-6 col-form-label" data-tip data-for='must-tooltip'>
				Fecha del voluntariado
				<span
				id="must-tooltip"
				className = "red"> *
				</ span>
			</label>

			<div className="col-sm-5">

				<div
				id="datetime_picker_wrapper"
				className="time_picker_wrapper"
				data-tip data-for='date-tooltip'>

				<DatePicker
					name="startDate"
					dateFormat="DD-MM-YYYY"
					selected={this.props.campana.startDate}
					onChange={this.props.handleStartDateChange}
					className="form-control"
				/>

				</div>

				<ReactTooltip id='date-tooltip' type='info' effect='solid' place="top">
				<span>
					Seleccionar la fecha a realizarse el voluntariado.
				</span>
				</ReactTooltip>

			</div>

			</div>

			<div className="form-group">

			<ReactTooltip id='checkbox-tooltip' type='info' effect='solid' place="top">
				<span>
				Seleccionar la fecha límite de recepción de solicitudes de
				<br />
				inscripción de voluntarios en la campaña. Inicialmente las
				<br />
				campañas no poseen fecha límite de inscripción.
				<br />
				Es opcional.
				</span>
			</ReactTooltip>

			<div className="col-sm-5">

				<label data-tip data-for='checkbox-tooltip'>
				Habilitar fecha límite de inscripción
				</label>

				<input
				name="registrationDeadline"
				type="checkbox"
				className="checkbox"
				checked={this.props.campana.registrationDeadline}
				onChange={this.props.handleCheckoxChange} />

			</div>

			<div className="col-sm-5" data-tip data-for='checkbox-tooltip'>

				<div id="datetime_picker_wrapper" className="time_picker_wrapper">

				<DatePicker
					name="finishDate"
					dateFormat="DD-MM-YYYY"
					placeholderText="Sin fecha límite"
					disabled={this.props.campana.disabled}
					selected={this.props.campana.finishDate}
					onChange={this.props.handleFinishDateChange}
					className="form-control"
				/>

				</div>

			</div>

			</div>

			<div className="form-group">

			<label className="col-6 col-form-label" data-tip data-for='must-tooltip' place="top">
				Hora de inicio del voluntariado
				<span
				id="must-tooltip"
				className = "red"> *
				</ span>
			</label>

			<div className="col-sm-5" data-tip data-for='time-tooltip'>

				<TimeInput
				mode='12h'
				cancelLabel='Cancelar'
				format="HH:mm:ss"
				onChange={this.props.handleTimeChange}
				/>

			</div>

			<ReactTooltip id='time-tooltip' type='info' effect='solid' place="top">
				<span>
				Seleccionar la hora a realizarse el voluntariado.
				<br />
				No olvide seleccionar el formato de la hora (AM/PM).
				</span>
			</ReactTooltip>

			</div>

			<label
			className="col-4 col-form-label"
			data-tip data-for='numeric-tooltip'>

			Cantidad máxima de voluntarios
			</label>

			<div className="col-sm-3">
			<input
				data-tip data-for='numeric-tooltip'
				min="0"
				name="numberOfGuests"
				type="number"
				className="form-control"
				value={this.props.campana.numberOfVolunteers}
				onChange={this.props.handlerNumeric} />
			</div>

			<ReactTooltip id='numeric-tooltip' type='info' effect='solid' place="top">
			<span>
				Indique la cantidad máxima de voluntarios deseados.
				<br />
				Si la cantidad es igual a 0, se asume que el voluntariado
				<br />
				es sin límite de voluntarios.
			</span>
			</ReactTooltip>

		</div>
		);
	}

	/*
	* Display volunteering manager data
	*
	*/
	volunteeringManagerFormData() {
		return (
		<div>

			<hr />
			<strong>
			<label>
				Información del responsable del voluntariado
			</label>
			</strong>

			<div className="form-group">

			<label className="sr-only" for="identification"> Cédula </label>

			<div className="col-sm-10">

				<span
				id="must-tooltip"
				className = "red"
				data-tip data-for='must-tooltip'> *
				</ span>

				<input
				id="identification"
				name="identification"
				type="text"
				placeholder="Cédula"
				className="form-control"
				value={this.props.campana.identification}
				onChange={this.props.handler}
				data-tip data-for='identification-tooltip'
				/>


				<ReactTooltip id='identification-tooltip' type='info' effect='solid' place="top">
				<span>Digite la identificación sin espacios en blanco ni guiones.</span>
				</ReactTooltip>


			</div>


			<div className="errorMsg">{this.state.errors.identification}</div>

			</div>

			<div className="form-group">

			<label className="sr-only" for="name"> Nombre </label>

			<div className="col-sm-10">

				<span
				id="must-tooltip"
				className = "red"
				data-tip data-for='must-tooltip'> *
				</ span>

				<input
				id="name"
				name="name"
				type="text"
				placeholder="Nombre"
				className="form-control"
				value={this.props.campana.name}
				onChange={this.props.handler}
				data-tip data-for='name-tooltip'
				/>

			</div>

			<ReactTooltip id='name-tooltip' type='info' effect='solid' place="top">
				<span>Ingrese nombre completo.</span>
			</ReactTooltip>

			<div className="errorMsg">{this.state.errors.name}</div>

			</div>

			<div className="form-group">

			<label className="sr-only" for="lastname"> Apellidos </label>

			<div className="col-sm-10">

				<span
				id="must-tooltip"
				className = "red"
				data-tip data-for='must-tooltip'> *
				</ span>

				<input
				id="lastname"
				name="lastname"
				type="text"
				placeholder="Apellidos"
				className="form-control"
				value={this.props.campana.lastname}
				onChange={this.props.handler}
				data-tip data-for='lastname-tooltip'
				/>

			</div>

			<ReactTooltip id='lastname-tooltip' type='info' effect='solid' place="top">
				<span>Ingrese uno o los dos apellidos.</span>
			</ReactTooltip>

			<div className="errorMsg">{this.state.errors.lastname}</div>

			</div>

			<div className="form-group">

			<label className="sr-only" for="email"> Correo Electrónico </label>

			<div className="col-sm-10">

				<span
				id="must-tooltip"
				className = "red"
				data-tip data-for='must-tooltip'> *
				</ span>

				<input
				id="email"
				name="email"
				type="email"
				placeholder="Correo Electrónico"
				className="form-control"
				value={this.props.campana.email}
				onChange={this.props.handler}
				data-tip data-for='email-tooltip'
				/>

				<ReactTooltip id='email-tooltip' type='info' effect='solid' place="top">
				<span>Ingrese correo electrónico válido: ejemplo@kimuk.com</span>
				</ReactTooltip>

			</div>

			<div className="errorMsg">{this.state.errors.email}</div>

			</div>

			<div className="form-group">

			<label className="sr-only" for="tel"> Teléfono </label>

			<div className="col-sm-10">

			<span
				id="must-tooltip"
				className = "red"
				data-tip data-for='must-tooltip'> *
			</ span>

				<input
				id="tel"
				name="tel"
				type="text"
				placeholder="Teléfono"
				className="form-control"
				value={this.props.campana.tel}
				onChange={this.props.handler}
				data-tip data-for='tel-tooltip'
				/>

				<ReactTooltip id='tel-tooltip' type='info' effect='solid' place="top">
				<span>
					Digite el número de teléfono sin espacios en blanco ni guiones:
					<br />
					88888888
				</span>
				</ReactTooltip>

			</div>

			<div className="errorMsg">{this.state.errors.tel}</div>

			</div>

		</div>
		);
	}

	/**
	 * Muestra los componentes deseados. 
	 * Actualiza la interfaz dependiendo de lo que pase en la aplicación.
	 */
	render(){
		return (
		<div className="container">

			<div className="span-div">

			<span id="must-tooltip" className = "red">
				* Campos Obligatorios
			</ span>

			</div>

			{this.volunteeringFormData()}
			{this.volunteeringManagerFormData()}
			<KModalAddAdmin manager={this.props.campana}/>
			<div className="row">
			<div className="col-1 offset-2">

			</div>
			<div className="col-1 offset-6">
				<button
					className="btn btn-primary btn-md"
					onClick={ this.submitDataRegistrationForm }
					data-tip data-for='btn-tooltip'> Siguiente <FaLongArrowAltRight />
				</button>
				<ReactTooltip id='btn-tooltip' type='warning' effect='solid' place="top">
					<span>
					Asegúrate de completar correctamente todos
					<br/>
					los campos solicitados.
					</span>
				</ReactTooltip>
			</div>
			<br/>
			<br/>
			</div>
		</div>
		);
	}
}
