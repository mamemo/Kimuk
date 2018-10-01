import React, { Component } from 'react';
import './KTable.css';

export default class KTable extends Component {
  constructor(props){
    super(props);
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