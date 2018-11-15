/**
 * Archivo que contiene los componentes que se muestran 
 * en el modo Administrador.
 * La tabla con los voluntarios, la barra de búsqueda y 
 * los botones de filtrado por estado de solicitud.
 */


import React, { Component } from 'react';
import './KTable.css';
import KModalInfo from '../KModals/KModalInfo';
import { FaDownload, FaInfoCircle, FaSearch } from 'react-icons/fa';
import ReactTooltip from 'react-tooltip'

//Imports for pop up
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

import * as volunteers from '../DB/volunteers';
import KFormDocumentsBajadaVoluntario from "../KComponentsDocuments/KFormDocumentsBajadaVoluntario";
import {leer_campanas} from "../DB/campaigns";
import {InVoluntariosKFormAdmin} from '../DB/add-onns';

export default class KTable extends Component {
	constructor(props){
		super(props);

		this.state = {
			inputValue: '',
			voluntarios: this.props.rows,
			id_campana: this.props.idcampana,
			user: []
		};

		this.updateInputValue = this.updateInputValue.bind(this);
		this.filtrarEstado = this.filtrarEstado.bind(this);
		this.mostrarInfoVoluntario = this.mostrarInfoVoluntario.bind(this);
		this.voluntariosSeleccionados = [];
	}

	/**
	 * Función para filtrar los voluntarios según lo 
	 * que se escribe en la barra de búsqueda.
	 * SOLO filtra por nombre.
	 * @param query Lo que se quiere buscar.
	 */
	filterItemsSearchBar = (query) => {
		if(this.state.voluntarios.length){
		if(query == "")
			return this.state.voluntarios;
		return this.state.voluntarios.filter((el) =>
			el.Nombre.replace(/\s/g,'').toLowerCase().indexOf(query.replace(/\s/g,'').toLowerCase()) > -1 ||
			el.Primer_apellido.replace(/\s/g,'').toLowerCase().indexOf(query.replace(/\s/g,'').toLowerCase()) > -1 ||
			el.Segundo_apellido.replace(/\s/g,'').toLowerCase().indexOf(query.replace(/\s/g,'').toLowerCase()) > -1 ||
			(el.Nombre+el.Primer_apellido+el.Segundo_apellido).replace(/\s/g,'').toLowerCase().indexOf(query.replace(/\s/g,'').toLowerCase()) > -1
		);
		}
		return this.state.voluntarios;
	}

	/**
	 * Función para filtrar los voluntarios según el 
	 * estado de su solicitud.
	 * @param query Lo que se quiere buscar.
	 */
	filterItemsState = (query) => {
		return this.props.rows.filter((el) =>
		el.Estado_solicitud === query
		);
	}

	/**
	 * Función para hacer el componente que muestra el estado 
	 * de solictud de un voluntario, en la tabla.
	 * @param pState El estado de la solicitud
	 */
	createStateCell = (pState) => {
		if(pState == 'Pendiente') {
		return <td className="pendiente">{pState}</td>
		}

		else if(pState == 'Aprobado'){
		return <td className="aprobado">{pState}</td>
		}

		else if(pState == 'Denegado'){
		return <td className="no_aprobado">{pState}</td>
		}

		else if(pState == 'Aprobado para seguro'){
		return <td className="aprobado_seguro">{pState}</td>
		}
	}

	/**
	 * Método para actualizar un campo de un voluntario.
	 * @param idCampana El ID de la campaña.
	 * @param idVoluntario La identificación del voluntario.
	 * @param llave El nombre del campo a actualizar.
	 * @param valor El valor de lo que se actualiza.
	 */
	updateUser(idCampana, idVoluntario, llave, valor) {
		volunteers.actualizar_voluntarios_campana(idCampana, idVoluntario, llave, valor);
	}

	/**
	 * Función para crear una ventana con la información del voluntario.
	 * @param userJson La información del voluntario.
	 */
	createModal(userJson) {
		confirmAlert({
		customUI: ({onClose}) => {
			return(
				<KModalInfo
				volunteerInfo={userJson}
				campana={this.props.idcampana}
				campana_nombre={this.props.campana[0]}
				updateUser={this.updateUser}
				habilidades={userJson.Habilidades}
				onClose={onClose}
				refrescar={this.mostrarInfoVoluntario}/>
			);
		}
		});
		
	}

