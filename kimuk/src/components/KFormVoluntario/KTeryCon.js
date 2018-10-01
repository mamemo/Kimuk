import React, { Component } from 'react';
import './KFormVoluntario.css';
import '../style/color.css';
import {insertar_actualizar_voluntarios_camapana, insertar_actualizar_habilidades_voluntarios,
    actualizar_voluntarios_campana, eliminar_voluntario} from '../BD/volunteers';

export default class KTeryCon extends Component {
    constructor(){
        super();
        this.registrar=this.registrar.bind(this);
        this.guardar_info=this.guardar_info.bind(this);
    }
    registrar(){
        console.log(this.props.voluntario);
        insertar_actualizar_voluntarios_camapana(7812303,
            3213,this.props.tipo_id,this.props.nombre,
            this.props.apellido_1,this.props.apellido_2,
            this.props.f_nacimiento,this.props.genero,
            this.props.estado_civil,this.props.ocupacion,
            this.props.provincia,this.props.canton,this.props.distrito,
            this.props.direccion_exacta,this.props.correo,
            this.props.telefono_1,this.props.telefono_2," "," ")
    }
    guardar_info(e){
        this.props.voluntario[e.target.name]=e.target.value;
    }
    render(){
        return(
            <div className="container">
                <div className="row"> 
                <div className="col-6 offset-3">
                {this.props.tyc}
                </div>
                </div>
                <div className="row"> 
                    <div className="col-4 offset-6">
                    <input type="radio" name="tyc" value="si" defaultChecked={this.props.voluntario.tyc==="si"} onChange={this.guardar_info}/> Acepto términos y condiciones <br/>
                    <input type="radio" name="tyc" value="no" defaultChecked={this.props.voluntario.tyc==="no"} onChange={this.guardar_info}/> No acepto <br/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-1 offset-2">
                        <button className="bt" onClick={ this.props.anterior }>anterior</button> 
                    </div>
                    <div className="col-1 offset-6">
                        <button className="bt-lg" onClick={ this.registrar }>Confirmar</button> 
                    </div>
                </div>
            </div>    
        );
    }
}