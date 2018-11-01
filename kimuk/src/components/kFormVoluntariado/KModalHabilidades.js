import React, { Component } from 'react';
import '../style/color.css';
import './KFormVoluntariado.css';
import Modal from 'react-modal';
import KHabilidadesCuerpo from './KHabilidadesCuerpo';
import ReactTooltip from 'react-tooltip'

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        height                : '500px',
        transform             : 'translate(-50%, -50%)',
        overflow              : 'auto'
    }
};

export default class KModalHabilidades extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.borraHabilidadesSeleccionadas = this.borraHabilidadesSeleccionadas.bind(this);
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    borraHabilidadesSeleccionadas() {
        this.props.habilidades.splice(0, this.props.habilidades.length);
        this.closeModal();
    }

    render(){
        return (
            <div className="container_button">

              <div className="flex-item">

                <button
                    id="navigationButton"
                    className="btn btn-default"
                    data-tip data-for='btn-tooltip'
                    onClick={this.props.siguiente}
                >
                    No
                </button>
                <ReactTooltip id='btn-tooltip' type='warning' effect='solid' place="top">
                    <span>Si no querés seleccionar habilidades para tu voluntariado dale click aquí</span>
                </ReactTooltip>

              </div>

              <div className="flex-item">

                <button
                    id="navigationButton"
                    className="btn btn-primary"
                    data-tip data-for='btn-tooltip-Si'
                    onClick={this.openModal}
                >
                    Si
                </button>
                <ReactTooltip id='btn-tooltip-Si' type='info' effect='solid' place="top">
                    <span>Si querés seleccionar habilidades para tu voluntariado dale click aquí</span>
                </ReactTooltip>

              </div>

              <Modal
                  isOpen={this.state.modalIsOpen}
                  onRequestClose={this.closeModal}
                  style={customStyles}>

                  <div class="card-header">
                    Selecciona las habilidades deseadas
                  </div>

                  <br/>
                  <KHabilidadesCuerpo habilidades={this.props.habilidades}/>
                  <br/> <br/>

                  <div className="container_button">
                    <div className="flex-item">
                      <button
                          className="btn btn-primary"
                          data-tip data-for='btn-tooltip-Aceptar'
                          onClick={this.props.siguiente}
                      >
                          Aceptar
                      </button>
                      <ReactTooltip id='btn-tooltip-Aceptar' type='info' effect='solid' place="right">
                          <span>Guardá tus habilidades y continuá configurando tu voluntariado</span>
                      </ReactTooltip>
                    </div>

                    <div className="flex-item">
                      <button
                          className="btn btn-default"
                          onClick={this.borraHabilidadesSeleccionadas}
                          data-tip data-for='btn-tooltip-CancelarBtn'
                      >
                          Cancelar
                      </button>
                      <ReactTooltip id='btn-tooltip-CancelarBtn' type='warning' effect='solid' place="top">
                          <span>Descartá todas las habilidades seleccionadas</span>
                      </ReactTooltip>
                    </div>

                 </div>

              </Modal>

            </div>
        );
    }
}
