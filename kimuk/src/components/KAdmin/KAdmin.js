import React, { Component } from 'react';
import './KAdmin.css';
import '../style/color.css';
import KInfoVoluntariado from '../KInfoVoluntariado/KInfoVoluntariado';
import {leer_campanas} from "../DB/campaigns";
import {InCampanasKFormVoluntario, InEcargadosKFormVoluntario, InVoluntariosKFormAdmin, VisualizacionEncargados} from "../DB/add-onns";
import KTable from '../KTable/KTable';
import * as database from "../DB/documentsAdmin";

export default class KAdmin extends Component {

	constructor(props) {
		super(props);
		this.state = {id_campana : props.url,
									campana : null,
									encargados : {},
									voluntarios : {},
			imgURL: ""
								};
		
	}


	componentDidMount(){
		leer_campanas(this.state.id_campana).then(result => {



			if(result){
				let in_campana = InCampanasKFormVoluntario(result);
				let in_encargados = InEcargadosKFormVoluntario(result);
				let in_voluntarios = {};
				if ('Voluntarios' in result){
					in_voluntarios = InVoluntariosKFormAdmin(result);
				}
				this.setState({campana:in_campana,
											encargados:in_encargados,
											voluntarios : in_voluntarios
				});

                database.leer_url_documento_campana(this.state.id_campana, "Foto").then(result => {
                    this.setState({
                        imgURL: result
                    });
                })

			} else{
				window.location.href = "http://localhost:3000";
			}
		});
	}

	render() {		
		if(this.state.campana != null){
			return (
				<div className="page_container">
					<KInfoVoluntariado campana={this.state.campana} vis_encargados={VisualizacionEncargados(this.state.encargados)}
					url={this.state.imgURL}/>
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
