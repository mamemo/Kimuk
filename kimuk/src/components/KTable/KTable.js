import React, { Component } from 'react';
import './KTable.css';

//Imports for pop up
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

export default class KTable extends Component {
  constructor(props){
    super(props);

    this.state = {
      inputValue: '',
      voluntarios: this.props.rows
    };

    this.updateInputValue = this.updateInputValue.bind(this);
    this.filtrarEstado = this.filtrarEstado.bind(this);
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

  createTable = () => {
    let tableBody = [];

    const voluntarios = this.filterItemsSearchBar(this.state.inputValue);

    for(var i = 0; i < voluntarios.length; i++){
      if(voluntarios[i]){
        tableBody.push(<tr>
                        <td></td>
                        <td>{voluntarios[i].Nombre+' '+voluntarios[i].Primer_apellido+' '+voluntarios[i].Segundo_apellido}</td>
                        <td>{this.createStateCell(voluntarios[i].Estado_solicitud)}</td>
                        <td>{voluntarios[i].Ocupacion}</td>
                        <td>{voluntarios[i].Fecha_registro}</td>
                        <td><a href="#">Editar Información</a></td>
                        <td><input type="checkbox"/></td>
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

  filtrarEstado(evt){
    let newRows = [];

    switch (evt.target.name) {
      case 'Aprobados':
        newRows = this.filterItemsState('Aprobados');
        break;
      case 'No Aprobados':
        newRows = this.filterItemsState('No Aprobados');
        break;
      case 'Todos':
        newRows = this.props.rows;
        break;
      case 'Selección':
        newRows = this.filterItemsState('Selección');
        break;
      case 'Pendientes':
        newRows = this.filterItemsState('Pendientes');
        break;
      case 'Aprobados para seguro':
        newRows = this.filterItemsState('Aprobados para seguro');
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
        <input type='search' className="searchBar" value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)}/>
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

        <div>
          <button name="Aprobados" onClick={evt=>this.filtrarEstado(evt)}>Aprobados</button>
          <button name="No Aprobados" onClick={evt=>this.filtrarEstado(evt)}>No Aprobados</button>
          <button name="Todos" onClick={evt=>this.filtrarEstado(evt)}>Todos</button>
          <button name="Selección" onClick={evt=>this.filtrarEstado(evt)}>Selección</button>
          <button name="Pendientes" onClick={evt=>this.filtrarEstado(evt)}>Pendientes</button>
          <button name="Aprobados para seguro" onClick={evt=>this.filtrarEstado(evt)}>Aprobados para seguro</button>
        </div>

			</div>
    );
  }
}