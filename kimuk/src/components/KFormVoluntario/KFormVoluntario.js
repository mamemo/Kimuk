/**
 * Archivo que junta todos los componentes para 
 * mostrar la interfaz de Registrar a un Voluntariado.
 */


import React, { Component } from 'react';
import './KFormVoluntario.css';
import '../style/color.css';
import KInfoVoluntario from './KInfoVoluntario';
import KHabilidades from './KHabilidades';
import KDocumentos from './KDocumentos';
import KTeryCon from './KTeryCon';
import {leer_campanas} from "../DB/campaigns";
import {InCampanasKFormVoluntario, InHabilidadesGraficasKFormVoluntario, InEcargadosKFormVoluntario,
    VisualizacionEncargados, InHabilidadesCodigosKFormVoluntario} from '../DB/add-onns';
import KInfoVoluntariado from '../KInfoVoluntariado/KInfoVoluntariado';
import moment from 'moment';
import * as database from "../DB/documentsAdmin";
import KFormDocumentsSubidaVoluntario from "../KComponentsDocuments/KFormDocumentsSubidaVoluntario";

export default class KFormVoluntario extends Component {

    constructor(props){
        super(props);
        
        this.state = {
            step: 1,
            tipo_id: "",
            id: "",
            nombre: "",
            apellido_1: "",
            apellido_2: "",
            f_nacimiento: moment(),
            genero: "",
            estado_civil: "",
            ocupacion: "",
            provincia: "",
            canton: "",
            distrito: "",
            direccion_exacta: "",
            correo: "",
            telefono_1: "",
            telefono_2: "",
            tyc: "",
            habilidades: [],
            formacion: [],
            campana: {},
            encargados: {},
            campana_habilidades_graficas: {},
            Id_campana: props.url,
            imgURL: ""
        };
        this.siguiente=this.siguiente.bind(this);
        this.anterior=this.anterior.bind(this);
        this.obtener_datos=this.obtener_datos.bind(this);
    }

    /**
     * Obtiene los datos de la campaña.
     */
    obtener_datos(){
        leer_campanas(this.state.Id_campana).then((data) => this.setState({datos:data}))
        //console.log(this.state.datos)
        this.dato=this.state.datos;

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

    /**
	 * Obtiene los datos del voluntariado de la base de datos y 
	 * llena las variables con la información obtenida.
	 */
    componentDidMount(){
        leer_campanas(this.state.Id_campana).then(result =>  {
            if (result){ //Si se encontró una campaña con ese número
                let in_campana = InCampanasKFormVoluntario(result);
                let in_encargados = InEcargadosKFormVoluntario(result);
                let in_campana_habilidades_graficas = InHabilidadesGraficasKFormVoluntario(result);
                this.setState( {
                    campana: in_campana,
                    encargados: in_encargados,
                    campana_habilidades_graficas: in_campana_habilidades_graficas
                });

                database.leer_url_documento_campana(this.state.Id_campana, "Foto").then(result => {
                    this.setState({
                        imgURL: result
                    });
                })


            } else { //Si no se encontró lo manda al Inicio
                window.location.href = "http://localhost:3000";
            }
        });
    }

    /**
	 * Muestra los componentes deseados. 
	 * Actualiza la interfaz dependiendo de lo que pase en la aplicación.
	 */
	render(){
        let pasos;
        const info=<KInfoVoluntariado campana={this.state.campana}
                                      vis_encargados={VisualizacionEncargados(this.state.encargados)}
                                      url={this.state.imgURL}/>;

        switch(this.state.step){
            case 1:
                pasos=
                  <div className="step-progressBar">
                      <ul className="progressbar">
                          <li className="active">Información del voluntariado</li>
                            <li>Habilidades</li>
                            <li>Documentos</li>
                            <li>Términos y condiciones</li>
                      </ul>
                  </div>;
                return (<div className="page_container" >
                          <div className="div_header">
                            <br/>
                            <h2>Registro de Voluntario</h2>
                          </div>
                          {info}
                          {pasos}
                          <KInfoVoluntario
                            voluntario={this.state}
                            anterior={this.anterior}
                            siguiente={this.siguiente}/>
                        </div>)
            case 2:
                pasos=
                    <div className="step-progressBar">
                        <ul className="progressbar">
                            <li className="active">Información del voluntariado</li>
                            <li className="active">Habilidades</li>
                            <li>Documentos</li>
                            <li>Términos y condiciones</li>
                        </ul>
                    </div>;
                return (<div className="page_container" >
                          <div className="div_header">
                            <br/>
                            <h2>Registro de Voluntario</h2>
                          </div>
                          {info}
                          {pasos}
                          <KHabilidades
                            voluntario={this.state}
                            habilidades={this.state.campana_habilidades_graficas}
                            anterior={this.anterior}
                            siguiente={this.siguiente}/>
                        </div>)
            case 3:
                pasos=
                    <div className="step-progressBar">
                        <ul className="progressbar">
                            <li className="active">Información del voluntariado</li>
                            <li className="active">Habilidades</li>
                            <li className="active">Documentos</li>
                            <li>Términos y condiciones</li>
                        </ul>
                    </div>;
                return (<div className="page_container" >
                          <div className="div_header">
                            <br/>
                            <h2>Registro de Voluntario</h2>
                          </div>
                          {info}
                          {pasos}
                          <KFormDocumentsSubidaVoluntario
                            campana={{id: this.state.Id_campana}}
                            voluntario={{cedula: this.state.id}}
                            anterior={this.anterior}
                            siguiente={this.siguiente}/>
                        </div>);
            case 4:
                pasos=
                    <div className="step-progressBar">
                        <ul className="progressbar">
                            <li className="active">Información del voluntariado</li>
                            <li className="active">Habilidades</li>
                            <li className="active">Documentos</li>
                            <li className="active">Términos y condiciones</li>
                        </ul>
                    </div>;
                return (<div className="page_container" >
                          <div className="div_header">
                            <br/>
                            <h2>Registro de Voluntario</h2>
                          </div>
                          {info}
                          {pasos}
                          <KTeryCon
                            voluntario={this.state}
                            campana={this.state.campana}
                            tyc={this.state.campana[5]}
                            anterior={this.anterior}
                            siguiente={this.siguiente}/>
                        </div>);

        }

    }
}
