import React, { Component } from 'react';
import './KFormVoluntariado.css';
import '../style/color.css';
import { Glyphicon } from 'react-bootstrap';
import KHeaderVoluntariado from './KHeaderVoluntariado';

export default class KInfoVolutariado extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "Por favor ingrese descripción del voluntariado",
    };
    //this.handleInputChange = this.handleInputChange.bind(this);

  }

 /* Function handle on change event inpunts
 handleInputChange(){
   const target = event.target;
   const name = target.name;

   this.setState({
     [name]: value
   });
 }*/

  /*
   * Description Component
   * Parts: Description
   */
   descriptionData() {
     return (
       <div>
         <br />
         <div className="form-group">
          <label for="description"> Descripción: </label>
          <textarea
             id="description"
             value={this.state.value}
             onChange={this.handleInputChange}
             className="form-control"/>
         </div>
       </div>
     );
   }

  render(){
    return (
      <div className="container">
        <div>
          <KHeaderVoluntariado />
          {this.descriptionData()}
        </div>
        <div className="row">
          <div className="col-1 offset-9">
          <button type="button" className="btn btn-primary" onClick={ this.props.siguiente } >
            <Glyphicon glyph="menu-righ" /> Continuar
          </button>
          </div>
        </div>

      </div>
    );
  }
}
