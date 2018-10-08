import React, { Component } from 'react';
import './KFormVoluntario.css';
import '../style/color.css';

export default class KDocumentos extends Component {
    render(){
        return(
            <div className="container">
                <div className="row">  
                <div className="col-6 offset-3">
                    <input type="file" />
                    <br/>
                    <br/>    
                </div>
               </div>
                <div className="row">
                    <div className="col-1 offset-2">
                        <button className="btn btn-info" onClick={ this.props.anterior }>anterior</button> 
                    </div>
                    <div className="col-1 offset-6">
                        <button className="btn btn-primary" onClick={ this.props.siguiente }>continuar</button> 
                    </div>
                </div>
                <br/>
                <br/>
            </div>    
        );
    }
}