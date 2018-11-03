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
            modalIsOpen: false,
            errors: {}
        };
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

    validateForm() {
        //let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if (!nuevoNombre) {
          formIsValid = false;
          errors["name"] = "*Por favor ingrese nombre del encargado.";
        }

        if (!nuevoApellidos) {
          formIsValid = false;
          errors["lastname"] = "*Por favor ingresar apellidos del encargado.";
        }

        if (typeof nuevoNombre !== "undefined" &&
            typeof nuevoApellidos !== "undefined") {
          if (!nuevoNombre.match(/^[a-zA-Z ]*$/) &&
              !nuevoApellidos.match(/^[a-zA-Z ]*$/)) {
            formIsValid = false;
            errors["name"] = "*Por favor introduzca solo caracteres del alfabeto.";
            errors["lastname"] = "*Por favor introduzca solo caracteres del alfabeto.";
          }
        }

        if (!nuevoCorreo) {
          formIsValid = false;
          errors["email"] = "*Por favor ingrese correo electrónico del encargado.";
        }

        if (typeof nuevoCorreo !== "undefined") {
          //regular expression for email validation
          const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          if (!re.test(nuevoCorreo)) {
            formIsValid = false;
            errors["email"] = "*Por favor, introduzca una dirección de correo electrónico válida.";
          }
        }

        if (!nuevoTelefono) {
          formIsValid = false;
          errors["tel"] = "*Por favor ingrese número de teléfono del encargado.";
        }

        if (typeof nuevoTelefono !== "undefined") {
          if (!nuevoTelefono.match(/^[0-9]{8}$/)) {
            formIsValid = false;
            errors["tel"] = "*Por favor, introduzca un número de teléfono válido.";
          }
        }

        this.setState({errors: errors});
        return formIsValid;
    }

    agregarEncargado(){
        if (this.validateForm()) {
            const encargado = [nuevoNombre, nuevoApellidos, nuevoCorreo, nuevoTelefono];
            this.props.manager.encargados.push(encargado);
            nuevoNombre = nuevoApellidos = nuevoCorreo = nuevoTelefono = "";
            this.closeModal();
            this.actualizarListaEncargados();
        }
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
        console.log("Encargados!!!");
        console.log(encargados);
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
                    <input type="text" name="Nombre" placeholder="Nombre" style={{width: 500}} onChange={KModalAddAdmin.guardar_info}/>
                    <br/>
                    <div className="errorMsg">{this.state.errors.name}</div>
                    <br/>
                    <h6>Apellidos:</h6>
                    <input type="text" name="Apellidos" placeholder="Apellidos" style={{width: 500}} onChange={KModalAddAdmin.guardar_info}/>
                    <br/>
                    <div className="errorMsg">{this.state.errors.lastname}</div>
                    <br/>
                    <h6>Correo electrónico:</h6>
                    <input type="text" name="Correo" placeholder="Correo electrónico" style={{width: 500}} onChange={KModalAddAdmin.guardar_info}/>
                    <br/>
                    <div className="errorMsg">{this.state.errors.email}</div>
                    <br/>
                    <h6>Teléfono:</h6>
                    <input type="text" name="Telefono" placeholder="Teléfono" style={{width: 500}} onChange={KModalAddAdmin.guardar_info}/>
                    <br/>
                    <div className="errorMsg">{this.state.errors.tel}</div>
                    <br/>
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
