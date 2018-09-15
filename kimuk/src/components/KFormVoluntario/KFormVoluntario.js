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
            direccion_exacta:""
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
                            
                            <h2 className="text-left">Crear voluntariado</h2>
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
                            <h2 className="text-left">Crear voluntariado</h2>
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
                            <h2 className="text-left">Crear voluntariado</h2>
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
                            <h2 className="text-left">Crear voluntariado</h2>
                            {pasos} 
                            </div>
                            <KTeryCon  anterior={this.anterior} siguiente={this.siguiente}/>
                        </div>)

        }

    }
}