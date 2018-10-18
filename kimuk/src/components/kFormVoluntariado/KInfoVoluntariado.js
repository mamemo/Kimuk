import React, { Component } from 'react';
import { Glyphicon } from 'react-bootstrap';
import KModalAddAdmin from '../KModals/KModalAddAdmin';
import ReactTooltip from 'react-tooltip'
import TimeInput from 'material-ui-time-picker'
import DatePicker from 'react-datepicker';

import './KFormVoluntariado.css';
import '../style/color.css';
import 'react-datepicker/dist/react-datepicker.css';

export default class KInfoVoluntariado extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {}
    };

    //this.handleInputChange = this.handleInputChange.bind(this);
    this.submitDataRegistrationForm = this.submitDataRegistrationForm.bind(this);
  }

  validateForm() {
    //let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;
    // no funciona bien identification
    if (!this.props.campana.identification) {
      formIsValid = false;
      errors["identification"] = "*Por favor ingrese número de identificación del encargado.";
    }
    // fin identification
    if (typeof this.props.campana.identification !== "undefined") {
      if (this.props.campana.identification.match(/^[0-9]*$/)) {
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
      if (!this.props.campana.tel.match(/^[0-9]{10}$/)) {
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

/*
 *
 *
 */
 submitDataRegistrationForm(e) {
    e.preventDefault();
    if (this.validateForm()) {
        alert("Form submitted");
        this.props.siguiente;
    }
  }

/*
 * Display volunteering data form
 *
 */
  volunteeringFormData() {
    return (
      <div>
        <div className="form-group">
         <label for="description" className="col-2 col-form-label"> Descripción </label>
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
          <label className="col-6 col-form-label">Fecha de voluntariado</label>
          <div className="col-md-6">
            <div id="datetime_picker_wrapper" className="time_picker_wrapper">
              <DatePicker
                name="startDate"
                selected={this.props.campana.startDate}
                onChange={this.props.handleStartDateChange}
                className="form-control mb-2 mr-sm-2 mb-sm-0"
              />
            </div>
          </div>
        </div>
        <div className="form-group">
          <label className="col-6 col-form-label">Hora</label>
          <div className="col-md-6">
            <TimeInput
              data-tip data-for='time-tooltip'
              mode='12h'
              cancelLabel='Cancelar'
              onChange={this.props.handleTimeChange}
            />
          </div>
          <ReactTooltip id='time-tooltip' type='info' effect='solid'>
            <span>
              Seleccionar la hora a realizarse el voluntariado.
              <br />
              No olvide seleccionar el formato de la hora (AM/PM).
            </span>
          </ReactTooltip>
        </div>
        <div className="form-group">
          <label for="address" className="col-2 col-form-label"> Lugar </label>
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
        <div className="col-sm-10">
          <label data-tip data-for='checkbox-tooltip'>
          Habilitar fecha límite de voluntariado
          <input
            name="registrationDeadline"
            type="checkbox"
            checked={this.props.campana.registrationDeadline}
            onChange={this.props.handleCheckoxChange} />
          </label>
          <ReactTooltip id='checkbox-tooltip' type='info' effect='solid'>
            <span>
              Seleccionar la fecha límite de recepción de solicitudes de
              <br />
              inscripción de voluntarios en la campaña. Inicialmente las
              <br />
              campañas no poseen fecha límite de inscripción.
            </span>
          </ReactTooltip>
        </div>
        <div className="form-group">
          <div className="col-md-6">
            <div id="datetime_picker_wrapper" className="time_picker_wrapper">
              <DatePicker
                name="finishDate"
                placeholderText="Sin fecha límite"
                disabled={this.props.campana.disabled}
                selected={this.props.campana.finishDate}
                onChange={this.props.handleFinishDateChange}
                className="form-control mb-2 mr-sm-2 mb-sm-0"
              />
            </div>
          </div>
        </div>
        <label className="col-4 col-form-label" >
          Cantidad máxima de voluntarios
          <input
            min="0"
            name="numberOfGuests"
            type="number"
            className="form-control"
            value={this.props.campana.numberOfVolunteers}
            onChange={this.props.handlerNumeric} />
        </label>
        <ReactTooltip id='numeric-tooltip' type='info' effect='solid'>
          <span>
            Indica la cantidad máxima de voluntarios deseados.
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
          <div className="col-sm-6">
            <input
              id="identification"
              name="identification"
              type="text"
              placeholder="Cédula"
              className="form-control mb-2 mr-sm-2 mb-sm-0"
              value={this.props.campana.identification}
              onChange={this.props.handler}
              data-tip data-for='identification-tooltip'
            />
            <ReactTooltip id='identification-tooltip' type='info' effect='solid'>
              <span>Digite la identificación sin espacios en blanco ni guiones.</span>
            </ReactTooltip>
          </div>
          <div className="errorMsg">{this.state.errors.identification}</div>
        </div>
        <div className="form-group">
          <label className="sr-only" for="name"> Nombre </label>
          <div className="col-sm-6">
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Nombre"
              className="form-control mb-2 mr-sm-2 mb-sm-0"
              value={this.props.campana.name}
              onChange={this.props.handler}
            />
          </div>
          <div className="errorMsg">{this.state.errors.name}</div>
        </div>
        <div className="form-group">
          <label className="sr-only" for="lastname"> Apellidos </label>
          <div className="col-sm-6">
            <input
              id="lastname"
              name="lastname"
              type="text"
              placeholder="Apellidos"
              className="form-control mb-2 mr-sm-2 mb-sm-0"
              value={this.props.campana.lastname}
              onChange={this.props.handler}
            />
          </div>
          <div className="errorMsg">{this.state.errors.lastname}</div>
        </div>
        <div className="form-group">
          <label className="sr-only" for="email"> Correo Electrónico </label>
          <div className="col-sm-6">
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Correo Electrónico"
              className="form-control mb-2 mr-sm-2 mb-sm-0"
              value={this.props.campana.email}
              onChange={this.props.handler}
              data-tip data-for='email-tooltip'
            />
            <ReactTooltip id='email-tooltip' type='info' effect='solid'>
              <span>ejemplo@kimuk.com</span>
            </ReactTooltip>
          </div>
          <div className="errorMsg">{this.state.errors.email}</div>
        </div>
        <div className="form-group">
          <label className="sr-only" for="tel"> Teléfono </label>
          <div className="col-sm-6">
            <input
              id="tel"
              name="tel"
              type="text"
              placeholder="Teléfono"
              className="form-control mb-2 mr-sm-2 mb-sm-0"
              value={this.props.campana.tel}
              onChange={this.props.handler}
              data-tip data-for='tel-tooltip'
            />
            <ReactTooltip id='tel-tooltip' type='info' effect='solid'>
              <span>Digite el número de teléfono sin espacios en blanco ni guiones.</span>
            </ReactTooltip>
          </div>
          <div className="errorMsg">{this.state.errors.tel}</div>
        </div>
      </div>
    );
  }

  render(){
    return (
      <div className="container">
        {this.volunteeringFormData()}
        {this.volunteeringManagerFormData()}
        <KModalAddAdmin manager={this.props.campana}/>
        <div className="row">
          <div className="col-1 offset-9">
            <button
              data-tip data-for='btn-tooltip'
              type="button"
              className="btn btn-primary"
              onClick = {this.props.siguiente} >
              <Glyphicon glyph="menu-righ" /> Continuar
            </button>
          </div>
          <ReactTooltip id='btn-tooltip' type='warning' effect='solid'>
            <span>Para poder continuar debe de asegurarse de haber completado correctamente todos los campos de información solicitados.</span>
          </ReactTooltip>
        </div>
      </div>
    );
  }
}