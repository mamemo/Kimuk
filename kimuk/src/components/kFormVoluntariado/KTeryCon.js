import React, { Component } from 'react';
import './KFormVoluntariado.css';
import '../style/color.css';

export default class KTeryCon extends Component {
    render(){
        return(
            <div className="container">
                <div className="row"> hola mundo info voluntariado</div>
                <div className="row">
                    <div className="col-1 offset-2">
                        <button className="bt" onClick={ this.props.anterior }>anterior</button> 
                    </div>
                    <div className="col-1 offset-6">
                        <button className="bt-lg" >Vista previa</button> 
                    </div>
                </div>
            </div>    
        );
    }
}