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

export default class KFormVoluntario extends Component {

    constructor(props){
        super(props);
        // TODO: Cuando se vaya a abrir esto, pasar el id de la campaña -> this.Id_campana = props.Id_campana;
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
    obtener_datos(){
        leer_campanas(this.state.Id_campana).then((data) => this.setState({datos:data}))
        //console.log(this.state.datos)
        this.dato=this.state.datos;

    }
    siguiente(){
        this.setState({
            step : this.state.step + 1
        });
    }
    anterior(){
        this.setState({
            step : this.state.step - 1
        });
    }

    componentDidMount(){
        leer_campanas(this.state.Id_campana).then(result =>  {
            if (result){
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


            } else {
                window.location.href = "http://localhost:3000";
            }
        });
    }

    render(){
      let pasos;
        const info=<KInfoVoluntariado campana={this.state.campana} vis_encargados={VisualizacionEncargados(this.state.encargados)}
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
                return (<div className="container text-center" >
                    <div>
                        <br/>
                        <h2>Registro de voluntario</h2>
                        {info}
                        {pasos}
                    </div>
                    <KInfoVoluntario voluntario={this.state} anterior={this.anterior} siguiente={this.siguiente}/>
                </div>);
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
                return (<div className="container text-center" >
                    <div>
                        <br/>
                        <h2>Registro de voluntario</h2>
                        {info}
                        {pasos}
                    </div>
                    <KHabilidades voluntario={this.state} habilidades={this.state.campana_habilidades_graficas} anterior={this.anterior} siguiente={this.siguiente}/>
                </div>);
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
                return (<div className="container text-center" >
                    <div>
                        <br/>
                        <h2>Registro de voluntario</h2>
                        {info}
                        {pasos}
                    </div>
                    <KDocumentos  anterior={this.anterior} siguiente={this.siguiente}/>
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
                return (<div className="container text-center" >
                    <div>
                        <br/>
                        <h2>Registro de voluntario</h2>
                        {info}
                        {pasos}
                    </div>
                    <KTeryCon voluntario={this.state} campana={this.state.campana} tyc={this.state.campana[5]} anterior={this.anterior} siguiente={this.siguiente}/>
                </div>)

        }

    }
}
