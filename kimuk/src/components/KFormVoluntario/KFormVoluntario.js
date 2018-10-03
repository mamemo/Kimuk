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
import KFormacionAcademica from "./KFormacionAcademica";


export default class KFormVoluntario extends Component {

    constructor(){
        super();
        // TODO: Cuando se vaya a abrir esto, pasar el id de la campaña -> this.Id_campana = props.Id_campana;
        this.state = {
            step: 1,
            tipo_id: "",
            id: "",
            nombre: "",
            apellido_1: "",
            apellido_2: "",
            f_nacimiento: "",
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
            Id_campana: 7812303  // props.Id_campana
        };
        this.siguiente=this.siguiente.bind(this);
        this.anterior=this.anterior.bind(this);
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
            let in_campana = InCampanasKFormVoluntario(result);
            let in_encargados = InEcargadosKFormVoluntario(result);
            let in_campana_habilidades_graficas = InHabilidadesGraficasKFormVoluntario(result);
            this.setState( {
                campana: in_campana,
                encargados: in_encargados,
                campana_habilidades_graficas: in_campana_habilidades_graficas
            });
        });
    }

    render(){
        let pasos;
        const info=<div className="container text-left">
            <div className="row" >
                <div className="col-4">
                    <img src="" />
                </div>
                <div className="col-8">
                    <h3>{this.state.campana[7]}</h3>
                    Organizado por:
                    <ul>{VisualizacionEncargados(this.state.encargados)}</ul>
                    <h5>{this.state.campana[0]}</h5>
                    {this.state.campana[1]} {this.state.campana[3]} <br/>
                    {this.state.campana[6]} <br/>
                    <hr/>
                    {this.state.campana[0]} <br/><br/>
                </div>
            </div>
        </div>;

        switch(this.state.step){
            case 1:
                pasos=
                    <div>
                        <ul class="list-group-horizontal">
                            <li class="list-group-item active">Informacion del voluntariado</li>
                            <li class="list-group-item">Habilidades</li>
                            <l1 class="list-group-item">Formacion academica</l1>
                            <li class="list-group-item">Documentos</li>
                            <li class="list-group-item">Terminos y condiciones</li>
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
                    <div>
                        <ul class="list-group-horizontal">
                            <li class="list-group-item active">Informacion del voluntariado</li>
                            <li class="list-group-item active">Habilidades</li>
                            <l1 class="list-group-item">Formacion academica</l1>
                            <li class="list-group-item">Documentos</li>
                            <li class="list-group-item">Terminos y condiciones</li>
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
                    <div>
                        <ul class="list-group-horizontal">
                            <li class="list-group-item active">Informacion del voluntariado</li>
                            <li class="list-group-item active">Habilidades</li>
                            <l1 class="list-group-item active">Formacion academica</l1>
                            <li class="list-group-item">Documentos</li>
                            <li class="list-group-item">Terminos y condiciones</li>
                        </ul>
                    </div>;
                return (<div className="container text-center" >
                    <div>
                        <br/>
                        <h2>Registro de voluntario</h2>
                        {info}
                        {pasos}
                    </div>
                    <KFormacionAcademica voluntario={this.state} anterior={this.anterior} siguiente={this.siguiente}/>
                </div>);
            case 4:
                pasos=
                    <div>
                        <ul class="list-group-horizontal">
                            <li class="list-group-item active">Informacion del voluntariado</li>
                            <li class="list-group-item active">Habilidades</li>
                            <l1 className="list-group-item active">Formacion academica</l1>
                            <li class="list-group-item active">Documentos</li>
                            <li class="list-group-item">Terminos y condiciones</li>
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
            case 5:
                pasos=
                    <div>
                        <ul class="list-group-horizontal">
                            <li class="list-group-item active">Informacion del voluntariado</li>
                            <li class="list-group-item active">Habilidades</li>
                            <l1 className="list-group-item active">Formacion academica</l1>
                            <li class="list-group-item active">Documentos</li>
                            <li class="list-group-item active">Terminos y condiciones</li>
                        </ul>
                    </div>;
                return (<div className="container text-center" >
                    <div>
                        <br/>
                        <h2>Registro de voluntario</h2>
                        {info}
                        {pasos}
                    </div>
                    <KTeryCon voluntario={this.state} tyc={this.state.campana[9]} anterior={this.anterior} siguiente={this.siguiente}/>
                </div>)

        }

    }
}