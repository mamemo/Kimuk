import React, { Component } from 'react';
import './KAdmin.css';
import '../style/color.css';
import KInfoVoluntariado from '../KInfoVoluntariado/KInfoVoluntariado';
import {leer_campanas} from "../DB/campaigns";
import {InCampanasKFormVoluntario, InEcargadosKFormVoluntario, InVoluntariosKFormAdmin, VisualizacionEncargados} from "../DB/add-onns";
import KTable from '../KTable/KTable';

export default class KAdmin extends Component {

	constructor(props) {
		super(props);
		this.state = {id_campana : props.url,
									campana : null,
									encargados : {},
									voluntarios : {}
								};
		console.log(props.url);
		
	}

	componentDidMount(){
		leer_campanas(this.state.id_campana).then(result => {
			let in_campana = InCampanasKFormVoluntario(result);
			let in_encargados = InEcargadosKFormVoluntario(result);
			let in_voluntarios = InVoluntariosKFormAdmin(result);
			this.setState({campana:in_campana,
										encargados:in_encargados,
										voluntarios : in_voluntarios
			});
		});
	}

	render() {		
		if(this.state.campana != null){
			return (
				<div className="page_container">

					<KInfoVoluntariado campana={this.state.campana} vis_encargados={VisualizacionEncargados(this.state.encargados)}/>
					<KTable rows={this.state.voluntarios}/>
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
