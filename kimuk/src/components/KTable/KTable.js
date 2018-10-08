import React, { Component } from 'react';
import './KTable.css';

//Imports for pop up
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

export default class KTable extends Component {
  constructor(props){
    super(props);

    //console.log(this.filterItemsSearchBar('Luis Hidalgo'));
    //console.log(this.filterItemsState('Pendiente'));
  }

  filterItemsSearchBar = (query) => {
    return this.props.rows.filter((el) =>
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

    const voluntarios = this.props.rows;

    console.log(voluntarios);

    for(var i = 1; i < voluntarios.length; i++){
      if(voluntarios[i]){
        tableBody.push(<tr>
                        <td></td>
                        <td>{voluntarios[i].Nombre}</td>
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



  render() {
    return (
      <div className='members_container'>
        <input type='search' className="searchBar" />
        <button type="button">Buscar</button>

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

			</div>
    );
  }
}