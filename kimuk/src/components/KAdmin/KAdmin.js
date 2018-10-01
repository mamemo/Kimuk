import React, { Component } from 'react';
import './KAdmin.css';
import '../style/color.css';
import KInfoVoluntariado from '../KInfoVoluntariado/KInfoVoluntariado';
import {leer_campanas} from "../DB/campaigns";
import {InCampanasKFormVoluntario, InEcargadosKFormVoluntario, InVoluntariosKFormAdmin, VisualizacionEncargados} from "../DB/add-onns";

const JsonTable = require('ts-react-json-table');

var items = [
  {"id": 75950,"name": "Louella Wallace","age": 24,"phone": "+44 (0)203 437 7302","color": "green"},
  {"id": 80616,"name": "Hanson Perry","age": 36,"phone": "+44 (0)203 279 3708","color": "brown"},
  {"id": 77621,"name": "Brandi Long","age": 20,"phone": "+44 (0)203 319 4880","color": "gray"},
  {"id": 81299,"name": "Tonia Sykes","age": 38,"phone": "+44 (0)208 328 3671","color": "blue"},
  {"id": 14225,"name": "Leach Durham","age": 23,"phone": "+44 (0)208 280 9572","color": "green"}
];
export default class KAdmin extends Component {

	constructor(props) {
		super(props);
		this.state = {id_campana : 7812303,
									campana : null,
									encargados : {},
									voluntarios : {}
								};
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

					<div className='members_container'>
						<input type='search' className="searchBar" />
						<button type="button">Buscar</button>
						<div>
							<JsonTable rows={this.state.voluntarios}/>
						</div>
					</div>
				</div>
			);
		} else{
			return (
				<div className="page_container">

						<div className='members_container'>
							<input type='search' className="searchBar" />
							<button type="button">Buscar</button>
							<div>
								
							</div>
						</div>
					</div>
			);
		}
	}
}