	mostrarInfoVoluntario(){
		leer_campanas(this.state.id_campana).then(result => {
			let in_voluntarios = {};
			if ('Voluntarios' in result) {
				in_voluntarios = InVoluntariosKFormAdmin(result);
			}
			this.setState({
				voluntarios: in_voluntarios
			});
		});
	}

	/**
	 * Método para controlar la selección de un voluntario.
	 * @param userJson La información del voluntario.
	 */
	handleCheck(userJson){
		if(this.voluntariosSeleccionados.includes(userJson)){
		this.voluntariosSeleccionados = this.voluntariosSeleccionados.filter((value, index, arr) => {
			return value != userJson;
		});
		}
		else{
		this.voluntariosSeleccionados.push(userJson);
		}
	}

	/**
	 * Método para crear la tabla que muestra los voluntarios.
	 */
	createTable = () => {
		let tableBody = [];
		//console.log(this.state.voluntarios[2].Habilidades);
		const voluntarios = this.filterItemsSearchBar(this.state.inputValue);

		for(var i = 0; i < voluntarios.length; i++){
		if(voluntarios[i]){
			tableBody.push(<tr>
							<td>{voluntarios[i].Nombre+" "+voluntarios[i].Primer_apellido+" "+voluntarios[i].Segundo_apellido}</td>
							<td>{this.createStateCell(voluntarios[i].Estado_solicitud)}</td>
							<td>{voluntarios[i].Ocupacion}</td>
							<td>{voluntarios[i].Fecha_registro}</td>
							<td>
							<button
								className="btn btn-link"
								data-tip data-for='info-tooltip'
								onClick={this.createModal.bind(this, voluntarios[i])}>
								<span className="icon_span"><FaInfoCircle/></span>
								Información
							</button>
							</td>
							<td>
							<button
								className="btn btn-link"
								data-tip data-for='down-doc-tooltip'
								onClick={this.abrirDocumentos.bind(this, voluntarios[i])}>
								<span className="icon_span"><FaDownload/></span>
								Descargar documentos
							</button>
							</td>
							<td>
							<input
								type="checkbox"
								className="checkbox"
								data-tip data-for='check-vol-tooltip'
								onChange={this.handleCheck.bind(this, voluntarios[i])}/>
							</td>
						</tr>);
		}
		}

		return tableBody;
	}

	/**
	 * Método que abre los documentos de un voluntario.
	 * @param voluntario La información del voluntario.
	 */
	abrirDocumentos(voluntario)
	{
		confirmAlert({
		customUI: ({onClose}) => {
			return(
			<KFormDocumentsBajadaVoluntario
				campana={this.props.idcampana}
				voluntario={{cedula: voluntario["Cedula"]}}
				onClose={onClose}/>
			);
		}
		});
	}

	/**
	 * Método que actualiza la barra de búsqueda.
	 */
	updateInputValue(evt) {
		this.setState({
			inputValue: evt.target.value
		});
	}

	/**
	 * Método que convierte un objeto a un CSV.
	 * @param objArray El objeto a transformar.
	 */
	convertToCSV(objArray) {
		var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
		var str = '';

		for (var i = 0; i < array.length; i++) {
			var line = '';
			for (var index in array[i]) {
				if (line != '') line += ','

				line += array[i][index];
			}

			str += line + '\r\n';
		}

		return str;
	}

	/**
	 * Método para descargar la información de los 
	 * voluntarios seleccionados.
	 * @param items La información de los voluntarios.
	 * @param fileTitle El nombre del documento.
	 */
	exportCSVFile(items, fileTitle) {

		// Convert Object to JSON
		var jsonObject = JSON.stringify(items);

		var csv = this.convertToCSV(jsonObject);

		var exportedFilenmae = fileTitle + '.csv' || 'export.csv';

		var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
		if (navigator.msSaveBlob) { // IE 10+
			navigator.msSaveBlob(blob, exportedFilenmae);
		} else {
			var link = document.createElement("a");
			if (link.download !== undefined) { // feature detection
				// Browsers that support HTML5 download attribute
				var url = URL.createObjectURL(blob);
				link.setAttribute("href", url);
				link.setAttribute("download", exportedFilenmae);
				link.style.visibility = 'hidden';
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
			}
		}
	}

