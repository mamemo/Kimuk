import React, { Component } from 'react';
import '../style/color.css';
import { Modal, Button } from 'react-bootstrap';
import KHabilidadesCuerpo from './KHabilidadesCuerpo'

export default class KModalHabilidades extends Component {
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
        <p>Agregar otros encargados al voluntariado</p>

        <Button className="btn btn-primary btn-md" id="navigationButton" onClick={this.handleShow}>
          Si
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose} animation={false}>
            <Modal.Header>
              <Modal.Title>Seleccione habilidades para voluntarios</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <KHabilidadesCuerpo/>
            </Modal.Body>
            <Modal.Footer>
              <Button className="btn btn-primary" type="submit" onClick={this.props.siguiente}> Guardar habilidades</Button>
              <Button onClick={this.handleClose}>Cancelar</Button>
            </Modal.Footer>
        </Modal>
      </div>
    );
  }
}