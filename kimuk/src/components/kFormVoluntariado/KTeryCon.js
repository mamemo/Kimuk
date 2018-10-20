import React, { Component } from 'react';
import './KFormVoluntariado.css';
import '../style/color.css';
import '../style/general.css'
import ReactTooltip from 'react-tooltip';

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

  //  <textarea
  //             id='description'
  //             name='description'
  //             placeholder='Por favor ingrese descripción del voluntariado'
  //             value={this.props.campana.description}
  //             onChange={this.props.handler}
  //             className="form-control"
  //           />

  render(){
    return(
      <div className="container">
        <div>
          {this.termsAndConditions()}
        </div>
        <div className="row">
            <div className="col-1 offset-2">
                <button 
                    id="navigationButton" 
                    data-tip data-for='btn-tooltip'
                    className="btn btn-dafault btn-md" 
                    onClick={ this.props.anterior }
                >
                    Anterior
                </button>
            </div>
            <ReactTooltip id='btn-tooltip' type='info' effect='solid' place="right">
                <span>Regresá a la sección de selección de documentos</span>
            </ReactTooltip>
            <div className="col-1 offset-6">
                <button 
                    id="navigationButton" 
                    className="btn btn-primary btn-md" 
                    data-tip data-for='btn-tooltip2' 
                >
                    Crear
                </button>
            </div>
            <ReactTooltip id='btn-tooltip2' type='warning' effect='solid' place="right">
                <span>Termina la configuración y crea tu voluntariado</span>
            </ReactTooltip>
        </div>
      </div>
    );
  }
}
