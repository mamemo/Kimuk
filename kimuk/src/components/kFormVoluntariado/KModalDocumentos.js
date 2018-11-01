import React, { Component } from 'react';
import '../style/color.css';
import { Modal, Button } from 'react-bootstrap';
import KDocumentosCuerpo from './KDocumentosCuerpo'

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
        <p>Agregar Documemntos</p>

        <Button className="btn btn-primary btn-md" id="navigationButton" onClick={this.handleShow}>
          Si
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose} animation={false}>
            <Modal.Header>
              <Modal.Title>
                <p>Documentos</p>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <KDocumentosCuerpo

              campana = {{
                id:this.props.campana.id,
                subio:this.props.campana.subio,
                document:this.props.campana.document
               }}

               siguiente = {this.props.siguiente}
               anterior =  {this.props.anterior}

               handler = {this.props.handler}/>

            </Modal.Body>
            <Modal.Footer>
              <Button className="btn btn-primary" type="submit" onClick={this.props.siguiente}> Guardar Documentos</Button>
              <Button onClick={this.handleClose}>Cancelar</Button>
            </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
