import React, { Component } from 'react';
import './KFormVoluntario.css';
import '../style/color.css';
import KInfoVoluntario from './KInfoVoluntario'
import KHabilidades from './KHabilidades'
import KDocumentos from './KDocumentos'
import KTeryCon from './KTeryCon'
import info from './package.json'
import {leer_campanas} from "../BD/campaigns"


export default class KFormVoluntario extends Component {
    constructor(){
        super();
        this.state ={
            step:1,
            tipo_id:"",
            id:"",
            nombre:"",
            apellido_1:"",
            apellido_2:"",
            f_nacimiento:"",
            genero:"",
            estado_civil:"",
            ocupacion:"",
            provincia:"",
            canton:"",
            distrito:"",
            direccion_exacta:"",
            correo:"",
            telefono_1:"",
            telefono_2:"",
            tyc:"",
            habilidades:[],
            datos:""
        }
        
        this.dato=info;
        this.siguiente=this.siguiente.bind(this);
        this.anterior=this.anterior.bind(this);
        this.obtener_datos=this.obtener_datos.bind(this);
    }
    obtener_datos(){
        leer_campanas(7812303).then((data) => this.setState({datos:data}))
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
    render(){
        this.obtener_datos()
        //console.log(this.datos)
        var pasos;
        const encargados=[];
        for(var k in this.dato.Encargados){
            encargados.push(<li>{this.dato.Encargados[k].nombre}</li>);
        }
        const info=<div className="container text-left">
                <div className="row" >
                    <div className="col-4">
                        <img src="" />
                    </div>
                    <div className="col-8">  
                        <h3>{this.dato.Nombre}</h3>
                        Organizado por: 
                        <ul>{encargados}</ul> 
                        {this.dato.Fecha_ejecucion} {this.dato.Hora} <br/>
                        {this.dato.Lugar} <br/>
                        <hr/>
                        {this.dato.Descripcion} <br/><br/>
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
                        </div>)
            case 2:
                pasos=
                <div>
                    <ul class="list-group-horizontal">
                        <li class="list-group-item active">Informacion del voluntariado</li>
                        <li class="list-group-item active">Habilidades</li>
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
                            <KHabilidades voluntario={this.state} habilidades={this.dato.Habilidades} anterior={this.anterior} siguiente={this.siguiente}/>
                        </div>)
            case 3:
                pasos=
                <div>
                    <ul class="list-group-horizontal">
                        <li class="list-group-item active">Informacion del voluntariado</li>
                        <li class="list-group-item active">Habilidades</li>
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
                        </div>)
            case 4:
                pasos=
                <div>
                    <ul class="list-group-horizontal">
                        <li class="list-group-item active">Informacion del voluntariado</li>
                        <li class="list-group-item active">Habilidades</li>
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
                            <KTeryCon voluntario={this.state} tyc={this.dato.terminos_condiciones} anterior={this.anterior} siguiente={this.siguiente}/>
                        </div>)

        }

    }
}