import React, { Component } from 'react';
import './KFormVoluntariado.css';
import '../style/color.css';
import '../style/general.css';
import ReactTooltip from 'react-tooltip'
import './KDocumentos.css';

import {leer_documentos} from "../DB/CRUDdocuments.js";
import {InDocumentosBD} from "../DB/add-onns.js"

export default class KDocumentos extends Component {

  constructor(props){
    super(props);
    this.state = {
      documentosBD: []
    }
    this.muestraDocumentos = this.muestraDocumentos.bind(this);
    this.onChangeSelectedDocuments = this.onChangeSelectedDocuments.bind(this);
    this.deleteSelectedDocument = this.deleteSelectedDocument.bind(this);
    this.isDocumentMember = this.isDocumentMember.bind(this);
    this.addPolicyDocument = this.addPolicyDocument.bind(this);
    this.addDocument = this.addDocument.bind(this);
    this.addPolicyDocumentCheck = this.addPolicyDocumentCheck.bind(this);
    this.addDocumentCheck = this.addDocumentCheck.bind(this);
  }

  componentDidMount(){
    leer_documentos().then(
      result => {
        let in_documentos = InDocumentosBD(result);
        this.setState({documentosBD:in_documentos});
      }
    );
  }

  addPolicyDocument(docsBD, documento){
    docsBD.push(
      <tr align="left">
        <td>
          <input
            type="checkbox"
            value={this.state.documentosBD[documento]}
            onChange={this.onChangeSelectedDocuments} />
        </td>
        <td class="round">
          <div>
            <h6>{this.state.documentosBD[documento]}</h6>
            <input type="file" name="file" id="file" class="inputfile" />
            <label for="file">Agregar</label>
          </div>
        </td>
      </tr>
    );
  }

  addPolicyDocumentCheck(docsBD, documento){
    docsBD.push(
      <tr align="left">
        <td>
          <input
            checked
            type="checkbox"
            value={this.state.documentosBD[documento]}
            onChange={this.onChangeSelectedDocuments} />
        </td>
        <td class="round">
          <div>
            <h6>{this.state.documentosBD[documento]}</h6>
            <input type="file" name="file" id="file" class="inputfile" />
            <label for="file">Agregar</label>
          </div>
        </td>
      </tr>
    );
  }

  addDocument(docsBD, documento){
    docsBD.push(
      <tr align="left">
        <td>
          <input
            type="checkbox"
            value={this.state.documentosBD[documento]}
            onChange={this.onChangeSelectedDocuments} />
        </td>
        <td class="round">
          <div>
            <h6>{this.state.documentosBD[documento]}</h6>
          </div>
        </td>
      </tr>
    );
  }

  addDocumentCheck(docsBD, documento){
    docsBD.push(
      <tr align="left">
        <td>
          <input
            checked
            type="checkbox"
            value={this.state.documentosBD[documento]}
            onChange={this.onChangeSelectedDocuments} />
        </td>
        <td class="round">
          <div>
            <h6>{this.state.documentosBD[documento]}</h6>
          </div>
        </td>
      </tr>
    );
  }

  muestraDocumentos(docsBD) {;
    for(var documento in this.state.documentosBD) {
      let memberDoc = this.isDocumentMember(this.state.documentosBD[documento]);
      if(this.state.documentosBD[documento] === 'Póliza de seguro') {
        if (memberDoc) {
          this.addPolicyDocumentCheck(docsBD, documento);
        }
        else {
          this.addPolicyDocument(docsBD, documento);
        }
      }
      else {
        if (memberDoc) {
          this.addDocumentCheck(docsBD, documento);
        }
        else {
          this.addDocument(docsBD, documento);
        }
      }
    }
  }

  onChangeSelectedDocuments(e) {
      if (e.target.checked) { // activa check (agrega a habilidadesSeleccionadas)
          this.props.documents.push(e.target.value);
      } else { // desactiva check (elimina de  habilidadesSeleccionadas)
          this.deleteSelectedDocument(e.target.value);
      }
  }

  deleteSelectedDocument(doc) {
      for (var k in this.props.documents) {
          if (doc === this.props.documents[k]) {
              this.props.documents.splice(k, 1); // elimina de  documento seleccionado
          }
      }
  }

  isDocumentMember(doc) {
      return this.props.documents.includes(doc);
  }

  render() {

    const docsBD = [];
    this.muestraDocumentos(docsBD);
      return(
          <div className="container">

            <table align="right" width="800">
              <tr data-tip data-for='table-tooltip'>
                <th>
                  <input type="checkbox"/>
                </th>
                <th>
                  Seleccionar documentos requeridos
                  <input class="marcarbuttom" type="button" value="Marcar todo"/>
                </th>
              </tr>
              {docsBD.map((doc)=>{
                return <tr align="left">
                          {doc}
                        </tr>
              })}
            </table>
            <ReactTooltip id='table-tooltip' type='info' effect='solid'>
              <span>
                <h4> ¿A cuáles documentos hace referencia? </h4>
                <h5> ¿Deseas seleccionar documentos requeridos? </h5>
                <p>
                  Adjunta documentos como pólizas de seguro.
                  <br />
                  También puedes solicitar a los posibles voluntarios documentos como:
                  <br />
                  <ul>
                    <li>Cédula de identidad </li>
                    <li>Hoja de delincuencia </li>
                    <li>Curriculum Vitae </li>
                    <li>etc.</li>
                  </ul>
                </p>
              </span>
            </ReactTooltip>
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