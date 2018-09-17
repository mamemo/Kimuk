import React, { Component } from 'react';
import { Link } from 'react-router';
import './KFormVoluntariado.css';
import '../style/color.css';

import KInfoVoluntariado from './KInfoVoluntariado'
import KHabilidades from './KHabilidades'
import KAcademica from './KAcademica'
import KDocumentos from './KDocumentos'
import KTeryCon from './KTeryCon'

export default class KFormVoluntariado extends Component {
    constructor(){
        super();
        this.state ={
            step:1
        }
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
                return (<div className="container text-center" >
                            <div>
                            <br/>
                            <h2 className="text-left">Crear voluntariado</h2>
                            {pasos}
                            </div>
                            <KInfoVoluntariado anterior={this.anterior} siguiente={this.siguiente}/>
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
                return (<div className="container text-center" >
                            <div>
                            <br/>
                            <h2 className="text-left">Crear voluntariado</h2>
                            {pasos}
                            </div>
                            <KHabilidades  anterior={this.anterior} siguiente={this.siguiente}/>
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
                return (<div className="container text-center" >
                            <div>
                            <br/>
                            <h2 className="text-left">Crear voluntariado</h2>
                            {pasos}
                            </div>
                            <KDocumentos  anterior={this.anterior} siguiente={this.siguiente}/>
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
                return (<div className="container text-center" >
                            <div>
                            <br/>
                            <h2 className="text-left">Crear voluntariado</h2>
                            {pasos}
                            </div>
                            <KTeryCon  anterior={this.anterior} siguiente={this.siguiente}/>
                        </div>)

        }

    }


}
