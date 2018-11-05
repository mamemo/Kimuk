import React, { Component } from 'react';
import './KTable.css';
import KModalInfo from '../KModals/KModalInfo';

//Imports for pop up
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

import * as volunteers from '../DB/volunteers';

export default class KTable extends Component {
  constructor(props){
    super(props);

    this.state = {
      inputValue: '',
      voluntarios: this.props.rows
    };

    this.updateInputValue = this.updateInputValue.bind(this);
    this.filtrarEstado = this.filtrarEstado.bind(this);

    this.voluntariosSeleccionados = [];
  }

  filterItemsSearchBar = (query) => {
    if(query == "")
      return this.state.voluntarios;
    return this.state.voluntarios.filter((el) =>
      el.Nombre.replace(/\s/g,'').toLowerCase().indexOf(query.replace(/\s/g,'').toLowerCase()) > -1 ||
      el.Primer_apellido.replace(/\s/g,'').toLowerCase().indexOf(query.replace(/\s/g,'').toLowerCase()) > -1 ||
      el.Segundo_apellido.replace(/\s/g,'').toLowerCase().indexOf(query.replace(/\s/g,'').toLowerCase()) > -1 ||
      (el.Nombre+el.Primer_apellido+el.Segundo_apellido).replace(/\s/g,'').toLowerCase().indexOf(query.replace(/\s/g,'').toLowerCase()) > -1
    );
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

    else if(pState == 'No aprobado'){
      return <td className="no_aprobado">{pState}</td>
    }

    else if(pState == 'Aprobado para seguro'){
      return <td className="aprobado_seguro">{pState}</td>
    }
  }

  updateUser(idVoluntario, llave, valor) {
    volunteers.actualizar_voluntarios_campana(this.props.campana, idVoluntario, "Estado_solicitud", valor);
  }

  createModal(userJson) {
    confirmAlert({
      customUI: ({onClose}) => {
        return(
          <div>
            <KModalInfo volunteerInfo={userJson}/>

            <div>
              <button onClick={()=>{
                this.updateUser();
                onClose();
              }}>Guardar</button>
              <button onClick={()=>{
                onClose();
              }}>Cancelar</button>
            </div>
          </div>
          
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

    console.log(this.voluntariosSeleccionados);
  }

  createTable = () => {
    let tableBody = [];

    const voluntarios = this.filterItemsSearchBar(this.state.inputValue);

    for(var i = 0; i < voluntarios.length; i++){
      if(voluntarios[i]){
        tableBody.push(<tr>
                        <td></td>
                        <td>{voluntarios[i].Nombre+" "+voluntarios[i].Primer_apellido+" "+voluntarios[i].Segundo_apellido}</td>
                        <td>{this.createStateCell(voluntarios[i].Estado_solicitud)}</td>
                        <td>{voluntarios[i].Ocupacion}</td>
                        <td>{voluntarios[i].Fecha_registro}</td>
                        <td><button onClick={this.createModal.bind(this, voluntarios[i])}>Editar información</button></td>
                        <td><input type="checkbox" className="checkbox" onChange={this.handleCheck.bind(this, voluntarios[i])}/></td>
                      </tr>);
      }
    }

    return tableBody;
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
        newRows = this.filterItemsState('No Aprobado');
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
        <input 
          type='search' 
          className="searchBar" 
          value={this.state.inputValue} 
          onChange={evt => this.updateInputValue(evt)}
          placeholder='Buscá un voluntario por Nombre y/o Apellidos'/>

        <div className="table_container">
          <table className="volunteer_table">
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

          <div className="filter_container">
            <button name="Aprobados" onClick={evt=>this.filtrarEstado(evt)}>Aprobados</button>
            <button name="No Aprobados" onClick={evt=>this.filtrarEstado(evt)}>No Aprobados</button>
            <button name="Todos" onClick={evt=>this.filtrarEstado(evt)}>Todos</button>
            <button name="Selección" onClick={evt=>this.filtrarEstado(evt)}>Selección</button>
            <button name="Pendientes" onClick={evt=>this.filtrarEstado(evt)}>Pendientes</button>
            <button name="Aprobados para seguro" onClick={evt=>this.filtrarEstado(evt)}>Aprobados para seguro</button>
          </div>
        </div>

        <button onClick={this.exportCSVFile.bind(this, this.voluntariosSeleccionados, "voluntarios")}>Descargar seleccionados</button>

			</div>
    );
  }
}
