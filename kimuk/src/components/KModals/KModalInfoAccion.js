import React, { Component } from 'react';
import '../style/color.css';
import './KModalInfoAccion.css';
import Modal from 'react-modal';

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        transform             : 'translate(-50%, -50%)',
    }
};

export default class KModalHabilidades extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: true,
            mensajeUsuario: []
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.muestraMensaje = this.muestraMensaje.bind(this);
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    closeModal() {
        this.setState({modalIsOpen: false});
        this.props.handler();
    }

    muestraMensaje() {
        var resul = [];
        var arrayMensaje = this.props.mensaje.split("\n");
        for (var i = 0 ; i < arrayMensaje.length ; i++) {
            if (arrayMensaje[i] === "") {
                resul.push(<br/>);
            } else {
                resul.push(arrayMensaje[i]);
                resul.push(<br/>);
            }
        }
        this.setState({mensajeUsuario: resul});
    }

    componentDidMount () {
        this.muestraMensaje();
    }

    render(){
        return (
            <div className={"container"}>
                
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles}>
                    <h4 className="card-header">{this.props.tipoNotificacion}</h4>
                    <br/> <br/>
                    { this.state.mensajeUsuario }
                    <br/> <br/>
                    <div className={"container_modalInfoAccion"}>
                        <button
                            className="btn btn-primary"
                            onClick={() => {
                                this.closeModal();
                                if (this.props.tipoNotificacion.toLowerCase().indexOf("error") === -1) {
                                    window.location.href ="http://localhost:3000";
                                }
                            }}
                        >
                                Aceptar
                            </button>
                    </div>
                </Modal>
            </div>
        );
    }
}