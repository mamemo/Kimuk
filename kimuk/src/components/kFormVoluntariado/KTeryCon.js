import React, { Component } from 'react';
import './KFormVoluntariado.css';
import '../style/color.css';
import '../style/general.css'
import ReactTooltip from 'react-tooltip'

export default class KTeryCon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      haventContain: true
    };

    this.updateButtonCrear = this.updateButtonCrear.bind(this);
  }

  updateButtonCrear(event) {
    if (event.target.value !== "") {
      var varDisabled = false;
    } else {
      var varDisabled = true;
    }
    this.setState({haventContain: varDisabled});
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
          <label for="termsAndConditions"> Términos y condiciones: </label>
          <textarea
             id="termsAndConditions"
             name="termsAndConditions"
             placeholder="Agrega los términos y condiciones que posee tu voluntariado"
             value={this.props.tyc}
             onChange={(event) => {
              this.props.handler(event);
              this.updateButtonCrear(event);
             }}
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
          {this.termsAndConditions()}
        </div>
        <div className="row">
            <div className="col-1 offset-2">
                <button
                  id="navigationButton"
                  data-tip data-for='btn-tooltip'
                  className="btn btn-dafault btn-md"
                  onClick={ this.props.anterior }> Anterior </button>
            </div>
            <ReactTooltip id='btn-tooltip' type='info' effect='solid' place="bottom">
                <span>Regresá a la sección de selección de documentos</span>
            </ReactTooltip>
            <div className="col-1 offset-6">
                <button
                  id="navigationButton"
                  data-tip data-for='btn-tooltip2'
                  className="btn btn-primary btn-md"
                  disabled={this.state.haventContain}
                  onClick={this.props.insertInDB}>Crear</button>
            </div>
            <ReactTooltip id='btn-tooltip2' type='warning' effect='solid' place="bottom">
                <span>Termina la configuración y crea el voluntariado</span>
            </ReactTooltip>
        </div>
      </div>
    );
  }
}