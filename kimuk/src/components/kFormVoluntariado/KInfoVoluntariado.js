import React, { Component } from 'react';
import NumericInput from 'react-numeric-input';
import { Glyphicon } from 'react-bootstrap';
import KHeaderVoluntariado from './KHeaderVoluntariado';
import KModalAddAdmin from '../KModals/KModalAddAdmin';
import KTimePicker from '../KDatetime/KTimePicker';
import KDatePicker from '../KDatetime/KDatePicker';
import ReactTooltip from 'react-tooltip'

import './KFormVoluntariado.css';
import '../style/color.css';
import 'react-datepicker/dist/react-datepicker.css';

export default class KInfoVolutariado extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {},
      errors: {}
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitDataRegistrationForm= this.submitDataRegistrationForm.bind(this);
  }

/*
 * Handle changes in inputs
 *
 */
  handleInputChange(e) {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields
    });
  }

/*
 *
 *
 */
 submitDataRegistrationForm(e) {
    e.preventDefault();
    if (this.validateForm()) {
        let fields = {};
        fields["volName"] = "";
        fields["description"] = "";
        fields["address"] = "";
        fields["identification"] = "";
        fields["name"] = "";
        fields["lastname"] = "";
        fields["email"] = "";
        fields["tel"] = "";
        this.setState({fields:fields});
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
              value={this.state.fields.description}
              onChange={this.handleInputChange}
              className="form-control"
            />
          </div>
          <div className="errorMsg">{this.state.errors.description}</div>
        </div>
        <div className="form-group">
          <label className="col-6 col-form-label">Fecha de voluntariado</label>
          <div className="col-md-6">
            <KDatePicker />
          </div>
        </div>
        <div className="form-group">
          <label className="col-8 col-form-label">Hora</label>
          <br /><br />
          <div className="col-md-6">
            <KTimePicker />
          </div>
        </div>
        <div className="form-group">
          <label for="address" className="col-2 col-form-label"> Lugar </label>
          <div className="col-sm-10">
            <textarea
               id='address'
               name='address'
               placeholder='Por favor ingrese dirección exacta del lugar a llevar a cabo el voluntariado'
               value={this.state.fields.address}
               onChange={this.handleInputChange}
               className="form-control"
            />
          </div>
          <div className="errorMsg">{this.state.errors.address}</div>
        </div>
        <div className="form-group">
          <label className="col-6 col-form-label">
            Fecha límite de registro de voluntariados
          </label>
          <div className="col-md-6">
            <KDatePicker />
          </div>
        </div>
        <label className="col-4 col-form-label">
          Límite de registro de voluntariados
        </label>
        <div className="form-check">
          <input
            type="radio"
            className="form-check-input"
            id="radio1"
            name="optradio"
            value="option1"
            checked
          />
          <label className="form-check-label" for="radio1"> No </label>
        </div>
        <div className="form-check">
          <input
            type="radio"
            className="form-check-input"
            id="radio2"
            name="optradio"
            value="option2"
          />
          <label className="form-check-label" for="radio2"> Si </label>
        </div>
        <NumericInput  min={0}/>
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
              value={this.state.fields.identification}
              onChange={this.handleInputChange}
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
              value={this.state.fields.name}
              onChange={this.handleInputChange}
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
              value={this.state.fields.lastname}
              onChange={this.handleInputChange}
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
              value={this.state.fields.email}
              onChange={this.handleInputChange}
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
              value={this.state.fields.tel}
              onChange={this.handleInputChange}
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

  validateForm() {
      let fields = this.state.fields;
      let errors = {};
      let formIsValid = true;

      if (!fields["identification"]) {
        formIsValid = false;
        errors["identification"] = "*Por favor ingrese número de identificación del encargado.";
      }

      if (typeof fields["identification"] !== "undefined") {
        if (!fields["identification"].match(/^[0-9]{10}$/)) {
          formIsValid = false;
          errors["identification"] = "*Por favor, introduzca una identificación válida.";
        }
      }

      if (!fields["volName"]) {
        formIsValid = false;
        errors["volName"] = "*Por favor ingrese nombre del voluntariado.";
      }

      if (!fields["name"]) {
        formIsValid = false;
        errors["name"] = "*Por favor ingrese nombre del encargado.";
      }

      if (!fields["lastname"]) {
        formIsValid = false;
        errors["lastname"] = "*Por favor ingresar apellidos del encargado.";
      }

      if (typeof fields["name"] !== "undefined" && typeof fields["lastname"] !== "undefined") {
        if (!fields["name"].match(/^[a-zA-Z ]*$/) && !fields["lastname"].match(/^[a-zA-Z ]*$/)) {
          formIsValid = false;
          errors["name"] = "*Por favor introduzca solo caracteres del alfabeto.";
        }
      }

      if (!fields["email"]) {
        formIsValid = false;
        errors["email"] = "*Por favor ingrese correo electrónico del encargado.";
      }

      if (typeof fields["email"] !== "undefined") {
        //regular expression for email validation
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(fields["email"])) {
          formIsValid = false;
          errors["email"] = "*Por favor, introduzca una dirección de correo electrónico válida.";
        }
      }

      if (!fields["tel"]) {
        formIsValid = false;
        errors["tel"] = "*Por favor ingrese número de teléfono del encargado.";
      }

      if (typeof fields["tel"] !== "undefined") {
        if (!fields["tel"].match(/^[0-9]{10}$/)) {
          formIsValid = false;
          errors["tel"] = "*Por favor, introduzca un número de teléfono válido.";
        }
      }

      if (!fields["description"]) {
        formIsValid = false;
        errors["description"] = "*Por favor ingrese descripción del voluntariado.";
      }

      if (!fields["address"]) {
        formIsValid = false;
        errors["address"] = "*Por favor ingrese dirección del lugar del voluntariado.";
      }

      this.setState({errors: errors});
      return formIsValid;
    }

  render(){
    return (
      <div className="container">
        <div className="relative">
          <div className="absolute">
            <KHeaderVoluntariado />
            <div className="errorMsg">{this.state.errors.volName}</div>
            {this.volunteeringFormData()}
            {this.volunteeringManagerFormData()}
            <KModalAddAdmin campana={this.props}/>
            <div className="row">
              <div className="col-1 offset-9">
                <button   data-tip data-for='btn-tooltip' type="button" className="btn btn-primary" onClick = {this.props.siguiente} > 
                  <Glyphicon glyph="menu-righ" /> Continuar
                </button>
              </div>
              <ReactTooltip id='btn-tooltip' type='warning' effect='solid'>
                <span>Para poder continuar debe de asegurarse de haber completado correctamente todos los campos de información solicitados.</span>
              </ReactTooltip>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
