import React, { Component } from 'react';
import './KFormVoluntariado.css';
import '../style/color.css';

export default class KInfoVolutariado extends Component {
    render(){
        return(
            <div className="container">
                <div className="row"> hola mundo info voluntariado</div>
                <div className="row">
                    <div className="col-1 offset-9">
                        <button className="bt-lg" onClick={ this.props.siguiente }>continuar</button> 
                    </div>
                </div>
            </div>    
        );
    }
}