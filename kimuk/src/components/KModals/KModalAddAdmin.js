import React, { Component } from 'react';
import '../style/color.css';
import './KModalAddAdmin.css';
import Modal from 'react-modal';
import ReactTooltip from 'react-tooltip'

let nuevoNombre = "";
let nuevoApellidos = "";
let nuevoCorreo = "";
let nuevoTelefono = "";

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        transform             : 'translate(-50%, -50%)',
    }
};

export default class KModalAddAdmin extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            listaEncargadosGrafica : [],
            modalIsOpen: false
        };
        KModalAddAdmin.validateEmail = KModalAddAdmin.validateEmail.bind(this);
        this.actualizarListaEncargados = this.actualizarListaEncargados.bind(this);
        this.agregarEncargado = this.agregarEncargado.bind(this);
        this.quitarEncargado = this.quitarEncargado.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        KModalAddAdmin.guardar_info = KModalAddAdmin.guardar_info.bind(this);
        this.actualizarListaEncargados();
    }

    static guardar_info(e){
        switch(e.target.name)
        {
            case "Nombre":
                nuevoNombre = e.target.value;
                break;
            case "Apellidos":
                nuevoApellidos = e.target.value;
                break;
            case "Correo":
                nuevoCorreo = e.target.value;
                break;
            case "Telefono":
                nuevoTelefono = e.target.value;
                break;
        }
    }

    agregarEncargado(){
        if(nuevoNombre.replace(/\s/g, '') === "" || nuevoApellidos.replace(/\s/g, '') === ""
            || nuevoCorreo.replace(/\s/g, '') === "" || nuevoTelefono.replace(/\s/g, '') === "")
        {alert("Uno de los campos se encuentra vacio.\nDebe completar todos los campos."); return;}

        if(!KModalAddAdmin.validateEmail(nuevoCorreo))
        {alert("Correo electrónico inválido.\nPor favor ingrese correctamente el correo electrónico"); return;}

        const encargado = [nuevoNombre, nuevoApellidos, nuevoCorreo, nuevoTelefono];
        this.props.manager.encargados.push(encargado);
        nuevoNombre = nuevoApellidos = nuevoCorreo = nuevoTelefono = "";
        this.closeModal();
        this.actualizarListaEncargados();
    }

    static validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
    }

    quitarEncargado(e){
        const id = parseInt(e.target.id);
        this.props.manager.encargados.splice(id, 1);
        this.actualizarListaEncargados();
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    actualizarListaEncargados(){
        let encargados = [];
        for(let k in this.props.manager.encargados)
        {
            encargados.push(<table className="formacion">
                <tr>
                    <td className="form">{this.props.manager.encargados[k][0]}</td>
                    <td className="form">{this.props.manager.encargados[k][1]}</td>
                    <td className="form">{this.props.manager.encargados[k][2]}</td>
                    <td className="form">{this.props.manager.encargados[k][3]}</td>
                </tr>
                <button id={k} type="button" onClick={this.quitarEncargado} className="forma">
                    <span className="eliminate">
                        -
                    </span>
                </button>
            </table>);
        }
        this.setState({
            listaEncargadosGrafica: encargados
        });
    }

    render(){
        return (
            <div className={"container"}>
                <h1 data-tip data-for='modal-tooltip' className="hform">Otros encargados:</h1>
                <ReactTooltip id='modal-tooltip' type='info' effect='solid'>
                  <span>Puede agregar nuevos encargados que ayuden con la organización del voluntariado.</span>
                </ReactTooltip>
                <a className="aform" href='javascript:' onClick={this.openModal}>Agregar encargados al voluntariado</a>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    ariaHideApp={false}>
                    <h7>&nbsp; Ingrese información del encargado</h7>
                    <br/>
                    <h6>Nombre:</h6>
                    <input type="text" name="Nombre" placeholder="Nombre" onChange={KModalAddAdmin.guardar_info}/>
                    <br/> <br/>
                    <h6>Apellidos:</h6>
                    <input type="text" name="Apellidos" placeholder="Apellidos" onChange={KModalAddAdmin.guardar_info}/>
                    <br/> <br/>
                    <h6>Correo electrónico:</h6>
                    <input type="text" name="Correo" placeholder="Correo electrónico" onChange={KModalAddAdmin.guardar_info}/>
                    <br/> <br/>
                    <h6>Teléfono:</h6>
                    <input type="text" name="Telefono" placeholder="Teléfono" onChange={KModalAddAdmin.guardar_info}/>
                    <br/> <br/>
                    <button className="inside" onClick={this.agregarEncargado}>Aceptar</button>
                    <button type="button" className="close" aria-label="Close" onClick={this.closeModal}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </Modal>
                <div>
                    <table className="title">
                        <tr>
                            <td>Nombre</td>
                            <td>Apellidos</td>
                            <td>Correo electrónico</td>
                            <td>Teléfono</td>
                        </tr>
                    </table>
                </div>
                <div>
                    {this.state.listaEncargadosGrafica}
                </div>
                <br/> <br/> <br/>
            </div>
        );
    }
}
