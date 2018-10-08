import React, { Component } from 'react';
import './KInfoVoluntariado.css';
import '../style/color.css';


export default class KInfoVoluntariado extends Component {

    constructor(props) {
        super(props); 
        this.state = {};
    }

    render() {
        return (
            <div className="header_container">
                <div className="row">
                    <div className="col-4">
                        <div className="thumbnail">
                            <img
                                src={require('../../media/image1-icon.png')}
                                className={'img-responsive'}
                                width="200"
                                height="200"/>
                            </div>
                    </div>
                    <div className="col">
                        <h1>{this.props.campana[7]}</h1>
                        <h3>Organizado por:</h3> 
                        <h4><ul>{this.props.vis_encargados}</ul></h4>
                        <p>Fecha de Creación: {this.props.campana[1]} {this.props.campana[3]}</p>
                        <p>{this.props.campana[6]}</p>
                        <hr />
                        <h2>Detalle</h2>
                        <p>{this.props.campana[0]}</p>
                    </div>
                </div>
            </div>
        );
    }
}