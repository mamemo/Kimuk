import React, { Component } from 'react';
import '../style/color.css';
import { Button } from 'react-bootstrap';
import KDocumentosCuerpo from './KDocumentosCuerpo'
import Modal from 'react-modal';
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

export default class KModalDocumentos extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      show: false
    };

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }



  render() {
    return (
      <div>
        <Button className="btn btn-primary btn-md" id="navigationButton" onClick={this.handleShow}>
          Si
        </Button>

        <Modal
            isOpen={this.state.show}
            onRequestClose={this.closeModal}
            style={customStyles}>

            <div class="card-header">
              Selecciona los documentos deseadas
            </div>

            <br/>
            <KDocumentosCuerpo

                /*
                  let nombreDoc = "";
                        let progress = 0;
                        if(this.props.campana.subioCod)
                        {
                            nombreDoc = this.props.campana.documentCod;
                            progress = 100;
                        }
                 */
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
                <ReactTooltip id='btn-tooltip-Aceptar' type='info' effect='solid' place="right">
                    <span>Guardá tus documentos y continuá configurando tu voluntariado</span>
                </ReactTooltip>
              </div>

              <div className="flex-item">
                <button
                    className="btn btn-default"
                    onClick={this.handleClose}
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
