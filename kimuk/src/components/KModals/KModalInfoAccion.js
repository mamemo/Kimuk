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
        height                : '500px',
        width                 : '700px',
        transform             : 'translate(-50%, -50%)',
        overflow              : 'auto'
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
                    <h6>{this.props.tipoNotificacion}</h6>
                    <br/>
                    <h4>{this.props.tipoNotificacion}</h4>
                    <br/> <br/>
                    
                    { this.state.mensajeUsuario }

                    <br/> <br/>
                    <button
                        className="inside"
                        data-tip data-for='btn-tooltip-Aceptar'
                        onClick={() => {
                            this.closeModal();
                            if (this.props.tipoNotificacion.indexOf("Error") === -1) {
                                window.location.href ="http://localhost:3000";
                            }
                        }}
                    >
                        Aceptar
                    </button>
                    <button
                        type="button"
                        className="close"
                        aria-label="Close"
                        data-tip data-for='btn-tooltip-CancelarX'
                        onClick={this.closeModal}
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </Modal>
            </div>
        );
    }
}