	/**
	 * Método que controla cuando un botón para 
	 * filtrar por estado es presionado.
	 */
	filtrarEstado(evt){
		let newRows = [];

		switch (evt.target.name) {
		case 'Aprobados':
			newRows = this.filterItemsState('Aprobado');
			break;
		case 'No Aprobados':
			newRows = this.filterItemsState('Denegado');
			break;
		case 'Todos':
			newRows = this.props.rows;
			break;
		case 'Selección':
			newRows = this.filterItemsState('Selección');
			break;
		case 'Pendientes':
			newRows = this.filterItemsState('Pendiente');
			break;
		case 'Aprobados para seguro':
			newRows = this.filterItemsState('Aprobado para seguro');
			break;

		default:
			break;
		}

		this.setState({
		voluntarios : newRows
		});
	}

	/**
	 * Muestra los componentes deseados. 
	 * Actualiza la interfaz dependiendo de lo que pase en la aplicación.
	 */
	render() {
		return (
		<div className='members_container'>

			<div className="searchBar">
			<div className="input-group mb-3">
				<input
				type='search'
				className="form-control"
				value={this.state.inputValue}
				onChange={evt => this.updateInputValue(evt)}
				data-tip data-for='search-tooltip'
				placeholder='Buscá un voluntario por Nombre y/o Apellidos'/>
				<div className="input-group-append">
				<span className="input-group-text"><FaSearch/></span>
				</div>
			</div>
			<ReactTooltip id='search-tooltip' type='info' effect='solid' place="top">
				<span>
					Puedes buscar solicitudes de voluntarios específicos,
					<br/>
					mediante su nombre y/o apellidos.
				</span>
			</ReactTooltip>
			</div>

			<div className="table_container">

			<div className="btn-gr text-center" data-tip data-for='btn-gr-tooltip'>
				<div className="btn-group btn-group-justified">
				<button type="button" class="btn btn-dark" name="Aprobados" onClick={evt=>this.filtrarEstado(evt)}>Aprobados</button>
				<button type="button" class="btn btn-dark" name="No Aprobados" onClick={evt=>this.filtrarEstado(evt)}>No Aprobados</button>
				<button type="button" class="btn btn-dark" name="Todos" onClick={evt=>this.filtrarEstado(evt)}>Todos</button>
				<button type="button" class="btn btn-dark" name="Pendientes" onClick={evt=>this.filtrarEstado(evt)}>Pendientes</button>
				</div>

				<ReactTooltip id='btn-gr-tooltip' type='info' effect='solid' place="top">
					<span>Filtrá las solicitudes según su estado</span>
				</ReactTooltip>

			</div>

			<div class="table-responsive">
				<table className="table table-hover table-sm">
				<thead>
					<tr>
					<th className="left">Nombre completo</th>
					<th className="left">Estado</th>
					<th className="left">Ocupación</th>
					<th className="left">Fecha de registro</th>
					<th className="left"></th>
					<th className="left"></th>
					</tr>
				</thead>
				{this.createTable()}
				</table>
			</div>

			</div>
			<br />
			<button
			className="btn btn-primary"
			data-tip data-for='down-tooltip'
			onClick={this.exportCSVFile.bind(this, this.voluntariosSeleccionados, "voluntarios")}>
			Descargar seleccionados
			</button>
			<br />
			<br />
			<ReactTooltip id='down-tooltip' type='info' effect='solid' place="top">
				<span>
				Descargá las solicitudes seleccionadas.
				<br/>
				Se generará un archivo con la información de
				<br />
				las solicitudes de los voluntarios.
				</span>
			</ReactTooltip>
			<ReactTooltip id='info-tooltip' type='info' effect='solid' place="top">
				<span>
				Puedes ver y editar la información de la solicitud
				<br/>
				del candidato a voluntario seleccionado.
				</span>
			</ReactTooltip>
			<ReactTooltip id='down-doc-tooltip' type='info' effect='solid' place="top">
				<span>
				Puedes descargar los documentos adjuntados por el
				<br/>
				candidato a voluntario seleccionado.
				</span>
			</ReactTooltip>
			<ReactTooltip id='check-vol-tooltip' type='info' effect='solid' place="top">
				<span>
				Seleccioná esta solicitud
				</span>
			</ReactTooltip>
				</div>
		);
	}
}
