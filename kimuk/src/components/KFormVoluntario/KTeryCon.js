import React, { Component } from 'react';
import './KFormVoluntario.css';
import '../style/color.css';
import {insertar_actualizar_voluntarios_camapana, insertar_actualizar_habilidades_voluntarios,
    actualizar_voluntarios_campana, eliminar_voluntario} from '../DB/volunteers';
import ReactTooltip from 'react-tooltip';
import KModalInfoAccion from '../KModals/KModalInfoAccion'
import {
    enviar_correo,
    enviar_correo_voluntariado,
    enviar_correo_voluntario_confirmacion,
    enviar_correo_voluntario_aceptado
  } from '../kEmail/KEmail';

import { FaLongArrowAltLeft, FaCheck} from 'react-icons/fa';

export default class KTeryCon extends Component {
    constructor(props){
        super(props);
        this.state = {
            noAceptaTyC: true,
            listo: false,
            popup: []
        }
        this.registrar=this.registrar.bind(this);
        this.guardar_info=this.guardar_info.bind(this);
        this.showPopUp = this.showPopUp.bind(this);
        this.handlerPopUp = this.handlerPopUp.bind(this);
        this.updateButtonContinuar_Acepta = this.updateButtonContinuar_Acepta.bind(this);
        this.updateButtonContinuar_noAcepta = this.updateButtonContinuar_noAcepta.bind(this);
    }

    handlerPopUp() {
        this.setState({listo: false});
    }


    showPopUp(tNotificacion, msj){
        let pop = [];
        pop.push(<KModalInfoAccion tipoNotificacion={tNotificacion}
            mensaje={msj}
            handler={this.handlerPopUp}  />);

        this.setState({
            popup: pop,
            listo: true
        });
    }

    registrar() {
        const d = new Date();
        var resul = insertar_actualizar_voluntarios_camapana(this.props.voluntario.Id_campana,
            this.props.voluntario.id,this.props.voluntario.tipo_id,this.props.voluntario.nombre,
            this.props.voluntario.apellido_1,this.props.voluntario.apellido_2,
            this.props.voluntario.f_nacimiento.toString(),this.props.voluntario.genero,
            this.props.voluntario.estado_civil,this.props.voluntario.ocupacion,
            this.props.voluntario.provincia,this.props.voluntario.canton,this.props.voluntario.distrito,
            this.props.voluntario.direccion_exacta,this.props.voluntario.correo,
            this.props.voluntario.telefono_1,this.props.voluntario.telefono_2,
            d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear(),"Pendiente")

        for (let habilidad in this.props.voluntario.habilidades) {
            if (insertar_actualizar_habilidades_voluntarios(this.props.voluntario.Id_campana,
                this.props.voluntario.id, habilidad, this.props.voluntario.habilidades[habilidad])) {
                this.showPopUp("Error en el registro",
                "Tuvimos un error registrandote.\n\nRevisá la información que ingresaste y vuelvé a intentar.\nSi el problema sigue recargá la página");
                return;
            }
        }
        if (resul === true) { // si se inserto correctamente
            enviar_correo_voluntario_confirmacion(this.props.voluntario.correo,this.props.campana[0], this.props.voluntario.nombre);
            this.showPopUp("Voluntario registrado",
                "¡Felicidades!\n\nAcabás de hacer una solicitud de registro en el voluntariado.\nSi el administrador del voluntariado te acepta vas a ser notificado.\nVas a recibir notificaciones por el email: " + this.props.voluntario.correo);
        } else { // Error al insertar
            this.showPopUp("Error en el registro",
                "Tuvimos un error registrandote.\n\nRevisá la información que ingresaste y vuelvé a intentar.\nSi el problema sigue recargá la página");
        }
    }
    guardar_info(e){
        this.props.voluntario[e.target.name]=e.target.value;
    }

    updateButtonContinuar_Acepta() {
        this.setState({noAceptaTyC: false});
    }

    updateButtonContinuar_noAcepta() {
        this.setState({noAceptaTyC: true});
    }

    render(){
        return(<div className="container_term">
                <div className="container-terycon">
                  <div className="flex-item-hab">
                    <h2> Términos y condiciones </h2>
                    <br/>
                    <div className="text-center">
                      <div clasName="container">

                        <textarea
                           id="termsAndConditions"
                           name="termsAndConditions"
                           value={this.props.tyc}
                           className="form-control"
                           rows="10"
                           readonly/>
                      </div>
                    </div>
                    <div className="tyc_div">
                      <input
                        className="checkbox"
                        type="radio"
                        name="tyc"
                        value="si"
                        defaultChecked={this.props.voluntario.tyc==="si"}
                        onChange={(e) => {
                            this.guardar_info(e);
                            this.updateButtonContinuar_Acepta();
                        }}/> Acepto términos y condiciones <br/>
                      <input
                        className="checkbox"
                        type="radio"
                        name="tyc"
                        value="no"
                        defaultChecked={this.props.voluntario.tyc==="no"}
                        onChange={(e) => {
                            this.guardar_info(e);
                            this.updateButtonContinuar_noAcepta();
                        }}/> No acepto
                    </div>
                  </div>
                  <div className="row">
                      <div className="col-1 offset-2">
                          <button
                              className="btn btn-default"
                              data-tip data-for='btn-tooltip'
                              onClick={ this.props.anterior }
                          >
                            <FaLongArrowAltLeft/>
                            Anterior
                          </button>
                      </div>
                      <ReactTooltip id='btn-tooltip' type='warning' effect='solid' place="top">
                          <span>Regresá a la sección de documentos.</span>
                      </ReactTooltip>
                      <div className="col-1 offset-6">
                          <button
                              className="btn btn-success"
                              data-tip data-for='btn-tooltip2'
                              onClick={ this.registrar }
                              disabled={this.state.noAceptaTyC}
                          >
                            <FaCheck/>
                            Confirmar
                          </button>
                      {(this.state.listo) ? this.state.popup : void(0)}
                      </div>
                      <ReactTooltip id='btn-tooltip2' type='success' effect='solid' place="top">
                          <span>Confirmar la inscripción en la campaña.</span>
                      </ReactTooltip>
                  </div>
                  <br/>
                  <br/>
                </div>
              </div>
        );
    }
}
