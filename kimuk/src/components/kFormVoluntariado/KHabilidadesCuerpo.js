/**
 * Archivo que maneja las habilidades que
 * el encargado quiera agregar a un Voluntariado.
 */


import React, { Component } from 'react';
import './KFormVoluntariado.css';
import '../style/color.css';
import '../style/general.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import ReactTooltip from 'react-tooltip'
import {leer_habilidades} from "../DB/abilities.js"
import {insertar_actualizar_habilidades} from "../DB/abilities.js"
import {InHabilidadesBD} from '../DB/add-onns.js'

export default class KHabilidades extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valueBuscar: '',
            habilidadesBD: [],
            habBD: [],
            habSeleccionadas: []
        }

        this.quitaChecked = this.quitaChecked.bind(this);
        this.onClickBuscar = this.onClickBuscar.bind(this);
        this.updateValueBuscar = this.updateValueBuscar.bind(this);
        this.muestraHabilidades = this.muestraHabilidades.bind(this);
        this.agregarHabilidadABD = this.agregarHabilidadABD.bind(this);
        this.agregaHabilidadSeleccionada = this.agregaHabilidadSeleccionada.bind(this);
        this.existeHabilidadSeleccionada = this.existeHabilidadSeleccionada.bind(this);
        this.eliminaHabilidadSeleccionada = this.eliminaHabilidadSeleccionada.bind(this);
        this.onClickHabilidadSeleccionada = this.onClickHabilidadSeleccionada.bind(this);
        this.muestraHabilidadesSeleccionadas = this.muestraHabilidadesSeleccionadas.bind(this);
        this.onChangeHabilidadesSeleccionadas = this.onChangeHabilidadesSeleccionadas.bind(this);
    }

    /**
	 * Obtiene las habilidades de la base de datos y
	 * llena las variables con la información obtenida.
	 */
    componentDidMount() {
        leer_habilidades().then(
            result => {
                let in_Habilidades = InHabilidadesBD(result);
                this.setState({habilidadesBD:in_Habilidades});
                this.muestraHabilidades("");
                this.muestraHabilidadesSeleccionadas();
            }
        );
    }

    /**
	 * Se agrega una habilidad seleccionada a la base de datos.
	 */
    agregarHabilidadABD() {
        if (this.state.valueBuscar == "") { // Si es vacio no agrega nada
            alert("No se agregó ninguna habilidad a la base de datos. \nEscriba la habilidad en el campo de texto.");
        } else { // Agrega el texto ingresado en el textBox a la BD como habilidad
            if (!insertar_actualizar_habilidades(this.state.valueBuscar)) { // Inserta la habilidad con exito
                // Agrega la habilidad al state
                let arreglo = this.state.habilidadesBD;
                arreglo.push(this.state.valueBuscar);
                this.setState({habilidadesBD: arreglo});

                this.muestraHabilidades("");
                this.setState({valueBuscar: ''});
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
      if(event.target.value === "") {
        this.setState({valueBuscar: event.target.value});
        this.muestraHabilidades("");
      }
      else{
        this.setState({valueBuscar: event.target.value});
      }
    }

    /**
	 * Muestra las habilidades disponibles para seleccionar.
	 */
    muestraHabilidades(habilidad) {
        let habilidades = [];
        if (habilidad === "") { // muestra todas las habilidades
            for(var k in this.state.habilidadesBD) {
              if(this.props.habilidades.includes(this.state.habilidadesBD[k])){
                habilidades.push( <div className="flex-item">
                                    <label className="container_checkbox">
                                      {this.state.habilidadesBD[k]}
                                      <input type="checkbox"
                                             name="habilidadesBD"
                                             className="checkbox"
                                             onChange={this.onChangeHabilidadesSeleccionadas}
                                             value={this.state.habilidadesBD[k]}
                                             checked = "true"/>
                                      <span class="checkmark"></span>
                                    </label>
                                 </div> );
              }else{
                habilidades.push( <div className="flex-item">
                                    <label className="container_checkbox">
                                      {this.state.habilidadesBD[k]}
                                      <input type="checkbox"
                                             name="habilidadesBD"
                                             className="checkbox"
                                             onChange={this.onChangeHabilidadesSeleccionadas}
                                             value={this.state.habilidadesBD[k]}/>
                                      <span class="checkmark"></span>
                                    </label>
                                 </div> );
               }
            }
        } else { // muestra habilidades segun input
            for (var k in this.state.habilidadesBD) {
                if (this.state.habilidadesBD[k].replace(/\s+/g, ' ').toLowerCase()
                        .indexOf(habilidad.replace(/\s+/g, ' ').toLowerCase()) > -1) {
                    habilidades.push( <div className="flex-item">
                                        <label className="container_checkbox">
                                          {this.state.habilidadesBD[k]}
                                          <input type="checkbox"
                                                 name="habilidadesBD"
                                                 className="checkbox"
                                                 onChange={this.onChangeHabilidadesSeleccionadas}
                                                 value={this.state.habilidadesBD[k]}/>
                                         <span class="checkmark"></span>
                                       </label>
                                     </div> );
                }
            }
        }
        this.setState({habBD: habilidades});
    }

    /**
	 * Muestra las habilidades que fueron seleccionadas.
	 */
    muestraHabilidadesSeleccionadas() {
        let habilidades = [];
        for(var k in this.props.habilidades) {
            habilidades.push( <div className="text-left">
                                <button className="button button2"
                                        onClick={this.onClickHabilidadSeleccionada}
                                        value={this.props.habilidades[k]}>
                                        {this.props.habilidades[k]}
                                </button>
                              </div> );
        }
        this.setState({habSeleccionadas: habilidades});
    }

    /**
	   * Método que controla que pasa con una habilidad cuando
     * es seleccionada y antes estuvo seleccionada.
	 */
    onChangeHabilidadesSeleccionadas(e) {
        if (e.target.checked) { // activa check (agrega a habilidadesSeleccionadas)
            this.agregaHabilidadSeleccionada(e.target.value);
        } else { // desactiva check (elimina de  habilidadesSeleccionadas)
            this.eliminaHabilidadSeleccionada(e.target.value);
        }
        this.muestraHabilidadesSeleccionadas();
    }

    /**
	 * Método que controla que pasa con una habilidad cuando
     * es seleccionada.
	 */
    onClickHabilidadSeleccionada(e) {
        this.eliminaHabilidadSeleccionada(e.target.value);
        this.muestraHabilidadesSeleccionadas();
        this.quitaChecked(e.target.value);
    }

    /**
	 * Método que quita la marca de check en una habilidad.
     * @param habilidad La habilidad seleccionada
	 */
    quitaChecked(habilidad) {
        let habilidades = this.state.habBD;
        for(var k in habilidades) {
            if (habilidades[k].props.children[2] === habilidad) { // aqui hay un problema (.value devuelve define -> porque habilidades[k] es un div, NO el input)
                //console.log(habilidades[k]);
                //habilidades[k].props.children[0].props.checked = false;
                break;
            }
        }
        this.setState({habBD: habilidades});
    }

    /**
	 * Método que se acciona cuando se agrega la habilidad
     * a la sección de Habilidades Seleccionadas.
     * @param habilidad La habilidad seleccionada
	 */
    agregaHabilidadSeleccionada(habilidad) {
        let existeHabilidad = this.existeHabilidadSeleccionada(habilidad);
            if (!existeHabilidad) { // si la habilidad NO esta en habilidadesSeleccionadas
                this.props.habilidades.push(habilidad);
            }
    }

    /**
	 * Método que se acciona cuando se elimina la habilidad
     * de la sección de Habilidades Seleccionadas.
     * @param habilidad La habilidad seleccionada
	 */
    eliminaHabilidadSeleccionada(habilidad) {
        for (var k in this.props.habilidades) {
            if (habilidad === this.props.habilidades[k]) {
                this.props.habilidades.splice(k, 1);
            }
        }
    }

    /**
     * Método para saber si una habilidad fue seleccionada.
     * @param habilidad La habilidad seleccionada.
     * RETURN true => si la habilidad se encuentra en las habilidades seleccionadas
     * RETURN false => si la habilidad NO se encuentra en las habilidades seleccionadas
     */
    existeHabilidadSeleccionada(habilidad) {
        let respuesta = false;
        for (var k in this.props.habilidades) {
            if (this.props.habilidades[k] === habilidad) {
                respuesta = true;
                break;
            }
        }
        return respuesta;
    }

    /**
     * Método que controla cuando se presiona el botón
     * de buscar una Habilidad.
     */
    onClickBuscar() {
        this.muestraHabilidades(this.state.valueBuscar);
    }

    /**
	 * Muestra los componentes deseados.
	 * Actualiza la interfaz dependiendo de lo que pase en la aplicación.
	 */
    render() {
        return (
            <div className="container">

                <input
                    type="text"
                    value={this.state.valueBuscar}
                    placeholder='Busca habilidades específicas'
                    onChange={this.updateValueBuscar}
                />
                <button
                    onClick={this.onClickBuscar}
                    data-tip data-for='btn-tooltip-botonBuscar'
                >
                    Buscar
                </button>
                <ReactTooltip id='btn-tooltip-botonBuscar' type='info' effect='solid' placement="down" place="left">
                    <span>
                        Busca habilidades específicas.
                        <br />
                        Para ver todas las habilidades presiona
                        <br/>
                        el botón buscar, con la entrada de texto vacía.
                    </span>
                </ReactTooltip>
                <button
                    onClick={this.agregarHabilidadABD}
                    data-tip data-for='btn-tooltip-botonAgregar'
                >
                    +
                </button>
                <ReactTooltip id='btn-tooltip-botonAgregar' type='info' effect='solid' placement="down" place="bottom">
                    <span>Si no encontrás la habilidad deseada podés agregarla con este botón a nuestra base de datos</span>
                </ReactTooltip>
                <div>
                <h5 className="card-title"> Habilidades </h5>
                    <div className="container_habilidades0">
                        {this.state.habBD}
                    </div>
                </div>
                <div>
                <h5 className="card-title"> Habilidades seleccionadas </h5>
                    <div className="container_habilidades2">
                        {this.state.habSeleccionadas}
                    </div>
                </div>
            </div>
        )
    }
}
