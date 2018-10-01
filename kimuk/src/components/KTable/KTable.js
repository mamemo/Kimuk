import React, { Component } from 'react';
import './KTable.css';

export default class KTable extends Component {
  constructor(props){
    super(props);

    console.log(this.filterItemsSearchBar('Luis Hidalgo'));
    console.log(this.filterItemsState('Pendiente'));
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

  createTable = () => {
    let table = [];
  }



  render() {
    return (
      <div className='members_container'>
        <input type='search' className="searchBar" />
        <button type="button">Buscar</button>
        <div>
          <table>
            {this.createTable()}
          </table>
        </div>
			</div>
    );
  }
}