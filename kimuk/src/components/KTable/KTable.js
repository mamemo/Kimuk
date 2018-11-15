import React, { Component } from 'react';
import './KTable.css';
import KModalInfo from '../KModals/KModalInfo';
import { FaDownload, FaInfoCircle, FaSearch } from 'react-icons/fa';
import ReactTooltip from 'react-tooltip'

//Imports for pop up
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

import * as volunteers from '../DB/volunteers';
import KFormDocumentsBajadaVoluntario from "../KComponentsDocuments/KFormDocumentsBajadaVoluntario";

export default class KTable extends Component {
  constructor(props){
    super(props);

    this.state = {
      inputValue: '',
      voluntarios: this.props.rows,
      id_campana: this.props.idcampana,
    };

    this.updateInputValue = this.updateInputValue.bind(this);
    this.filtrarEstado = this.filtrarEstado.bind(this);

    this.voluntariosSeleccionados = [];
  }

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

  filterItemsState = (query) => {
    return this.props.rows.filter((el) =>
      el.Estado_solicitud === query
    );
  }

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

  updateUser(idCampana, idVoluntario, llave, valor) {
    volunteers.actualizar_voluntarios_campana(idCampana, idVoluntario, llave, valor);
  }

  createModal(userJson) {
    console.log(this.state.voluntarios[2].Habilidades);
    confirmAlert({
      customUI: ({onClose}) => {
        return(
            <KModalInfo
              volunteerInfo={userJson}
              campana={this.props.idcampana}
              updateUser={this.updateUser}
              habilidades={this.state.voluntarios[2].Habilidades}
              onClose={onClose}/>
        );
      }
    });
  }

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

  createTable = () => {
    let tableBody = [];
    //console.log(this.state.voluntarios[2].Habilidades);
    const voluntarios = this.filterItemsSearchBar(this.state.inputValue);

    for(var i = 0; i < voluntarios.length; i++){
      if(voluntarios[i]){
        tableBody.push(<tr>
                        <td></td>
                        <td>{voluntarios[i].Nombre+" "+voluntarios[i].Primer_apellido+" "+voluntarios[i].Segundo_apellido}</td>
                        <td>{this.createStateCell(voluntarios[i].Estado_solicitud)}</td>
                        <td>{voluntarios[i].Ocupacion}</td>
                        <td>{voluntarios[i].Fecha_registro}</td>
                        <td>
                          <button
                            className="btn btn-default"
                            data-tip data-for='info-tooltip'
                            onClick={this.createModal.bind(this, voluntarios[i])}>
                            <span className="icon_span"><FaInfoCircle/></span>
                             Información
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn btn-default"
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

  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }



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
            <table className="table table-hover">
              <thead>
                <tr>
                  <th></th>
                  <th>Nombre completo</th>
                  <th>Estado</th>
                  <th>Ocupación</th>
                  <th>Fecha de registro</th>
                  <th></th>
                  <th></th>
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
