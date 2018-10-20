import React, { Component } from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import ReactTooltip from 'react-tooltip'
import * as uid from "uid";
import KHeaderVoluntariado from './KHeaderVoluntariado';
import KInfoVoluntariado from './KInfoVoluntariado'
import KHabilidades from './KHabilidades'
import KDocumentos from './KDocumentos'
import KTeryCon from './KTeryCon'
import './KFormVoluntariado.css';
import '../style/color.css';
import Kformdocuments from '../KModals/Kformdocuments';
import { insertar_campana_construccion,
         insertar_actualizar_campana,
         insertar_actualizar_encargado_general_campana,
         insertar_actualizar_encargados_campana,
         insertar_actualizar_habilidades_campana } from '../DB/campaigns';

export default class KFormVoluntariado extends Component {
    constructor(props){
        super(props);
        this.state ={
            step:1,
            numberOfVolunteers: 0,
            volName: "",
            volImage:"",
            description: "",
            address: "",
            identification: "",
            name: "",
            lastname: "",
            email: "",
            tel: "",
            startDate: moment(),
            finishDate: "",
            time: "",
            termsAndConditions: "",
            disabled: true,
            registrationDeadline: false,
            encargados: [],
            skills: [],
            documents: [],
            id: uid()
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleFinishDateChange = this.handleFinishDateChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleCheckoxChange = this.handleCheckoxChange.bind(this);
        this.handleNumeric = this.handleNumeric.bind(this);
        this.siguiente = this.siguiente.bind(this);
        this.anterior = this.anterior.bind(this);
        this.insertNewCampaign = this.insertNewCampaign.bind(this);
        insertar_campana_construccion(this.state.id);
    }

  /*
   * Handle multiples inputs changes
   *
   */
    handleInputChange(event) {
      const target = event.target;
      const name = target.name;

      this.setState({
        [name]: target.value
      });
    }

  /*
   * Handle changes in start date inputs
   *
   */
   handleStartDateChange(date) {
     this.setState({
       startDate: date
     });
   }

  /*
   * Handle changes in finish date inputs
   *
   */
   handleFinishDateChange(date) {
     this.setState({
       finishDate: date
     });
   }

   /*
    * Handle changes in time inputs
    *
    */
    handleTimeChange(time) {
      this.setState({
        time: time
      });
    }

  /*
   * Handle changes in checkbox inputs
   *
   */
    handleCheckoxChange(event) {
      const target = event.target;
      if(!target.checked) {
        this.setState({ finishDate: "" });
      }
      else {
        this.setState({ finishDate: moment() });
      }
      this.setState({ registrationDeadline: target.checked });
      this.setState({ disabled: !this.state.disabled});
    }

    handleNumeric(event) {
      this.setState({
        numberOfVolunteers: event.target.value
      });
    }

  /*
   * Navigate forward through form
   *
   */
    siguiente(){
        this.setState({
            step : this.state.step + 1
        });
    }

  /*
   * Navigate backwards through form
   *
   */
    anterior(){
        this.setState({
            step : this.state.step - 1
        });
    }

    /*
     * Insert: new campaign, general manager, other managers, skills
     * and documents to the DB
     */
     insertNewCampaign() {
       // Insert new campaign in DB
       let campaign = insertar_actualizar_campana(this.state.id, this.state.volName, this.state.description,
                                                  this.state.startDate.toString(), this.state.time.toString(),
                                                  this.state.address, this.state.finishDate.toString(), "",
                                                  this.state.numberOfVolunteers, this.state.termsAndConditions);
       // Insert the manager of the campaign
       let generalManager = insertar_actualizar_encargado_general_campana(this.state.id, this.state.identification,
                                                                          this.state.name, this.state.lastname,
                                                                          this.state.email, this.state.tel);
      // Insert other managers to the campaing
       for(var manager in this.state.encargados) {
         insertar_actualizar_encargados_campana(this.state.id, this.state.encargados[manager][0],
                                                this.state.encargados[manager][1], this.state.encargados[manager][2],
                                                this.state.encargados[manager][3]);
       }

       // Add skills to the campaing
       for(var skill in this.state.skills) {
         insertar_actualizar_habilidades_campana(this.state.id, this.state.skills[skill]);
       }

       if (!campaign) {
           alert(this.state.volName + ": campaña creada con éxito");
       }
       else {
           alert("Error al crear campaña de voluntariado.");
       }
     }

    render(){

        var pasos;

        switch(this.state.step){
            case 1:
                pasos=
                <div>
                    <ul class="list-group-horizontal">
                        <li class="list-group-item active">Información del voluntariado</li>
                        <li class="list-group-item">Habilidades</li>
                        <li class="list-group-item">Documentos</li>
                        <li class="list-group-item">Terminos y condiciones</li>
                    </ul>
                </div>;
                return (<div className="container" >
                          <div>
                          <br/>
                          <h2 className="text-left">Crear voluntariado</h2>
                          {pasos}
                          </div>
                          <div className="relative">
                            <div className="absolute">
                              <KHeaderVoluntariado
                                name={this.state.volName}
                                image={this.state.volImage}
                                handler={this.handleInputChange}
                              />

                              <KInfoVoluntariado
                                campana={this.state}
                                anterior={this.anterior}
                                siguiente={this.siguiente}
                                handler={this.handleInputChange}
                                handleStartDateChange={this.handleStartDateChange}
                                handleFinishDateChange={this.handleFinishDateChange}
                                handleTimeChange={this.handleTimeChange}
                                handleCheckoxChange={this.handleCheckoxChange}
                                handlerNumeric={this.handleNumeric}
                              />

                              <div className="row">
                                <div className="col-1 offset-2">

                                </div>
                                <div className="col-1 offset-6">
                                    <button
                                      id="navigationButton"
                                      className="btn btn-primary btn-md"
                                      onClick={ this.siguiente }
                                      data-tip data-for='btn-tooltip'> Siguiente
                                    </button>
                                    <ReactTooltip id='btn-tooltip' type='warning' effect='solid'>
                                      <span>Para poder continuar debe de asegurarse de haber completado correctamente todos los campos de información solicitados.</span>
                                    </ReactTooltip>
                                </div>
                              </div>

                            </div>
                          </div>
                        </div>)
            case 2:
                pasos=
                <div>
                    <ul class="list-group-horizontal">
                        <li class="list-group-item active">Información del voluntariado</li>
                        <li class="list-group-item active">Habilidades</li>
                        <li class="list-group-item">Documentos</li>
                        <li class="list-group-item">Terminos y condiciones</li>
                    </ul>
                </div>;
                return (<div className="container" >
                            <div>
                            <br/>
                            <h2 className="text-left">Crear voluntariado</h2>
                            {pasos}
                            </div>
                            <div className="relative">
                              <div className="absolute">
                                <KHeaderVoluntariado
                                  name={this.state.volName}
                                  image={this.state.volImage}
                                  handler={this.handleInputChange}
                                />
                                <KHabilidades
                                  test={this.state.encargados}
                                  skills={this.state.skills}
                                  anterior={this.anterior}
                                  siguiente={this.siguiente} />
                              </div>
                            </div>
                        </div>)
            case 3:
                pasos=
                <div>
                    <ul class="list-group-horizontal">
                        <li class="list-group-item active">Información del voluntariado</li>
                        <li class="list-group-item active">Habilidades</li>
                        <li class="list-group-item active">Documentos</li>
                        <li class="list-group-item">Terminos y condiciones</li>
                    </ul>
                </div>;
                return (<div className="container" >
                            <div>
                            <br/>
                            <h2 className="text-left">Crear voluntariado</h2>
                            {pasos}
                            </div>
                            <div className="relative">
                              <div className="absolute">
                                <KHeaderVoluntariado />
                                <KDocumentos
                                  documents={this.state.documents}
                                  anterior={this.anterior}
                                  siguiente={this.siguiente} />

                              </div>
                            </div>
                        </div>)
            case 4:
                pasos=
                <div>
                    <ul class="list-group-horizontal">
                        <li class="list-group-item active">Información del voluntariado</li>
                        <li class="list-group-item active">Habilidades</li>
                        <li class="list-group-item active">Documentos</li>
                        <li class="list-group-item active">Terminos y condiciones</li>
                    </ul>
                </div>;
                return (<div className="container" >
                            <div>
                            <br/>
                            <h2 className="text-left">Crear voluntariado</h2>
                            {pasos}
                            </div>
                            <div className="relative">
                              <div className="absolute">
                                <KHeaderVoluntariado />
                                <KTeryCon
                                  tyc={this.state.termsAndConditions}
                                  anterior={this.anterior}
                                  siguiente={this.siguiente}
                                  handler={this.handleInputChange}
                                  insertInDB={this.insertNewCampaign} />
                              </div>
                            </div>
                        </div>)

        }

    }


}