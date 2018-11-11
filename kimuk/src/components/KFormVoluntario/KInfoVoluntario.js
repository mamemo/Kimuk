import React, { Component } from 'react';
import './KFormVoluntario.css';
import '../style/color.css';
import DatePicker from 'react-datepicker';
import ReactTooltip from 'react-tooltip';
import 'react-datepicker/dist/react-datepicker.css';
import { FaLongArrowAltRight } from 'react-icons/fa';

export default class KInfoVoluntario extends Component {
    constructor(props){
        super(props);
        this.state={
            provincias:"",
            cantones:"",
            distritos:"",
            errors: {}
        }
        this.guardar_info=this.guardar_info.bind(this);
        this.cargar_provincias=this.cargar_provincias.bind(this);
        this.submitDataRegistrationForm = this.submitDataRegistrationForm.bind(this);
    }
    guardar_info(e){
        if(e.target.name==="provincia"){

            fetch("https://ubicaciones.paginasweb.cr/provincia/"+e.target.value+"/cantones.json")
            .then((resp) => resp.json())
            .then((data) => this.setState({ cantones: data }))
            this.props.voluntario.canton="";
            this.props.voluntario.distrito="";
            this.render();
        }
        if(e.target.name==="canton"){
            fetch("https://ubicaciones.paginasweb.cr/provincia/"+this.props.voluntario.provincia+"/canton/"+e.target.value+"/distritos.json")
            .then((resp) => resp.json())
            .then((data) => this.setState({ distritos: data }))
            this.render();
        }
        this.props.voluntario[e.target.name]=e.target.value;
    }
    cargar_provincias(){
        fetch("https://ubicaciones.paginasweb.cr/provincias.json")
        .then((resp) => resp.json())
        .then((data) => this.setState({ provincias: data}));
    }

    validateForm() {
        //let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if (!this.props.voluntario.id) {
            formIsValid = false;
            errors["identification"] = "*Por favor ingrese número de identificación.";
        }

        if (typeof this.props.voluntario.id !== "undefined") {
            if (!this.props.voluntario.id.match(/^[0-9]{9,12}$/)) {
                formIsValid = false;
                errors["identification"] = "*Por favor, introduzca una identificación válida.";
            }
        }

        if (!this.props.voluntario.nombre) {
            formIsValid = false;
            errors["name"] = "*Por favor ingrese su nombre.";
        }

        if (!this.props.voluntario.apellido_1) {
            formIsValid = false;
            errors["lastname1"] = "*Por favor ingresar su primer apellido.";
        }

        if (!this.props.voluntario.apellido_2) {
            formIsValid = false;
            errors["lastname2"] = "*Por favor ingresar su segundo apellido.";
        }

        if (typeof this.props.voluntario.nombre !== "undefined" &&
            typeof this.props.voluntario.apellido_1 !== "undefined" &&
            typeof this.props.voluntario.apellido_2 !== "undefined") {
            if (!this.props.voluntario.nombre.match(/^[a-zA-Z ]*$/) &&
                !this.props.voluntario.apellido_1.match(/^[a-zA-Z ]*$/) &&
                !this.props.voluntario.apellido_2.match(/^[a-zA-Z ]*$/)) {
                formIsValid = false;
                errors["name"] = "*Por favor introduzca solo caracteres del alfabeto.";
                errors["lastname1"] = "*Por favor introduzca solo caracteres del alfabeto.";
                errors["lastname2"] = "*Por favor introduzca solo caracteres del alfabeto.";
            }
        }

        if (!this.props.voluntario.correo) {
            formIsValid = false;
            errors["email"] = "*Por favor ingrese su correo electrónico.";
        }

