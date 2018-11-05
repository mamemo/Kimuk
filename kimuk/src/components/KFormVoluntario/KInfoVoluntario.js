import React, { Component } from 'react';
import './KFormVoluntario.css';
import '../style/color.css';
import DatePicker from 'react-datepicker';
import ReactTooltip from 'react-tooltip';
import 'react-datepicker/dist/react-datepicker.css';

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
                <div className="row"> 
                <div className="col-6 offset-3">
                        <table>
                        <tr>
                            <td >
                            <br/>Tipo de indentificación<br/>
                                <select name="tipo_id" defaultValue={this.props.voluntario.tipo_id} onChange={this.guardar_info}>
                                <option value="" selected disabled>Tipo indentificación</option>
                                <option value="cedula_identidad">Cedula identidad</option>
                                <option value="cedula_residencia">Cedula residencia</option>
                                </select>
                                <br/> <div className="errorMsg">{this.state.errors.tipo_id}</div>
                            </td>
                        </tr>
                        <tr>
                            <td >
                            <br/>Indentificación | Número de residencia:<br/>
                                <input type="text" name="id" placeholder="122223333" data-tip data-for='identification-tooltip' defaultValue={this.props.voluntario.id} onChange={this.guardar_info} />
                                <br/> <div className="errorMsg">{this.state.errors.identification}</div>
                                <ReactTooltip id='identification-tooltip' type='info' effect='solid'>
                                    <span>Digite la identificación sin espacios en blanco ni guiones.</span>
                                </ReactTooltip>
                            </td>
                        </tr>
                        <tr>
                            <td><br/>Nombre:
                                <br/>
                                <input type="text" name="nombre" placeholder="Nombre" defaultValue={this.props.voluntario.nombre} onChange={this.guardar_info}/>
                                <br/> <div className="errorMsg">{this.state.errors.name}</div>
                            <br/>Primer apellido:
                                <br/>
                                <input type="text" name="apellido_1" placeholder="Primer apellido" defaultValue={this.props.voluntario.apellido_1} onChange={this.guardar_info} />
                                <br/> <div className="errorMsg">{this.state.errors.lastname1}</div>
                            <br/>Segundo apellido:
                                <br/>
                                <input type="text" name="apellido_2" placeholder="Segundo apellido" defaultValue={this.props.voluntario.apellido_2} onChange={this.guardar_info}/>
                                <br/> <div className="errorMsg">{this.state.errors.lastname2}</div>
                            </td>
                        </tr>
                        <tr>
                            <td ><br/>Fecha de nacimiento:
                                <br/>
                                {/* <DatePicker
                                    name="f_nacimiento"
                                    selected={this.props.voluntario.f_nacimiento}
                                    onChange={this.guardar_info}
                                    className="form-control mb-2 mr-sm-2 mb-sm-0"
                                /> */}
                                <input type="date" name="f_nacimiento" selected={this.props.voluntario.f_nacimiento} defaultValue={this.props.voluntario.f_nacimiento} onChange={this.guardar_info}/>
                            </td>
                        </tr>
                        <tr>
                            <td >
                                <br/>
                                Género:
                                <br/>
                                <input type="radio" name="genero" value="masculino" defaultChecked={this.props.voluntario.genero==="masculino"} onChange={this.guardar_info}/> Masculino
                                <input type="radio" name="genero" value="femenino" defaultChecked={this.props.voluntario.genero==="femenino"} onChange={this.guardar_info}/> Femenino
                                <input type="radio" name="genero" value="otro" defaultChecked={this.props.voluntario.genero==="otro"} onChange={this.guardar_info}/> Prefiero no especificar
                                <br/> <div className="errorMsg">{this.state.errors.genero}</div>
                            </td>
                        </tr>
                        <tr>
                            <td >
                                <br/>
                                Estado civil:
                                <br/>
                                <select name="estado_civil" defaultValue={this.props.voluntario.estado_civil} onChange={this.guardar_info}>
                                <option value="" selected disabled >Estado civil</option>
                                <option value="soltero">Soltero</option>
                                <option value="casado">Casado</option>
                                <option value="viudo">Viudo</option>
                                <option value="divorciado">Divorciado</option>
                                <option value="union_libre">Unión libre</option>
                                </select>
                                <br/> <div className="errorMsg">{this.state.errors.estado_civil}</div>
                            </td>
                        </tr>
                        <tr>
                            <td ><br/>Ocupación:
                                <br/>
                                <input type="radio" name="ocupacion" value="trabajo" defaultChecked={this.props.voluntario.ocupacion==="trabajo"}  onChange={this.guardar_info} /> Trabajo
                                <input type="radio" name="ocupacion" value="estudio" defaultChecked={this.props.voluntario.ocupacion==="estudio"} onChange={this.guardar_info}/> Estudio
                                <input type="radio" name="ocupacion" value="ambos" defaultChecked={this.props.voluntario.ocupacion==="ambos"} onChange={this.guardar_info}/> Ambos
                                <input type="radio" name="ocupacion" value="ninguno" defaultChecked={this.props.voluntario.ocupacion==="ninguno"} onChange={this.guardar_info}/> Ninguno
                                <br/> <div className="errorMsg">{this.state.errors.ocupacion}</div>
                            </td>
                        </tr>
                        <tr>
                            <td >
                            <br/>
                            <h3>Lugar de residencia</h3>
                            <hr/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                 Provincia:<br/>
                                <select name="provincia" defaultValue={this.props.voluntario.provincia} onChange={this.guardar_info} >
                                <option value="" selected disabled>Provincia</option>                                
                                {p}
                                </select>
                                <br/>Canton:<br/>
                                <select name="canton" defaultValue={this.props.voluntario.canton} onChange={this.guardar_info}>
                                <option value="" selected disabled>Canton</option>
                                {c}
                                </select>
                                <br/>Distrito:<br/>
                                <select name="distrito" defaultValue={this.props.voluntario.distrito} onChange={this.guardar_info}>
                                <option value="" selected disabled>Distrito</option>
                                {d}
                                </select>
                                <br/> <div className="errorMsg">{this.state.errors.residencia}</div>
                            </td>
                        </tr>
                        <tr>
                            <td >
                            <br/>Dirección exacta:<br/>
                                <input type="text" placeholder="Dirección exacta de la casa de habitación" name="direccion_exacta" defaultValue={this.props.voluntario.direccion_exacta} onChange={this.guardar_info} /> 
                                <br/> <div className="errorMsg">{this.state.errors.direccion}</div>
                            </td>
                        </tr>
                        <tr>
                        <td >
                                <br/> <h3>Contacto</h3>
                                <hr/>
                            </td>
                        </tr>
                        <tr>
                        <td >
                                 Correo electrónico:<br/>
                                <input type="text" placeholder="Correo" name="correo" data-tip data-for='email-tooltip' defaultValue={this.props.voluntario.correo} onChange={this.guardar_info}/>     
                                <br/> <div className="errorMsg">{this.state.errors.email}</div>
                                <ReactTooltip id='email-tooltip' type='info' effect='solid'>
                                    <span>ejemplo@kimuk.com</span>
                                </ReactTooltip>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <br/> Teléfono 1:<br/>
                                <input type="text" placeholder="88888888" name="telefono_1" defaultValue={this.props.voluntario.telefono_1} onChange={this.guardar_info}/>     
                                <br/> <div className="errorMsg">{this.state.errors.tel}</div>
                            <br/> Teléfono 2:<br/>
                                <input type="text" placeholder="88888888" name="telefono_2" defaultValue={this.props.voluntario.telefono_2} onChange={this.guardar_info}/>     
                            </td>
                        </tr>

                    </table>
                    
                    
                </div>
                </div>
                <br/>
                <br/>
                
                <div className="row">
                    
                    <div className="col-1 offset-6">
                        <button
                            id="navigationButton"
                            className="btn btn-primary btn-md"
                            onClick={ this.submitDataRegistrationForm }
                            data-tip data-for='btn-tooltip'> Siguiente
                        </button>
                        <ReactTooltip id='btn-tooltip' type='warning' effect='solid'>
                            <span>Para poder continuar debe de asegurarse de haber completado correctamente todos los campos de información solicitados.</span>
                        </ReactTooltip>
                    </div>
                </div>
                <br/>
                <br/>
                
            </div>    
        );
    }
}