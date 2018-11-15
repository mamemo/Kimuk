/**
 * Archivo que contiene el componente que muestra la ventana 
 * con la información de un voluntario en el modo Administrador.
 */


import React, { Component } from 'react';
import './KModalInfo.css';
import {leer_habilidades_voluntario} from '../DB/volunteers';
import {
    enviar_correo_voluntario_aceptado
  } from '../kEmail/KEmail';

export default class KModalInfo extends Component {
	constructor(props){
		super(props);

		console.log(this.props.volunteerInfo);

		this.state = {
			original: this.props.volunteerInfo,
			modificaciones: this.props.volunteerInfo,
	
			provincias:"",
			cantones:"",
			distritos:"",
			errors: {}
		}
		
		this.guardar_info=this.guardar_info.bind(this);
		this.cargar_provincias=this.cargar_provincias.bind(this);

		this.setWrapperRef = this.setWrapperRef.bind(this);
		this.handleClickOutside = this.handleClickOutside.bind(this);
	}

	/**
	 * A la hora de crear el componente,
	 * agrega un listener a cuando el usuario hace click
	 * a fuera de la ventana.
	 */
    componentDidMount() {
		this.cargar_provincias();
		document.addEventListener('mousedown', this.handleClickOutside);
	}

	/**
	 * A la hora de crear el componente,
	 * agrega un listener a cuando el usuario hace click
	 * a fuera de la ventana.
	 */
    componentWillUnmount() {
		document.removeEventListener('mousedown', this.handleClickOutside);
	}

	/**
	 * Set the wrapper ref
	 */
	setWrapperRef(node) {
		this.wrapperRef = node;
	}

