import React, { Component } from 'react';
import './KFormVoluntario.css';
import '../style/color.css';

export default class KTeryCon extends Component {
    constructor(){
        super();
        this.registrar=this.registrar.bind(this);
        this.guardar_info=this.guardar_info.bind(this);
    }
    registrar(){
        console.log(this.props.voluntario);
        //codigo del registro
    }
    guardar_info(e){
        this.props.voluntario[e.target.name]=e.target.value;
    }
    render(){
        return(
            <div className="container">
                <div className="row"> 
                <div className="col-6 offset-3">
                {this.props.tyc}
                </div>
                </div>
                <div className="row"> 
                    <div className="col-4 offset-6">
                    <input type="radio" name="tyc" value="si" defaultChecked={this.props.voluntario.tyc==="si"} onChange={this.guardar_info}/> Acepto términos y condiciones <br/>
                    <input type="radio" name="tyc" value="no" defaultChecked={this.props.voluntario.tyc==="no"} onChange={this.guardar_info}/> No acepto <br/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-1 offset-2">
                        <button className="bt" onClick={ this.props.anterior }>anterior</button> 
                    </div>
                    <div className="col-1 offset-6">
                        <button className="bt-lg" onClick={ this.registrar }>Confirmar</button> 
                    </div>
                </div>
            </div>    
        );
    }
}