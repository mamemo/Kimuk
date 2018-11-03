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
import KFormDocumentsAdminCreacion from './KFormDocumentsAdminCreacion'
import KModalInfoAccion from '../KModals/KModalInfoAccion'
import * as database from "../DB/documentsAdmin";
import {
  insertar_campana_construccion,
  insertar_actualizar_campana,
  insertar_actualizar_encargado_general_campana,
  insertar_actualizar_encargados_campana,
  insertar_actualizar_habilidades_campana,
  eliminar_campanas_en_construccion,
  insertar_actualizar_encargados_lista,
  insertar_actualizar_habilidades_campana_lista
} from '../DB/campaigns';
import {
    enviar_correo,
    enviar_correo_voluntariado,
    enviar_correo_voluntario_confirmacion,
    enviar_correo_voluntario_aceptado
  } from '../kEmail/KEmail';


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
            id: uid(),
            imgURL: "",
            subioCod: false,
            documentCod: "",
            subio: false,
            document: ""
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputChangeImage = this.handleInputChangeImage.bind(this);
        this.handleTermsAndConditions = this.handleTermsAndConditions.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleFinishDateChange = this.handleFinishDateChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleCheckoxChange = this.handleCheckoxChange.bind(this);
        this.handleNumeric = this.handleNumeric.bind(this);
        this.siguiente = this.siguiente.bind(this);
        this.anterior = this.anterior.bind(this);
        this.insertNewCampaign = this.insertNewCampaign.bind(this);
        this.cargarURLFoto = this.cargarURLFoto.bind(this);

        this.handleDocument = this.handleDocument.bind(this);
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
   * Handle image of volunteer
   *
   */
    handleInputChangeImage(e) {
      try {
        if (e.target.files[0].size > 5000000){
            alert("Error\nEl archivo supera los 5MB, por favor suba un archivo por debajo de 5MB");
            return;
        }

        const tipoDocumento = "Foto";
        const nombreArchivo = e.target.files[0].name;
        const idCampana = this.state.id;
        const call = this.cargarURLFoto;
        const task = database.insertar_documento_storage_campana(this.state.id, tipoDocumento, e.target.files[0]);

        const progressBar = document.getElementById("barimg");

        task.on('state_changed',

            function progress(snapshot) {  // Update progress bar
                progressBar.value = 100 * (snapshot.bytesTransferred / snapshot.totalBytes);
            },

            function error(err) { // possible errors
                alert("Error\n" + err.message + "\nPor favor suba el archivo nuevamente.");
            },

            function complete() { // Lets me know when the file has been uploaded
                database.insertar_url_nombre_documento_campana(idCampana, tipoDocumento, nombreArchivo).then(result => {
                    call();
                });
            }
        )
      } catch (err) {
          alert("ERROR " + err);
          return;
      }
    }

    cargarURLFoto(){
        database.leer_url_documento_campana(this.state.id, "Foto").then(result => {
            this.setState({
                imgURL: result
            });
        })
    }

    /*
     * Metodo que almacena nombre del archivo
     *  un un boolean indica que se subio el archivo
     * de la poliza
     */
    handleDocument(doc, tipoDoc)
    {
        if(tipoDoc === "Póliza de seguro")
        {
        this.setState({
            subio: true,
            document: doc
        })
        }
        else{
            if(tipoDoc === "Código de conducta")
            {
                this.setState({
                    subioCod: true,
                    documentCod: doc
                })
            }
        }
    }

  /**
   * Handle input Terms and Conditions
   */
  handleTermsAndConditions(event) {
    this.setState({termsAndConditions: event.target.value});
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
        insertar_actualizar_campana(this.state.id, this.state.volName, this.state.description,
            this.state.startDate.toString(), this.state.time.toString(),
            this.state.address, this.state.finishDate.toString(), "",
            this.state.numberOfVolunteers, this.state.termsAndConditions).then(result => {

            insertar_actualizar_encargado_general_campana(this.state.id, this.state.identification,
                this.state.name, this.state.lastname,
                this.state.email, this.state.tel).then(result => {

                insertar_actualizar_encargados_lista(this.state.id, this.state.encargados).then( result => {
                    insertar_actualizar_habilidades_campana_lista(this.state.id, this.state.skills).then(result => {
                        alert("Campaña " + this.state.volName + " creada con éxito.\n\nSe envió al correo electrónico " + this.state.email + " y a los administradores los links de registro de voluntariado y administración de voluntariado.");
                        enviar_correo_voluntariado(this.state.email, this.state.volName, this.state.name, this.state.id); // correo a creador

                        // Correo a administradores
                        for (var i = 0 ; i < this.state.encargados.length ; i++) {
                            enviar_correo_voluntariado(this.state.encargados[i][2], this.state.volName, this.state.encargados[i][0], this.state.id);
                        }
                        window.location.href ="http://localhost:3000";
                    }).catch(function (error) {
                        alert("Error al insertar habilidad\n" + error + "\nRevise información ingresada en el sistema y vuelva a intentar.\n\nEn caso de no funcionar recargue la página");
                    })
                }).catch(function (error) {
                    alert("Error al insertar encargado\n" + error + "\n\nRevise información ingresada en el sistema y vuelva a intentar.\n\nEn caso de no funcionar recargue la página");
                })
            }).catch(function (error) {
                alert("Error al insertar el encargado general\n" + error + "\n\nRevise información ingresada en el sistema y vuelva a intentar.\n\nEn caso de no funcionar recargue la página");
            })
        }).catch(function (error) {
            alert("Error al insertar la campana\n" + error + "\n\nRevise información ingresada en el sistema y vuelva a intentar.\n\nEn caso de no funcionar recargue la página");
        });
    }

    render(){

        var pasos;

        switch(this.state.step){
            case 1:
                pasos=
                <div className="step-progressBar">
                    <ul className="progressbar">
                        <li className="active">Información del voluntariado</li>
                        <li>Habilidades</li>
                        <li>Documentos</li>
                        <li>Terminos y condiciones</li>
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
                                handlerImage={this.handleInputChangeImage}
                                url={this.state.imgURL}
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
                            </div>
                          </div>
                        </div>)
            case 2:
                pasos=
                <div className="step-progressBar">
                    <ul className="progressbar">
                        <li className="active">Información del voluntariado</li>
                        <li className="active">Habilidades</li>
                        <li>Documentos</li>
                        <li>Terminos y condiciones</li>
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
                                  handlerImage={this.handleInputChangeImage}
                                  url={this.state.imgURL}
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
                <div className="step-progressBar">
                    <ul className="progressbar">
                        <li className="active">Información del voluntariado</li>
                        <li className="active">Habilidades</li>
                        <li className="active">Documentos</li>
                        <li>Terminos y condiciones</li>
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
                                  handlerImage={this.handleInputChangeImage}
                                  url={this.state.imgURL}
                                />
                                <KFormDocumentsAdminCreacion
                                  campana={{id: this.state.id,
                                  subio: this.state.subio,
                                  document: this.state.document,
                                      subioCod:this.state.subioCod,
                                      documentCod:this.state.documentCod
                                  }}
                                  anterior={this.anterior}
                                  siguiente={this.siguiente}
                                  handler={this.handleDocument}
                                />
                              </div>
                            </div>
                        </div>)
            case 4:
                pasos=
                <div className="step-progressBar">
                    <ul className="progressbar">
                        <li className="active">Información del voluntariado</li>
                        <li className="active">Habilidades</li>
                        <li className="active">Documentos</li>
                        <li className="active">Terminos y condiciones</li>
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
                                  handlerImage={this.handleInputChangeImage}
                                  url={this.state.imgURL}
                                />
                                <KTeryCon
                                  tyc={this.state.termsAndConditions}
                                  anterior={this.anterior}
                                  siguiente={this.siguiente}
                                  handler={this.handleInputChange}
                                  insertInDB={this.insertNewCampaign}
                                  estado={this.state}/>
                              </div>
                            </div>
                        </div>)

        }


    }


}