	/**
	 * Alert if clicked on outside of element
	 */
	handleClickOutside(event) {
		if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
		this.props.onClose();
		}
	}

	/**
	 * Llama a un servicio para obtener los cantones 
	 * y/o distritos según una selección.
	 * Guarda los cambios al voluntario.
	 */
	guardar_info(e){
		
		if(e.target.name==="Provincia"){
            fetch("https://ubicaciones.paginasweb.cr/provincia/"+e.target.value+"/cantones.json")
            .then((resp) => resp.json())
			.then((data) => this.setState({ cantones: data }));
			this.state.modificaciones.Canton="";
            this.state.modificaciones.Distrito="";
			this.render();
        }
        if(e.target.name==="Canton"){
            fetch("https://ubicaciones.paginasweb.cr/provincia/"+this.state.modificaciones.Provincia+"/canton/"+e.target.value+"/distritos.json")
            .then((resp) => resp.json())
			.then((data) => this.setState({ distritos: data }));
			this.state.modificaciones.Distrito="";
			this.render();
		}

		const newState = Object.assign({}, this.state.modificaciones);
		newState[e.target.name] = e.target.value;
		this.setState({ 
			modificaciones: newState
        });
	}

	/**
	 * Llama a un servicio para obtener las provincias, cantones y distritos de Costa Rica.
	 */
	cargar_provincias(){
		fetch("https://ubicaciones.paginasweb.cr/provincias.json")
		.then((resp) => resp.json())
		.then((data) => this.setState({ provincias: data}));

		fetch("https://ubicaciones.paginasweb.cr/provincia/"+this.props.volunteerInfo.Provincia+"/cantones.json")
			.then((resp) => resp.json())
			.then((data) => this.setState({ cantones: data }));
		
		fetch("https://ubicaciones.paginasweb.cr/provincia/"+this.props.volunteerInfo.Provincia+"/canton/"+this.props.volunteerInfo.Canton+"/distritos.json")
			.then((resp) => resp.json())
			.then((data) => this.setState({ distritos: data }));
	}

	_onFocus = function(e){
		e.currentTarget.type = "date";
	}
	_onBlur = function(e){
		e.currentTarget.type = "text";
	}

	/**
	 * Muestra los componentes deseados. 
	 * Actualiza la interfaz dependiendo de lo que pase en la aplicación.
	 */
	render() {
		// cargar provincias, cantones y distritos
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

		// cargar Habilidades
		const skills= [];
		for(var h in this.props.habilidades){
		skills.push(<div className="button button3 text-center">
						{this.props.habilidades[h]}
					</div>);
		}

		return (

		<div ref={this.setWrapperRef} className="container-form">
			<div>
			<div className="panel_div">
			<h4>Solicitud de registro</h4>
			<hr/>
			<form className="form_container">
				<section className="section_modal">
				<div>
				<h5>Información Personal</h5>
				<hr></hr>
				</div>
				<div className="group_line">
				<div className="form_field">
					<label>Tipo de identificación</label>
					<select 
						name="Tipo_identificacion"
						value={this.state.modificaciones.Tipo_identificacion} 
						onChange={this.guardar_info}>
					<option value="">Tipo indentificación</option>
					<option value="cedula_identidad">Cedula identidad</option>
					<option value="cedula_residencia">Cedula residencia</option>
					</select>
					
				</div>

				<div className="form_field">
					<label>Identificación</label>
					<input type="text"
						name="Cedula" 
						placeholder={this.state.modificaciones.Cedula} 
						onChange={this.guardar_info}
						disabled/>
				</div>
				</div>

				<div className="group_line">

				<div className="form_field">
				<label>Nombre</label>
					<input type="text" className="name_input" 
						name="Nombre" 
						placeholder={this.state.modificaciones.Nombre} 
						onChange={this.guardar_info}/>
				</div>

				<div className="form_field">
				<label>Primer apellido</label>
					<input type="text" className="name_input" 
						name="Primer_apellido" 
						placeholder={this.state.modificaciones.Primer_apellido} 
						onChange={this.guardar_info}/>
				</div>

				<div className="form_field">
				<label>Segundo apellido</label>
					<input type="text" className="name_input" 
						name="Segundo_apellido" 
						placeholder={this.state.modificaciones.Segundo_apellido} 
						onChange={this.guardar_info}/>
				</div>

				</div>

				<div className="form_field">
				<label>Fecha de Nacimiento</label>
				<input type="text" 
					name="Fecha_nacimiento" 
					placeholder={this.state.modificaciones.Fecha_nacimiento} 
					onFocus = {this._onFocus} 
					onBlur={this._onBlur}
					onChange={this.guardar_info}/>
				</div>

				<div className="form_field">
				<label>Género</label>
				<select 
					name="Genero" 
					value={this.state.modificaciones.Genero}
					onChange={this.guardar_info}>
					<option value="masculino">Masculino</option>
					<option value="femenino">Femenino</option>
					<option value="otro">Prefiero no especificar</option>
				</select>
				</div>


				<div className="form_field">
				<label>Estado civil</label>
				<select 
					name="Estado_civil" 
					value={this.state.modificaciones.Estado_civil}
					onChange={this.guardar_info}>
					<option value="" selected disabled >Estado civil</option>
                    <option value="soltero">Soltero</option>
                    <option value="casado">Casado</option>
                    <option value="viudo">Viudo</option>
                    <option value="divorciado">Divorciado</option>
                    <option value="union_libre">Unión libre</option>
				</select>
				</div>
				</section>

				<section className="section_modal">
				<div>
					<h5>Lugar de residencia</h5>
					<hr></hr>
				</div>

				<div className="group_line">
					<div className="form_field">
					<label>Provincia</label>
					<select 
						name="Provincia" 
						value={this.state.modificaciones.Provincia} 
						onChange={this.guardar_info}>
					<option value="" selected disabled>Provincia</option>
						{p}
					</select>
					</div>

					<div className="form_field">
					<label>Cantón</label>
					<select 
						name="Canton" 
						value={this.state.modificaciones.Canton} 
						onChange={this.guardar_info}>
					<option value="" selected disabled>Canton</option>
						{c}
					</select>
					</div>

					<div className="form_field">
					<label>Distrito</label>
					<select 
						name="Distrito" 
						value={this.state.modificaciones.Distrito} 
						onChange={this.guardar_info}>
					<option value="" selected disabled>Distrito</option>
						{d}
					</select>
					</div>
				</div>

				<div className="form_field">
					<label>Dirección exacta</label>
					<input type="text-long" 
						name="Direccion" 
						placeholder={this.state.modificaciones.Direccion}
						onChange={this.guardar_info}/>
				</div>
				<br/>
				<h5> Habilidades seleccionadas </h5>
				<hr></hr>
				<div>
					{skills}
				</div>
				</section>

				<section className="section_modal">

				<div>
					<h5>Contacto</h5>
					<hr></hr>
				</div>

				<div className="form_field">
					<label>Correo electrónico</label>
					<input type="email" 
						name="Correo_electronico" 
						placeholder={this.state.modificaciones.Correo_electronico}
						onChange={this.guardar_info}/>
				</div>

				<div className="form_field">
					<label>Teléfono 1</label>
					<input type="phone" 
						name="Telefono_uno" 
						placeholder={this.state.modificaciones.Telefono_uno}
						onChange={this.guardar_info}/>
				</div>

				<div className="form_field">
					<label>Teléfono 2</label>
					<input type="phone"
						name="Telefono_dos" 
						placeholder={this.state.modificaciones.Telefono_dos}
						onChange={this.guardar_info}/>
				</div>

				</section>

				<section className="section_modal">
				<div>
					<h5>Estado Solicitud</h5>
					<hr></hr>
				</div>
				<select 
					name="Estado_solicitud" 
					defaultValue={this.state.modificaciones.Estado_solicitud} 
					onChange={this.guardar_info}>
					<option value="Pendiente">Pendiente</option>
					<option value="Aprobado">Aprobado</option>
					<option value="Denegado">Denegado</option>
					<option value="Aprobado para seguro">Aprobado para seguro</option>
				</select>
				</section>

			</form>


			<div>
			<div className="group_line1">
				<div className="flex-btn">
				<button className="btn btn-primary" onClick={()=>{
					let entra = false;
					Object.keys(this.state.modificaciones).map(key => { 
						if(this.state.modificaciones[key] !== this.state.original[key]){
							entra = true;
							this.props.updateUser(this.props.campana, this.props.volunteerInfo.Cedula, key, this.state.modificaciones[key]);
							if(key === "Estado_solicitud"){
								enviar_correo_voluntario_aceptado(this.state.modificaciones.Correo_electronico,this.props.campana_nombre, this.props.volunteerInfo.Nombre);
							}
						}
					});
					if(entra){
						alert("Los valores han sido actualizados");
					}
					this.props.refrescar();

					this.props.onClose();
				}}> Guardar </button>
				</div>
				<div className="flex-btn">
				<button className="btn btn-default" onClick={()=>{this.props.onClose();}}> Cancelar </button>
				</div>
				</div>
			</div>
			</div>

			</div>

		</div>
		)
	}
}
