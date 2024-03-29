/**
 * Archivo que maneja las habilidades que
 * el voluntario quiera agregar a su registro.
 */


import React, { Component } from 'react';
import './KFormVoluntario.css';
import '../style/color.css';
import ReactTooltip from 'react-tooltip';
import { FaLongArrowAltRight, FaLongArrowAltLeft} from 'react-icons/fa';

export default class KHabilidades extends Component {
    constructor(){
        super();
        this.guardar_info=this.guardar_info.bind(this);
    }

    /**
     * Guarda las habilidades seleccionadas.
     */
    guardar_info(e) {

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

    /**
	 * Muestra los componentes deseados.
	 * Actualiza la interfaz dependiendo de lo que pase en la aplicación.
	 */
	render() {

        const tab=[];
        console.log(this.props.habilidades);
        if(this.props.habilidades != null) {
            let habs = this.props.habilidades;
            var nhabs = this.props.habilidades.length;

            for (var i = 0; i < nhabs; i++) {
                const hab = [];

                hab.push(<div className="button button2 text-left">
                          <input
                            type="checkbox"
                            name="habilidades"
                            className="checkbox"
                            value={this.props.habilidades[i]}
                            onChange={this.guardar_info}
                            defaultChecked={this.props.voluntario.habilidades.includes(this.props.habilidades[i])}/>
                            {this.props.habilidades[i]}
                        </div>);
                tab.push(hab);
            }
        }
        return(
          <div className="container_habilidades1">

              <div className="flex-item-hab">

                <div className="text-center">

                  <div clasName="container">

                    <h2> ¿Qué son las habilidades? </h2>
                    <br/>

                    <div class="form-group">

                      <p>
                        Son características que queremos saber si tienes. Selecciona las que crees que van con vos.
                        <br/> <br/>
                        ¡Solo queremos conocerte mejor!
                      </p>

                    </div>

                  </div>

                </div>

              </div>

              <div className="flex-item-hab">

                <div classname="container_habilidades2">
                  <h5> Habilidades deseadas </h5>
                  <hr />

                  <div className="flex-item1 text-left">
                    {tab}
                    <br/>
                    <br/>
                  </div>

                </div>

              </div>

              <div className="row">

                <div className="col-1 offset-2">
                    <button
                      className="btn btn-default"
                      onClick={ this.props.anterior }
                      data-tip data-for='btn-tooltip'> <FaLongArrowAltLeft/> Anterior</button>
                </div>
                <div className="col-1 offset-6">
                    <button
                      className="btn btn-primary"
                      onClick={ this.props.siguiente }
                      data-tip data-for='btn-tooltip2'>Siguiente <FaLongArrowAltRight/></button>
                </div>
                <ReactTooltip id='btn-tooltip' type='warning' effect='solid' place="top">
                    <span>Regresá a la sección de información del voluntario</span>
                </ReactTooltip>
                <ReactTooltip id='btn-tooltip2' type='info' effect='solid' place="top">
                    <span>Continuá configurando tu voluntariado</span>
                </ReactTooltip>
                <br/>
                <br/>
                <br/>
                <br/>
             </div>
          </div>
        );
    }
}
