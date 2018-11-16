/**
 * Archivo que contiene el componente que muestra la ventana 
 * con información después de realizar una acción.
 */


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

    /**
     * Muestra la ventana.
     */
    openModal() {
        this.setState({modalIsOpen: true});
    }

    /**
     * Cierra la ventana.
     */
    closeModal() {
        this.setState({modalIsOpen: false});
        this.props.handler();
    }

    /**
     * Muestra en la ventana el mensaje de lo que pasó con la acción realizada.
     */
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

    /**
     * Una vez que ya esté lista la ventana, muestra el mensaje.
     */
    componentDidMount () {
        this.muestraMensaje();
    }

    /**
	 * Muestra los componentes deseados. 
	 * Actualiza la interfaz dependiendo de lo que pase en la aplicación.
	 */
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
                                    window.location.href ="https://kimuk-backend.firebaseapp.com";
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