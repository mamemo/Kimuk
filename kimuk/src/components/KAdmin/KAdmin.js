/**
 * Archivo que contiene las funciones para mostrar el 
 * modo Administrador de un Voluntariado.
 */


import React, {
	Component
} from 'react';
import './KAdmin.css';
import '../style/color.css';
import {
	leer_campanas
} from "../DB/campaigns";
import {
	InCampanasKFormVoluntario,
	InEcargadosKFormVoluntario,
	InVoluntariosKFormAdmin,
	VisualizacionEncargados
} from "../DB/add-onns";
import KTable from '../KTable/KTable';
import * as database from "../DB/documentsAdmin";
import KInfoVoluntariado from '../KInfoVoluntariado/KInfoVoluntariado';

export default class KAdmin extends Component {

	constructor(props) {
		super(props);
		let id = props.url.split("?p=");
		this.state = {
			id_campana: id[0],
			admin_pass: id[1],
			campana: null,
			encargados: {},
			voluntarios: {},
			imgURL: ""
		};

	}

	/**
	 * Obtiene el voluntariado de la base de datos y 
	 * llena las variables con la información obtenida.
	 */
	componentDidMount() {
		leer_campanas(this.state.id_campana).then(result => {
			if (result && this.state.admin_pass && this.state.admin_pass === result.Admin_pass) {
				let in_campana = InCampanasKFormVoluntario(result);
				let in_encargados = InEcargadosKFormVoluntario(result);
				let in_voluntarios = {};
				if ('Voluntarios' in result) {
					in_voluntarios = InVoluntariosKFormAdmin(result);
				}
				this.setState({
					campana: in_campana,
					encargados: in_encargados,
					voluntarios: in_voluntarios
				});

				database.leer_url_documento_campana(this.state.id_campana, "Foto").then(result => {
					this.setState({
						imgURL: result
					});
				})

			} else {
				window.location.href = "http://localhost:3000";
			}
		});
	}

	/**
	 * Muestra los componentes deseados. 
	 * Actualiza la interfaz dependiendo de lo que pase en la aplicación.
	 */
	render() {
		if(this.state.campana != null){
			return (
				<div className="page_container">
					<KInfoVoluntariado campana={this.state.campana} vis_encargados={VisualizacionEncargados(this.state.encargados)}
					url={this.state.imgURL}/>
					<KTable rows={this.state.voluntarios} campana={this.state.campana} idcampana={this.state.id_campana}/>
				</div>
			);
		} else{
			return (
				<div className="page_container">

				</div>
			);
		}
	}
}