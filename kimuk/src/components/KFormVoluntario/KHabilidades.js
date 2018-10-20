import React, { Component } from 'react';
import './KFormVoluntario.css';
import '../style/color.css';
import ReactTooltip from 'react-tooltip';

export default class KHabilidades extends Component {
    constructor(){
        super();
        this.guardar_info=this.guardar_info.bind(this);
    }
    guardar_info(e){
        

        if(this.props.voluntario[e.target.name].includes(e.target.value)){
            var i=this.props.voluntario[e.target.name].indexOf(e.target.value);
            if(i===0){
                this.props.voluntario[e.target.name].splice(i,i+1);
            }else{
                this.props.voluntario[e.target.name].splice(i,i);
            }
                          
        }else{
            this.props.voluntario[e.target.name].push(e.target.value);  
        }
        
        
    }
    render(){
        const tab=[];
        let habs = this.props.habilidades;
        var nhabs = Math.ceil(this.props.habilidades.length / 2);
        
       for(var i = 0; i < nhabs ; i++){
            const hab=[];   
            for (var k = i*2; k < i+2 ; k++) { 
                hab.push( <td><div className="text-left a"><input type="checkbox" name="habilidades" value={this.props.habilidades[k]} onChange={this.guardar_info} defaultChecked={this.props.voluntario.habilidades.includes(this.props.habilidades[k])}/> {this.props.habilidades[k]}</div></td>);
            }
            tab.push(<tr>{hab}</tr>)
        }
        return(
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h3>¿Qué son las habilidades?</h3>
                        <p>Son características que queremos saber si tienes. Selecciona las que crees que van con vos.<br/>
¡Solo queremos conocerte mejor!</p>     
                    </div>
                </div>
                <div className="row">
                    <div className="col-6 offset-3">  
                        <table>
                            {tab}
                        </table>
                        
                        <br/>
                        <br/>  
                    </div>
                </div>
                <div className="row">
                    <div className="col-1 offset-2">
                        <button 
                            className="btn btn-info"
                            data-tip data-for='btn-tooltip' 
                            onClick={ this.props.anterior }
                        >
                            Anterior
                        </button> 
                    </div>
                    <ReactTooltip id='btn-tooltip' type='warning' effect='solid' place="bottom">
                        <span>Regresá a la sección de información del voluntario</span>
                    </ReactTooltip>
                    <div className="col-1 offset-6">
                        <button 
                            className="btn btn-primary"
                            data-tip data-for='btn-tooltip2'
                            onClick={ this.props.siguiente }
                        >
                            Siguiente
                        </button> 
                    </div>
                    <ReactTooltip id='btn-tooltip2' type='info' effect='solid' place="right">
                        <span>Continuá configurando tu voluntariado</span>
                    </ReactTooltip>
                </div>
                <br/>
                <br/>
            </div>    
        );
    }
}