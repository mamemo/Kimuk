import React, { Component } from 'react';
import './KFormVoluntario.css';
import '../style/color.css';
import KInfoVoluntario from './KInfoVoluntario'
import KHabilidades from './KHabilidades'
import KDocumentos from './KDocumentos'
import KTeryCon from './KTeryCon'
import info from './package.json'

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
            habilidades:[]
        }
        
        this.dato=info;
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
    render(){
        var pasos;
        const encargados=[];
        for(var k in this.dato.Campanas.ID.Encargados){
            encargados.push(<li>{this.dato.Campanas.ID.Encargados[k].nombre}</li>);
        }
        const info=<div className="container text-left">
                <div className="row" >
                    <div className="col-4">
                        <img src="" />
                    </div>
                    <div className="col-8">  
                        <h3>{this.dato.Campanas.ID.nombre}</h3>
                        Organizado por: 
                        <ul>{encargados}</ul> 
                        {this.dato.Campanas.ID.fecha_ejecucion} {this.dato.Campanas.ID.hora} <br/>
                        {this.dato.Campanas.ID.lugar} <br/>
                        <hr/>
                        {this.dato.Campanas.ID.descripcion} <br/><br/>
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
                            <KHabilidades voluntario={this.state} habilidades={this.dato.Campanas.ID.Habilidades} anterior={this.anterior} siguiente={this.siguiente}/>
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
                            <KTeryCon voluntario={this.state} tyc={this.dato.Campanas.ID.terminos_condiciones} anterior={this.anterior} siguiente={this.siguiente}/>
                        </div>)

        }

    }
}