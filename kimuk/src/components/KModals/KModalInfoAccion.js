import React, { Component } from 'react';
import '../style/color.css';
import './KModalAddAdmin.css';
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

export default class KModalHabilidades extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: true
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

    render(){
        return (
            <div className={"container"}>
                
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles}>
                    <h6>{this.props.text}</h6>
                    <br/>
                    <h4>{this.props.text}</h4>
                    <br/> <br/>
                    <button
                        className="inside"
                        data-tip data-for='btn-tooltip-Aceptar'
                        onClick={this.closeModal}
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