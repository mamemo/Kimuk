import React, { Component } from 'react';
import './KFormVoluntario.css';
import '../style/color.css';
import './formacion.css'
import Popup from 'reactjs-popup'
import Modal from 'react-modal'

let listaTitulos = [];

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

export default class KFormacionAcademica extends Component
{
    constructor() {
        super();
        this.state = {
            modalIsOpen: false
        };
        this.agregarTitulo = this.agregarTitulo.bind(this);
        this.agregarLinea = this.agregarLinea.bind(this);
        this.quitarTitulo = this.quitarTitulo.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount(){
        listaTitulos = [];
        for(let k in this.props.voluntario.formacion)
        {
            listaTitulos.push(<table className="formacion">
                <tr>
                    <td className="form">{this.props.voluntario.formacion[k][0]}</td>
                    <td className="form">{this.props.voluntario.formacion[k][1]}</td>
                    <td className="form">{this.props.voluntario.formacion[k][2]}</td>
                    <td className="form">{this.props.voluntario.formacion[k][3]}</td>
                </tr>
                <button id={k} onClick={this.quitarTitulo} className="forma">-</button>
            </table>);
        }
        this.forceUpdate();
    }

    quitarTitulo(e){
        let id = parseInt(e.target.id);
        this.props.voluntario.formacion.splice(id, 1);
        this.componentDidMount();
    }

    agregarTitulo(){
        let titulo = ["Universidad", "Bachi", "Bachi", "Bachi"];
        this.props.voluntario.formacion.push(titulo);
        this.closeModal();
        this.componentDidMount();
    }

    agregarLinea(centro, especialidad, grado, titulo){
        listaTitulos.push(
            <table className="formacion">
                <tr>
                    <td className="form">{centro}</td>
                    <td className="form">{especialidad}</td>
                    <td className="form">{grado}</td>
                    <td className="form">{titulo}</td>
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
                <h1 className="hform">Formación Académica:</h1>
                <a className="aform" href='javascript:' onClick={this.openModal}>Agregar formación académica</a>

                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                    >
                    <h6>Grado académico:</h6>
                    <select style={selectStyle}>
                        <option value="" disabled selected>Eg: Escuela, Colegio, Técnico, Universidad</option>
                        <option value="Escuela">Escuela</option>
                        <option value="Colegio">Colegio</option>
                        <option value="Tecnico">Tecnico</option>
                        <option value="Universidad">Universidad</option>
                        <option value="Otro">Otro</option>
                    </select>
                    <br/>
                    <br/>
                    <h6>Centro académico:</h6>
                    <input type="text" name="Centro" placeholder="Eg: Instituto Tecnológico de Costa Rica, etc." />
                    <br/>
                    <br/>
                    <h6>Título Obtenido:</h6>
                    <input type="text" name="Titulo" placeholder="Eg: Bachiller, Licenciatura, Maestría, Doctorado etc." />
                    <br/>
                    <br/>
                    <h6>Especialidad:</h6>
                    <input type="text" name="Especialidad" placeholder="Eg: Nutrición Deportiva, Administrador de Bases de datos, etc." />
                    <br/>
                    <br/>
                    <button className="inside" onClick={this.agregarTitulo}>Aceptar</button>
                </Modal>

                <div>
                <table class="title">
                    <tr>
                        <td>Grado Académico</td>
                        <td>Centro Académico</td>
                        <td>Título Obtenido</td>
                        <td>Especialidad</td>
                    </tr>
                </table>
                <table className="formacion">
                    <tr>
                        <td className="form">Universidad</td>
                        <td className="form">Instituto Tecnologico de Costa Rica</td>
                        <td className="form">Bachillerato Ingenieria en Computacion</td>
                        <td className="form">Especialidad</td>
                    </tr>
                    <button onClick={this.agregarTitulo} className="forma">-</button>
                </table>
                </div>
                <div>
                    {listaTitulos}
                </div>
                <br/> <br/> <br/>
                <div className="row">
                    <div className="col-1 offset-2">
                        <button className="bt" onClick={ this.props.anterior }>anterior</button>
                    </div>
                    <div className="col-1 offset-6">
                        <button className="bt-lg" onClick={ this.props.siguiente }>continuar</button>
                    </div>
                </div>
                <br/> <br/> <br/>
            </div>
        );
    }
}