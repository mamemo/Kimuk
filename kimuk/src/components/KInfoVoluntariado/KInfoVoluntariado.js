/**
 * Archivo que contiene el componente que muestra la información 
 * de un voluntariado ya hecho.
 * Se utiliza en Registrar Voluntario y en el modo Administrador.
 */


import React, { Component } from 'react';
import './KInfoVoluntariado.css';
import '../style/color.css';
import { FaMapMarkerAlt, FaClock, FaRegCalendarAlt } from 'react-icons/fa';


export default class KInfoVoluntariado extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    /**
	 * Muestra los componentes deseados. 
	 * Actualiza la interfaz dependiendo de lo que pase en la aplicación.
	 */
	render() {
        return (
            <div className="header_container">
                <div className="info_container">
                    <div className="thumbnail">
                        <img
                            src={(this.props.url === "") ?  require('../../media/image1-icon.png') : this.props.url}
                            className={'img-responsive'}
                            width="200"
                            height="200"/>
                    </div>
                </div>

                <div className="info_container">
                    <h1>{this.props.campana[0]}</h1>
                    <h4>Organizado por:</h4>
                    <ul>{this.props.vis_encargados}</ul>
                    <p> <FaRegCalendarAlt/> Fecha: {this.props.campana[1]}</p>
                    <p> <FaClock /> Hora: {this.props.campana[2]}</p>
                    <p> <FaMapMarkerAlt /> {this.props.campana[3]}</p>
                    <h4>Detalle</h4>
                    <p>{this.props.campana[4]}</p>
                </div>

            </div>
        );
    }
}
