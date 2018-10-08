import React, { Component } from 'react';
import './KFormVoluntario.css';
import '../style/color.css';
import '../DB/abilities';
import {insertar_actualizar_voluntarios_camapana, insertar_actualizar_habilidades_voluntarios,
actualizar_voluntarios_campana, eliminar_voluntario} from "../DB/volunteers";

export default class KTeryCon extends Component {
    constructor(){
        super();
        this.registrar=this.registrar.bind(this);
        this.guardar_info=this.guardar_info.bind(this);
    }
    registrar() {
        const d = new Date();
        console.log(this.props.voluntario.habilidades);
        if (!insertar_actualizar_voluntarios_camapana(
            this.props.voluntario.Id_campana,
            this.props.voluntario.id,
            this.props.voluntario.tipo_id,
            this.props.voluntario.nombre,
            this.props.voluntario.apellido_1,
            this.props.voluntario.apellido_2,
            this.props.voluntario.f_nacimiento,
            this.props.voluntario.genero,
            this.props.voluntario.estado_civil,
            this.props.voluntario.ocupacion,
            this.props.voluntario.provincia,
            this.props.voluntario.canton,
            this.props.voluntario.distrito,
            this.props.voluntario.direccion_exacta,
            this.props.voluntario.correo,
            this.props.voluntario.telefono_1,
            this.props.voluntario.telefono_2,
            d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear(),
            "Pendiente"
        )){
            for (let habilidad in this.props.voluntario.habilidades) {
                if (insertar_actualizar_habilidades_voluntarios(this.props.voluntario.Id_campana,
                    this.props.voluntario.id, habilidad, this.props.voluntario.habilidades[habilidad])) {
                    alert("Ha ocurrido un error al registrar el voluntario");
                    return;
                }
            }
            // TODO -> Meter contanctos de emergencia, beneficiarios e informacion academica
        }else{
            alert("Ha ocurrido un error al registrar el voluntario");
        }
        alert("Registro exitoso");
    }

    guardar_info(e){
        this.props.voluntario[e.target.name]=e.target.value;
    }
    render(){
        return(
            <div className="container">
                <div className="row"> 
                <div className="col-6 offset-3 border border-dark text-justify">
                {this.props.tyc}
                </div>
                </div>
                <div className="row"> 
                    <div className="col-4 offset-6 text-left">
                    <input type="radio" name="tyc" value="si" defaultChecked={this.props.voluntario.tyc==="si"} onChange={this.guardar_info}/> Acepto términos y condiciones <br/>
                    <input type="radio" name="tyc" value="no" defaultChecked={this.props.voluntario.tyc==="no"} onChange={this.guardar_info}/> No acepto <br/>
                    <br/>
                    <br/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-1 offset-2">
                        <button className="btn btn-info" onClick={ this.props.anterior }>anterior</button> 
                    </div>
                    <div className="col-1 offset-6">
                        <button className="btn btn-success" onClick={ this.registrar }>Confirmar</button> 
                    </div>
                </div>
                <br/>
                <br/>
            </div>    
        );
    }
}