import React, { Component } from 'react';
import './KFormVoluntariado.css';
import '../style/color.css';
import '../style/general.css';
import KFormPregunta from '../KFormPregunta/KFormPregunta';
import KHeaderVoluntariado from './KHeaderVoluntariado';
import './KDocumentos.css';

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
            <KHeaderVoluntariado />

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
                <input class="marcarbuttom" float="right" type="button" onClick={ this.props.siguiente } value="Siguiente"/>
            </div>
          </div>

      );
  }
}
