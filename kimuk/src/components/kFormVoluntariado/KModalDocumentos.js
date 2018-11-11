import React, { Component } from 'react';
import '../style/color.css';
import './KModalDocumentos.css'
import { Button } from 'react-bootstrap';
import KDocumentosCuerpo from './KDocumentosCuerpo'
import Modal from 'react-modal';
import ReactTooltip from 'react-tooltip'

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : '-30%',
        bottom                : 'auto',
        height                : '500px',
        transform             : 'translate(-50%, -50%)',
        overflow              : 'auto'
    }
};

export default class KModalDocumentos extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
      this.setState({modalIsOpen: true});
  }

  closeModal() {
      this.setState({modalIsOpen: false});
  }



  render() {
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
                <span>Si no querés seleccionar documentos para tu voluntariado dale click aquí</span>
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
                <span>Si querés seleccionar documentos para tu voluntariado dale click aquí</span>
            </ReactTooltip>

          </div>

          <Modal
              isOpen={this.state.modalIsOpen}
              onRequestClose={this.closeModal}
              style={customStyles}>

              <div class="card-header">
                Selecciona los documentos deseados
              </div>

              <br/>

              <KDocumentosCuerpo

                campana = {{
                  id:this.props.campana.id,
                  subio:this.props.campana.subio,
                  document:this.props.campana.document,

                    subioCod:this.props.campana.subioCod,
                    documentCod:this.props.campana.documentCod

                 }}

                 siguiente = {this.props.siguiente}
                 anterior =  {this.props.anterior}

                 handler = {this.props.handler} />

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
                  <ReactTooltip id='btn-tooltip-Aceptar' type='info' effect='solid' place="top">
                      <span>Guardá tus documentos y continuá configurando tu voluntariado</span>
                  </ReactTooltip>
                </div>

                <div className="flex-item">
                  <button
                      className="btn btn-default"
                      onClick={this.closeModal}
                      data-tip data-for='btn-tooltip-CancelarBtn'
                  >
                      Cancelar
                  </button>
                  <ReactTooltip id='btn-tooltip-CancelarBtn' type='warning' effect='solid' place="top">
                      <span>Descartá todos los documentos seleccionados</span>
                  </ReactTooltip>
                </div>
             </div>

          </Modal>

        </div>
    );
  }
}
