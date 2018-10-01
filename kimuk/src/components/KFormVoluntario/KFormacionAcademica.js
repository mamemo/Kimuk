import React, { Component } from 'react';
import './KFormVoluntario.css';
import '../style/color.css';
import './formacion.css'

let listaTitulos = [];

export default class KFormacionAcademica extends Component
{
    constructor() {
        super();
        this.agregarTitulo = this.agregarTitulo.bind(this);
        this.agregarLinea = this.agregarLinea.bind(this);
        this.quitarTitulo = this.quitarTitulo.bind(this);
    }

    componentDidMount(){
        listaTitulos = [];
        for(let k in this.props.voluntario.formacion)
        {
            listaTitulos.push(<table className="formacion">
                <tr>
                    <td className="form">{this.props.voluntario.formacion[k][0]}</td>
                    <td className="form">{this.props.voluntario.formacion[k][1]}</td>
                    <td className="form">{this.props.voluntario.formacion[k][2]}</td>
                    <td className="form">{this.props.voluntario.formacion[k][3]}</td>
                </tr>
                <button id={k} onClick={this.quitarTitulo} className="forma">-</button>
            </table>);
        }
        this.forceUpdate();
    }

    quitarTitulo(e){
        let id = parseInt(e.target.id);
        this.props.voluntario.formacion.splice(id, 1);
        this.componentDidMount();
    }

    agregarTitulo(){
        let titulo = ["Universidad", "Bachi", "Bachi", "Bachi"];
        this.props.voluntario.formacion.push(titulo);
        this.componentDidMount();
    }

    agregarLinea(centro, especialidad, grado, titulo){
        let id = listaTitulos.length;
        listaTitulos.push(
            <table className="formacion">
                <tr>
                    <td className="form">{centro}</td>
                    <td className="form">{especialidad}</td>
                    <td className="form">{grado}</td>
                    <td className="form">{titulo}</td>
                </tr>
                <button id={id} onClick={this.quitarTitulo} className="forma">-</button>
            </table>
        );
        this.forceUpdate();
    }

    render(){
        return (
            <div className={"container"}>
                <h1>Titulo</h1>
                <div>
                <table class="title">
                    <tr>
                        <td>Grado Académico</td>
                        <td>Centro Académico</td>
                        <td>Título Obtenido</td>
                        <td>Especialidad</td>
                    </tr>
                </table>
                <table className="formacion">
                    <tr>
                        <td className="form">Universidad</td>
                        <td className="form">Instituto Tecnologico de Costa Rica</td>
                        <td className="form">Bachillerato Ingenieria en Computacion</td>
                        <td className="form">Especialidad</td>
                    </tr>
                    <button onClick={this.agregarTitulo} className="forma">-</button>
                </table>
                </div>
                <div>
                    {listaTitulos}
                </div>
                <br/> <br/> <br/>
                <div className="row">
                    <div className="col-1 offset-2">
                        <button className="bt" onClick={ this.props.anterior }>anterior</button>
                    </div>
                    <div className="col-1 offset-6">
                        <button className="bt-lg" onClick={ this.props.siguiente }>continuar</button>
                    </div>
                </div>
                <br/> <br/> <br/>
            </div>
        );
    }
}