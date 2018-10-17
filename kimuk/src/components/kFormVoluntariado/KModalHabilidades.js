import React, { Component } from 'react';
import '../style/color.css';
import '../KModals/KModalAddAdmin.css';
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
            <div className={"container"}>
                <button
                    type="button"
                    data-tip data-for='btn-tooltip-Si'
                    className="btn btn-primary btn-md"
                    onClick={this.openModal}
                >
                    Sí
                </button>
                <ReactTooltip id='btn-tooltip-Si' type='info' effect='solid' place="bottom">
                    <span>Si querés seleccionar habilidades para tu voluntariado dale click aquí</span>
                </ReactTooltip>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles}>
                    <h6> Seleccioná las habilidades que necesitás</h6>
                    <br/>
                    <KHabilidadesCuerpo habilidades={this.props.habilidades}/>
                    <br/> <br/>
                    <button
                        className="inside"
                        data-tip data-for='btn-tooltip-Aceptar'
                        onClick={this.props.siguiente}
                    >
                        Aceptar
                    </button>
                    <ReactTooltip id='btn-tooltip-Aceptar' type='info' effect='solid' place="right">
                        <span>Guardá tus habilidades y continuá configurando tu voluntariado</span>
                    </ReactTooltip>
                    <button
                        className="outside"
                        onClick={this.borraHabilidadesSeleccionadas}
                        data-tip data-for='btn-tooltip-CancelarBtn'
                    >
                        Cancelar
                    </button>
                    <ReactTooltip id='btn-tooltip-CancelarBtn' type='warning' effect='solid' place="top">
                        <span>Descartá todas las habilidades seleccionadas</span>
                    </ReactTooltip>
                    <button
                        type="button"
                        className="close"
                        aria-label="Close"
                        data-tip data-for='btn-tooltip-CancelarX'
                        onClick={this.borraHabilidadesSeleccionadas}
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <ReactTooltip id='btn-tooltip-CancelarX' type='warning' effect='solid' place="left">
                        <span>Descartá todas las habilidades seleccionadas</span>
                    </ReactTooltip>
                </Modal>
            </div>
        );
    }
}