        if (typeof this.props.voluntario.correo !== "undefined") {
            //regular expression for email validation
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!re.test(this.props.voluntario.correo)) {
                formIsValid = false;
                errors["email"] = "*Por favor, introduzca una dirección de correo electrónico válida.";
            }
        }

        if (!this.props.voluntario.telefono_1) {
            formIsValid = false;
            errors["tel"] = "*Por favor ingrese su número de teléfono.";
        }

        if (typeof this.props.voluntario.telefono_1 !== "undefined") {
            if (!this.props.voluntario.telefono_1.match(/^[0-9]{8}$/)) {
                formIsValid = false;
                errors["tel"] = "*Por favor, introduzca un número de teléfono válido.";
            }
        }

        if (!this.props.voluntario.direccion_exacta) {
            formIsValid = false;
            errors["direccion"] = "*Por favor ingrese su dirección exacta.";
        }

        if (!this.props.voluntario.ocupacion){
            formIsValid = false;
            errors["ocupacion"] = "*Por favor ingrese su ocupación.";
        }

        if (!this.props.voluntario.genero){
            formIsValid = false;
            errors["genero"] = "*Por favor ingrese seleccione algún género.";
        }

        if (!this.props.voluntario.estado_civil){
            formIsValid = false;
            errors["estado_civil"] = "*Por favor ingrese su estado civil.";
        }

        if (!this.props.voluntario.tipo_id){
            formIsValid = false;
            errors["tipo_id"] = "*Por favor ingrese su tipo de identificación.";
        }

        if (!this.props.voluntario.provincia || !this.props.voluntario.canton || !this.props.voluntario.distrito){
            formIsValid = false;
            errors["residencia"] = "*Por favor ingrese su lugar de residencia.";
        }
        this.setState({errors: errors});
        return formIsValid;
    }

    submitDataRegistrationForm(e) {
        e.preventDefault();
        if (this.validateForm()) {
            this.props.siguiente();
        }
    }

    render(){
        this.cargar_provincias();
        const p= [];
        const c= [];
        const d= [];
        for(var k in this.state.provincias){
            p.push( <option value={k} >{this.state.provincias[k]}</option>);
        }
        for(var k in this.state.cantones){
            c.push( <option value={k} >{this.state.cantones[k]}</option>);
        }
        for(var k in this.state.distritos){
            d.push( <option value={k} >{this.state.distritos[k]}</option>);
        }
        return(
            <div className="container text-left">

              <ReactTooltip id='must-tooltip' type='error' effect='solid'>
                <span>
                  Campo Obligatorio
                </span>
              </ReactTooltip>

              <h3> Información personal </h3>
              <hr />
              <div className="form-group">

                <label className="col-6 col-form-label" data-tip data-for='must-tooltip'>
                  Tipo de identificación
                  <span id="must-tooltip" className = "red"> * </ span>
                </label>

                <div className="col-sm-5">

                  <select
                    name="tipo_id"
                    defaultValue={this.props.voluntario.tipo_id}
                    onChange={this.guardar_info}
                    className="form-control">
                    <option value="" selected disabled>Tipo identificación</option>
                    <option value="cedula_identidad">Cédula identidad</option>
                    <option value="cedula_residencia">Cédula residencia</option>
                  </select>

                </div>

                <div className="errorMsg">{this.state.errors.tipo_id}</div>

              </div>

              <div className="form-group">

                <label className="col-6 col-form-label" data-tip data-for='must-tooltip'>
                  Identificación | Número de residencia:
                  <span id="must-tooltip" className = "red"> * </ span>
                </label>

                <div className="col-sm-5">

                  <input
                    type="text"
                    name="id"
                    placeholder="122223333"
                    data-tip data-for='identification-tooltip'
                    defaultValue={this.props.voluntario.id}
                    onChange={this.guardar_info}
                    className="form-control" />

                  <div className="errorMsg">{this.state.errors.identification}</div>

                  <ReactTooltip id='identification-tooltip' type='info' effect='solid'>
                      <span>Digite la identificación sin espacios en blanco ni guiones.</span>
                  </ReactTooltip>

                </div>

              </div>

              <div className="form-group">

                <label className="col-6 col-form-label" data-tip data-for='must-tooltip'>
                  Nombre:
                  <span id="must-tooltip" className = "red"> * </ span>
                </label>

                <div className="col-sm-5">

                  <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre"
                    defaultValue={this.props.voluntario.nombre}
                    onChange={this.guardar_info}
                    className="form-control"/>
                  <div className="errorMsg">{this.state.errors.name}</div>

                </div>

              </div>

              <div className="form-group">

                <label className="col-6 col-form-label" data-tip data-for='must-tooltip'>
                  Primer apellido:
                  <span id="must-tooltip" className = "red"> * </ span>
                </label>

                <div className="col-sm-5">

                  <input
                    type="text"
                    name="apellido_1"
                     placeholder="Primer apellido"
                     defaultValue={this.props.voluntario.apellido_1}
                     onChange={this.guardar_info}
                     className="form-control"/>
                  <div className="errorMsg">{this.state.errors.lastname1}</div>

                </div>

              </div>

              <div classname="form-group">

                  <label className="col-6 col-form-label" data-tip data-for='must-tooltip'>
                    Segundo apellido:
                    <span id="must-tooltip" className = "red"> * </ span>
                  </label>

                  <div className="col-sm-5">

                    <input
                      type="text"
                      name="apellido_2"
                      placeholder="Segundo apellido"
                      defaultValue={this.props.voluntario.apellido_2}
                      onChange={this.guardar_info}
                      className="form-control"/>
                    <div className="errorMsg">{this.state.errors.lastname2}</div>

                  </div>

              </div>

              <div className="form-group">

                <label className="col-6 col-form-label" data-tip data-for='must-tooltip'>
                  Fecha de nacimiento:
                  <span id="must-tooltip" className = "red"> * </ span>
                </label>

                <div className="col-sm-5">

                  <input
                    type="date"
                    name="f_nacimiento"
                    defaultValue={this.props.voluntario.f_nacimiento}
                    onChange={this.guardar_info}
                    className="form-control"/>
                </div>

              </div>

              <div className="form-group">

                <label className="col-6 col-form-label" data-tip data-for='must-tooltip'>
                  Género:
                  <span id="must-tooltip" className = "red"> * </ span>
                </label>

                  <div className="col-sm-10">

                    <div className="container_item">

                      <div className="item">

                        <input
                          type="radio"
                          name="genero"
                          value="masculino"
                          defaultChecked={this.props.voluntario.genero==="masculino"}
                          onChange={this.guardar_info}
                          className="checkbox"/>
                          <label className="gender-lab"> Masculino </label>

                      </div>

                      <div className="item">

                        <input
                          type="radio"
                          name="genero"
                          value="femenino"
                          defaultChecked={this.props.voluntario.genero==="femenino"}
                          onChange={this.guardar_info}
                          className="checkbox"/>
                          <label className="gender-lab"> Femenino </label>

                      </div>

                      <div className="item">

                        <input
                          type="radio"
                          name="genero"
                          value="otro"
                          defaultChecked={this.props.voluntario.genero==="otro"}
                          onChange={this.guardar_info}
                          className="checkbox"/>
                          <label className="gender-lab"> Prefiero no especificar </label>

                      </div>

                    </div>

                  </div>

              </div>

              <div className="form-group">

                <label className="col-6 col-form-label" data-tip data-for='must-tooltip'>
                  Estado civil:
                  <span id="must-tooltip" className = "red"> * </ span>
                </label>

                <div className="col-sm-5">

                  <select
                    name="estado_civil"
                    defaultValue={this.props.voluntario.estado_civil}
                    onChange={this.guardar_info}
                    className="form-control">

                    <option value="" selected disabled >Estado civil</option>
                    <option value="soltero">Soltero</option>
                    <option value="casado">Casado</option>
                    <option value="viudo">Viudo</option>
                    <option value="divorciado">Divorciado</option>
                    <option value="union_libre">Unión libre</option>

                  </select>

                </div>

              </div>

              <div className="form-group">

                <label className="col-6 col-form-label" data-tip data-for='must-tooltip'>
                  Ocupación:
                  <span id="must-tooltip" className = "red"> * </ span>
                </label>

                <div className="col-sm-10">

                  <div className="container_item">

                    <div className="item">

                      <input
                        type="radio"
                        name="ocupacion"
                        value="trabajo"
                        defaultChecked={this.props.voluntario.ocupacion==="trabajo"}
                        onChange={this.guardar_info}
                        className="checkbox"/>
                        <label className="gender-lab"> Trabajo </label>

                    </div>

                    <div className="item">

                      <input
                        type="radio"
                        name="ocupacion"
                        value="estudio"
                        defaultChecked={this.props.voluntario.ocupacion==="estudio"}
                        onChange={this.guardar_info}
                        className="checkbox"/>
                        <label className="gender-lab"> Estudio </label>

                    </div>

                    <div className="item">

                      <input
                        type="radio"
                        name="ocupacion"
                        value="ambos"
                        defaultChecked={this.props.voluntario.ocupacion==="ambos"}
                        onChange={this.guardar_info}
                        className="checkbox"/>
                        <label className="gender-lab"> Ambos </label>

                    </div>

                    <div className="item">

                      <input
                        type="radio"
                        name="ocupacion"
                        value="ninguno"
                        defaultChecked={this.props.voluntario.ocupacion==="ninguno"}
                        onChange={this.guardar_info}
                        className="checkbox"/>
                        <label className="gender-lab"> Ninguno </label>

                    </div>

                  </div>

                </div>

              </div>

              <br/>
              <h3>Lugar de residencia</h3>
              <hr/>

              <div className="form-group">

                <label className="col-6 col-form-label" data-tip data-for='must-tooltip'>
                  Provincia:
                  <span id="must-tooltip" className = "red"> * </ span>
                </label>

                <div className="col-sm-5">

                  <select
                    name="provincia"
                    defaultValue={this.props.voluntario.provincia}
                    onChange={this.guardar_info}
                    className="form-control">

                    <option value="" selected disabled>Provincia</option>
                    {p}

                  </select>

                </div>

              </div>

              <div className="form-group">

                <label className="col-6 col-form-label" data-tip data-for='must-tooltip'>
                  Canton:
                  <span id="must-tooltip" className = "red"> * </ span>
                </label>

                <div className="col-sm-5">

                  <select
                    name="canton"
                    defaultValue={this.props.voluntario.canton}
                    onChange={this.guardar_info}
                    className="form-control">

                    <option value="" selected disabled>Canton</option>
                    {c}
                  </select>

                </div>

              </div>

              <div className="form-group">

                <label className="col-6 col-form-label" data-tip data-for='must-tooltip'>
                  Distrito:
                  <span id="must-tooltip" className = "red"> * </ span>
                </label>

                <div className="col-sm-5">

                  <select
                    name="distrito"
                    defaultValue={this.props.voluntario.distrito}
                    onChange={this.guardar_info}
                    className="form-control">

                    <option value="" selected disabled>Distrito</option>
                    {d}
                  </select>

                </div>

              </div>

              <div className="errorMsg">{this.state.errors.residencia}</div>

              <div className="form-group">

                <label className="col-6 col-form-label" data-tip data-for='must-tooltip'>
                  Dirección exacta:
                  <span id="must-tooltip" className = "red"> * </ span>
                </label>

                <div className="col-sm-10">

                  <input
                    type="text"
                    placeholder="Dirección exacta de la casa de habitación"
                    name="direccion_exacta"
                    defaultValue={this.props.voluntario.direccion_exacta}
                    onChange={this.guardar_info}
                    className="form-control"/>

                </div>

              </div>

              <div className="errorMsg">{this.state.errors.direccion}</div>

              <br />
              <h3>Contacto</h3>
              <hr/>

              <div className="form-group">

                <label className="col-6 col-form-label" data-tip data-for='must-tooltip'>
                  Correo electrónico:
                  <span id="must-tooltip" className = "red"> * </ span>
                </label>

                <div className="col-sm-5">

                  <input
                    type="text"
                    placeholder="Correo"
                    name="correo"
                    data-tip data-for='email-tooltip'
                    defaultValue={this.props.voluntario.correo}
                    onChange={this.guardar_info}
                    className="form-control"/>

                </div>

              </div>

              <div className="errorMsg">{this.state.errors.email}</div>
              <ReactTooltip id='email-tooltip' type='info' effect='solid'>
                  <span>ejemplo@kimuk.com</span>
              </ReactTooltip>

              <div className="form-group">

                <label className="col-6 col-form-label" data-tip data-for='must-tooltip'>
                  Teléfono 1:
                  <span id="must-tooltip" className = "red"> * </ span>
                </label>

                <div className="col-sm-5">

                  <input
                    type="text"
                    placeholder="88888888"
                    name="telefono_1"
                    defaultValue={this.props.voluntario.telefono_1}
                    onChange={this.guardar_info}
                    className="form-control"/>

                </div>

              </div>

              <div className="errorMsg">{this.state.errors.tel}</div>

              <div className="form-group">

                <label className="col-6 col-form-label">Teléfono 2:</label>

                <div className="col-sm-5">

                  <input
                    type="text"
                    placeholder="88888888"
                    name="telefono_2"
                    defaultValue={this.props.voluntario.telefono_2}
                    onChange={this.guardar_info}
                    className="form-control"/>

                </div>

              </div>

            <br/>
            <br/>

            <div className="row">
              <div className="col-1 offset-2">

              </div>
              <div className="col-1 offset-6">
                  <button
                      className="btn btn-primary"
                      onClick={ this.props.siguiente }
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

            </div>
            <br/>
            <br/>

            </div>
        )
    }
}
