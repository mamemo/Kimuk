import React, { Component } from 'react';
import { Link } from 'react-router';
import './KFormVoluntariado.css';
import '../style/color.css';

export default class KHabilidades extends Component {
    render(){
        return(
            <div className="container">
                <div className="row"> hola mundo habilidades</div>
                <div className="row">
                    <div className="col-1 offset-2">
                        <button className="bt" onClick={ this.props.anterior }>anterior</button> 
                    </div>
                    <div className="col-1 offset-6">
                        <button className="bt-lg" onClick={ this.props.siguiente }>continuar</button> 
                    </div>
                </div>
            </div>    
        );
    }
}