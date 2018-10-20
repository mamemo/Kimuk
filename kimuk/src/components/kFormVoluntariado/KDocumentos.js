import React, { Component } from 'react';
import './KFormVoluntariado.css';
import '../style/color.css';
import '../style/general.css';
import './KDocumentos.css';
import ReactTooltip from 'react-tooltip';

import {leer_documentos} from "../DB/CRUDdocuments.js";
import {InDocumentosBD} from "../DB/add-onns.js"

const question = {
  title: '¿A cuáles documentos hace referencia?',
  question: '¿Deseas seleccionar documentos requeridos?',
  description: 'Adjunta documentos como pólizas de seguro.'
              +' También puedes solicitar a los posibles voluntarios documentos como: cédula de identidad, hoja de delincuencia, curriculum vitae, etc.'
};

export default class KDocumentos extends Component {

  constructor(props){
    super(props);
    this.state = {
      documentosBD: []
    }
    this.muestraDocumentos = this.muestraDocumentos.bind(this);
  }

  componentDidMount(){
    leer_documentos().then(
      result => {
        let in_documentos = InDocumentosBD(result);
        this.setState({documentosBD:in_documentos});
      }
    );
  }

muestraDocumentos(docsBD){


  for(var documento in this.state.documentosBD){

    if (documento==0) {
      docsBD.push(
        <div>
          <h6>{this.state.documentosBD[documento]}</h6>
          <input type="file" name="file" id="file" class="inputfile" />
          <label for="file">Agregar</label>
        </div>
      );
    } else {
      docsBD.push(
        <h6>{this.state.documentosBD[documento]}</h6>
      );
    }
  }
}

actualizaDocsSeleccionados(e){

}

  render(){

    const docsBD = [];
    this.muestraDocumentos(docsBD);

      return(
          <div className="container">

            <table align="right" width="800">
              <tr>
                <th>
                  <input type="checkbox"/>
                </th>
                <th>
                  Seleccionar documentos requeridos
                  <input class="marcarbuttom" type="button" value="Marcar todo"/>
                </th>
              </tr>

              {docsBD.map((doc,index)=>{
                return <tr align="left">
                          <td>
                            <input type="checkbox"/>
                          </td>
                          <td class="round">{doc}

                          </td>
                        </tr>

              })}
              </table>
              <div className="offset-6">
                <div className="col-1 offset-6">
                    <button 
                        id="navigationButton" 
                        data-tip data-for='btn-tooltip'
                        className="btn btn-dafault btn-md" 
                        onClick={ this.props.anterior }
                    >
                        Anterior
                    </button>
                </div>
                <ReactTooltip id='btn-tooltip' type='warning' effect='solid' place="right">
                    <span>Regresá a la sección de selección de habilidades</span>
                </ReactTooltip>
                <div className="col-3 offset-6">
                    <button 
                        id="navigationButton" 
                        data-tip data-for='btn-tooltip2'
                        className="btn btn-primary btn-md" 
                        onClick={ this.props.siguiente }
                    >
                        Siguiente
                    </button>
                </div>
                <ReactTooltip id='btn-tooltip2' type='info' effect='solid' place="right">
                    <span>Continuá configurando tu voluntariado</span>
                </ReactTooltip>
            </div>
            
          </div>

      );
  }
}