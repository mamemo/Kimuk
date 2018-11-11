import React, { Component } from 'react';
import './KFormVoluntariado.css';
import '../style/color.css';
import '../style/general.css'
import ReactTooltip from 'react-tooltip'
import { FaLongArrowAltLeft, FaCheck} from 'react-icons/fa';

export default class KTeryCon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      haventContain: !this.hayTextoEnTyC()
    };

    this.hayTextoEnTyC = this.hayTextoEnTyC.bind(this);
    this.updateButtonCrear = this.updateButtonCrear.bind(this);
  }
  /**
   * Verifica si hay texto guardado en
   * la variable de entrada tyc
   */
  hayTextoEnTyC () {
    if (this.props.tyc !== "") {
      return true;
    } else {
      return false;
    }
  }

  updateButtonCrear(event) {
    var varDisabled;
    if (event.target.value !== "") {
      varDisabled = false;
    } else {
      varDisabled = true;
    }
    this.setState({haventContain: varDisabled});
  }

  /*
   * Description Component
   * Parts: Description
   */
   termsAndConditions() {
     return (<div className="flex-item-hab">
               <div className="form-group">
                  <label for="termsAndConditions" data-tip data-for='must-tooltip'>
                    Términos y condiciones:
                    <span id="must-tooltip" className = "red"> * </ span>
                  </label>
                  <div className="text-center">
                    <div clasName="container">

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
              </div>
           </div>
     );
   }

  render(){
    return(
      <div className="container_term">
        <div className="container-terycon">
          {this.termsAndConditions()}
          <div className="row">
              <div className="col-1 offset-2">
                  <button
                    data-tip data-for='btn-tooltip'
                    className="btn btn-dafault"
                    onClick={ this.props.anterior }> <FaLongArrowAltLeft/> Anterior </button>
              </div>
              <ReactTooltip id='btn-tooltip' type='warning' effect='solid' place="top">
                  <span>Regresá a la sección de selección de documentos</span>
              </ReactTooltip>
              <div className="col-1 offset-6">
                  <button
                    data-tip data-for='btn-tooltip2'
                    className="btn btn-success"
                    disabled={this.state.haventContain}
                    onClick={this.props.insertInDB}> <FaCheck/> Crear
                  </button>
              </div>
              <ReactTooltip id='btn-tooltip2' type='success' effect='solid' place="top">
                  <span>Terminá la configuración y crea el voluntariado</span>
              </ReactTooltip>
          </div>
          <br/>
          <br/>
        </div>
        <ReactTooltip id='must-tooltip' type='error' effect='solid'>
          <span>
            Campo Obligatorio
          </span>
        </ReactTooltip>
      </div>
    );
  }
}
