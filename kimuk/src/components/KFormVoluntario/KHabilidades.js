import React, { Component } from 'react';
import './KFormVoluntario.css';
import '../style/color.css';

export default class KHabilidades extends Component {
    render(){
        const hab=[];
        for(var k in this.props.habilidades){
            hab.push( <div><input type="checkbox" name="habilidades" value={k}/> {this.props.habilidades[k]}</div> );
        }
        console.log(this.props.voluntario);
        return(
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h3>¿Qué son las habilidades?</h3>
                        <p>Son características que queremos saber si tienes. Selecciona las que crees que van con vos.<br/>
¡Solo queremos conocerte mejor!</p>     
                        {hab}
                    </div>
                </div>
                
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