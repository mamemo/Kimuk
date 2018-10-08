import React, { Component } from 'react';
import '../style/color.css';
import './formacion.css'
import Modal from 'react-modal'

let listaEncargadosMaster = [];
let listaEncargados = [];

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        position              : 'fixed',
        transform             : 'translate(-50%, -50%)',
    }
};

const selectStyle = {
    "border-radius": "6px",
    "font-size": "16px",
    width: "600px",
    height: "100%",
    "text-align": "center"
};

export default class KAdminEncargados extends Component
{
    constructor() {
        super();
        this.state = {
            modalIsOpen: false
        };
        this.agregarEncargado = this.agregarEncargado.bind(this);
        this.agregarLinea = this.agregarLinea.bind(this);
        this.quitarEncargado = this.quitarEncargado.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount(){
        listaEncargados = [];
        for(let k in listaEncargadosMaster)
        {
            listaEncargados.push(<table className="formacion">
                <tr>
                    <td className="form">{listaEncargadosMaster[k][0]}</td>
                    <td className="form">{listaEncargadosMaster[k][1]}</td>
                    <td className="form">{listaEncargadosMaster[k][2]}</td>
                    <td className="form">{listaEncargadosMaster[k][3]}</td>
                </tr>
                <button id={k} onClick={this.quitarEncargado} className="forma">-</button>
            </table>);
        }
        this.forceUpdate();
    }

    quitarEncargado(e){
        let id = parseInt(e.target.id);
        listaEncargadosMaster.splice(id, 1);
        this.componentDidMount();
    }

    agregarEncargado(){
        let titulo = ["Nuevo Lorem", "Nuevo Ipsum", "nuevo@lorem.com", "87891232"];
        listaEncargadosMaster.push(titulo);
        this.closeModal();
        this.componentDidMount();
    }

    agregarLinea(Nombre, Apellidos, Telefono, Correo){
        listaEncargados.push(
            <table className="formacion">
                <tr>
                    <td className="form">{Nombre}</td>
                    <td className="form">{Apellidos}</td>
                    <td className="form">{Telefono}</td>
                    <td className="form">{Correo}</td>
                </tr>
                <span> Modal content </span>
            </table>
        );
        this.forceUpdate();
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
                <h1 className="hform">Otros encargados:</h1>
                <a className="aform" href='javascript:' onClick={this.openModal}>Agregar encargados al voluntariado</a>

                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <h6>Nombre:</h6>
                    <input type="text" name="Nombre" placeholder="Nombre" />
                    <br/>
                    <br/>
                    <h6>Apellidos:</h6>
                    <input type="text" name="Apellidos" placeholder="Apellidos" />
                    <br/>
                    <br/>
                    <h6>Correo electrónico:</h6>
                    <input type="text" name="Correo" placeholder="Correo electrónico" />
                    <br/>
                    <br/>
                    <h6>Teléfono:</h6>
                    <input type="text" name="Telefono" placeholder="Teléfono" />
                    <br/>
                    <br/>
                    <button className="inside" onClick={this.agregarEncargado}>Aceptar</button>
                </Modal>

                <div>
                    <table class="title">
                        <tr>
                            <td>Nombre</td>
                            <td>Apellidos</td>
                            <td>Correo electrónico</td>
                            <td>Teléfono</td>
                        </tr>
                    </table>
                    <table className="formacion">
                        <tr>
                            <td className="form">Lorem</td>
                            <td className="form">Ipsum</td>
                            <td className="form">lorem@ipsum.com</td>
                            <td className="form">88989898</td>
                        </tr>
                        <button onClick={this.agregarEncargado} className="forma">-</button>
                    </table>
                </div>
                <div>
                    {listaEncargados}
                </div>
                <br/> <br/> <br/>
            </div>
        );
    }
}