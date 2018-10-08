import React, { Component } from 'react';
import './KFormVoluntariado.css';
import '../style/color.css';
import '../style/general.css'
import KHeaderVoluntariado from './KHeaderVoluntariado';

export default class KTeryCon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "Agrega los términos y condiciones que posee tu voluntariado",
    };

  }

  /*
   * Description Component
   * Parts: Description
   */
   termsAndConditions() {
     return (
       <div>
         <br />
         <div className="form-group">
          <label for="description"> Términos y condiciones: </label>
          <textarea
             id="description"
             value={this.state.value}
             onChange={this.handleInputChange}
             className="form-control"
             rows="10" />
         </div>
       </div>
     );
   }

  render(){
    return(
      <div className="container">
        <div>
          <KHeaderVoluntariado />
          {this.termsAndConditions()}
        </div>
        <div className="row">
            <div className="col-1 offset-2">
                <button id="navigationButton" className="btn btn-dafault btn-md" onClick={ this.props.anterior }>Anterior</button>
            </div>
            <div className="col-1 offset-6">
                <button id="navigationButton" className="btn btn-primary btn-md" >Crear</button>
            </div>
        </div>
      </div>
    );
  }
}
