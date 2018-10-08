import React, { Component } from 'react';
import './KFormVoluntariado.css';
import '../style/color.css';
import '../style/general.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {leer_habilidades} from "../DB/abilities.js"
import {insertar_actualizar_habilidades} from "../DB/abilities.js"
import {InHabilidadesBD} from '../DB/add-onns.js'

export default class KHabilidades extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valueBuscar: '',
            habilidadesBD: [],
            habilidadesSeleccionadas: []
        }

        this.updateValueBuscar = this.updateValueBuscar.bind(this);
        this.agregarHabilidad = this.agregarHabilidad.bind(this);
        this.muestraHabilidades = this.muestraHabilidades.bind(this);
    }

    componentDidMount() {
        leer_habilidades().then(
            result => {
                let in_Habilidades = InHabilidadesBD(result);
                this.setState({habilidadesBD:in_Habilidades});
            }
        );
    }

    agregarHabilidad() {
        if (this.state.valueBuscar == "") { // Si es vacio no agrega nada
            alert("No se agregó ninguna habilidad a la base de datos. \nEscriba la habilidad en el campo de texto.");
        } else { // Agrega el texto ingresado en el textBox a la BD como habilidad
            if (!insertar_actualizar_habilidades(this.state.valueBuscar)) { // Inserta la habilidad con exito
                alert(this.state.valueBuscar + " agregado como habilidad a la base de datos.");
            } else { // No se inserto la habilidad en la BD
                alert("No se pudo insertar la habilidad " + this.state.valueBuscar + ".");
            }
        }
    }
    
    /**
     * Modifica el state.valueBuscar cada vez que se
     * hace una modificacion en su respectivo input
     */
     updateValueBuscar(event) {
         this.setState({valueBuscar: event.target.value});
     }

     muestraHabilidades(habBD) {
        for(var k in this.state.habilidadesBD) {
            habBD.push( <div className="text-left"><input type="checkbox" name="habilidadesBD" onChange={this.actualizaHabilidadesSeleccionadas} value={this.state.habilidadesBD[k]}/> {this.state.habilidadesBD[k]}</div> );
        }
     }

     actualizaHabilidadesSeleccionadas(e) {
        
     }

    render() {
        const habBD = [];
        this.muestraHabilidades(habBD);
        return (
            <div className="container">
                <label>
                    <input
                        type="text"
                        value={this.state.valueBuscar}
                        onChange={this.updateValueBuscar}
                    />
                </label>
                <button onClick={this.componentDidMount}>Buscar</button>
                <button onClick={this.agregarHabilidad}>+</button>
                <div>
                <h6>Habilidades registradas en BD que usuario puede seleccionar</h6>
                    <div>
                        {habBD}
                    </div>
                </div>
                <div>
                <h6>Habilidades seleccionadas</h6>
                    <div>
                        {this.state.habilidadesSeleccionadas}
                    </div>
                </div>
            </div>
        )
    }
}