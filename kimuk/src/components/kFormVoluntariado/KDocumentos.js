import React, { Component } from 'react';
import './KFormVoluntariado.css';
import '../style/color.css';
import '../style/general.css';
import KFormPregunta from '../KFormPregunta/KFormPregunta';
import ReactTooltip from 'react-tooltip'
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

  mostrarDocumentos() {
         leer_documentos().then(
           result => {
             const documentos = result;
             let documentosGraficos = [];
             let documentosLista = [];

             documentosGraficos.push(
               <div>
                 <input type="checkbox"/>
                 <label>&nbsp;&nbsp;{"Seleccionar documentos requeridos"}
                  <input class="marcarbuttom" type="button" value="Marcar todo"/>
                </label>
               </div>
             );

             for(let k in documentos)
             {
               let memberDoc = this.isDocumentMember(this.state.documentosBD[k]);
               if (documentos[k]==="Póliza de seguro") {
                 if (memberDoc) {
                   this.addPolicyDocumentCheck(documentosGraficos, k, documentos);
                 }
                 else {
                   this.addPolicyDocument(documentosGraficos, k, documentos);
                 }
               } else {
                 if (memberDoc) {
                   this.addDocumentCheck(documentosGraficos, k, documentos);
                 }
                 else {
                   this.addDocument(documentosGraficos, k, documentos);
                 }

               }

                 documentosLista.push(documentos[k]);
             }
             this.setState({
                 documentosBD: documentosGraficos,
                 listaDocumentosEscogidos: documentosLista
             });
         });
     }

     static onChangeCheckBox(e) {
       const button = document.getElementById("file" + e.target.id);
       button.disabled = !button.disabled;
     }



     addPolicyDocument(documentosGraficos, k, documentos){
       documentosGraficos.push(
           <div className={"containerdoc"}>


             <label className={"lbldoc"}>
                   <input
                     type="checkbox"
                     value={documentos[k]}
                     onChange={this.onChangeSelectedDocuments} />

                    &nbsp;&nbsp;{documentos[k]}

                   <input type="file" name={k} id={"file" + k.toString()} className="inputfile" accessKey={documentos[k]}

                          onChange={this.onChangeFileButton}/>
                   <label htmlFor={"file" + k.toString()}>Adjuntar</label>
               </label>
               <label className={"docname"} id={"name" + k.toString()}>&nbsp;</label>
               <br/>
               <progress max={100} value={0} id={"bar" + k.toString()}>0%</progress>
               <br/>
           </div>
       );
     }

     addPolicyDocumentCheck(documentosGraficos, k, documentos){
       documentosGraficos.push(
           <div className={"containerdoc"}>

             <label className={"lbldoc"}>
                   <input
                     checked
                     type="checkbox"
                     value={documentos[k]}
                     onChange={this.onChangeSelectedDocuments} />

                    &nbsp;&nbsp;{documentos[k]}

                   <input type="file" name={k} id={"file" + k.toString()} className="inputfile" accessKey={documentos[k]}

                          onChange={this.onChangeFileButton}/>
                   <label htmlFor={"file" + k.toString()}>Adjuntar</label>
               </label>
               <label className={"docname"} id={"name" + k.toString()}>&nbsp;</label>
               <br/>
               <progress max={100} value={0} id={"bar" + k.toString()}>0%</progress>
               <br/>
           </div>
       );
     }

     addDocument(documentosGraficos, k, documentos){
       documentosGraficos.push(
           <div className={"containerdoc"}>

             <label className={"lbldoc"}>
                 <input
                   type="checkbox"
                   value={documentos[k]}
                   onChange={this.onChangeSelectedDocuments} />
                &nbsp;&nbsp;{documentos[k]}

               </label>
               <label className={"docname"} id={"name" + k.toString()}>&nbsp;</label>
               <br/>

           </div>
       );
     }

     addDocumentCheck(documentosGraficos, k, documentos){
       documentosGraficos.push(
           <div className={"containerdoc"}>


             <label className={"lbldoc"}>

             <input
               checked
               type="checkbox"
               value={documentos[k]}
               onChange={this.onChangeSelectedDocuments} />

             &nbsp;&nbsp;{documentos[k]}

               </label>
               <label className={"docname"} id={"name" + k.toString()}>&nbsp;</label>
               <br/>

           </div>
       );
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
    this.mostrarDocumentos();

      return(
          <div className="container">

            <div>
              <br/>
                {this.state.documentosBD}
              <br/>
            </div>
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
                <input class="btn btn-default" float="left" type="button" onClick={ this.props.anterior } value="Anterior"/>
                <input class="btn btn-primary" float="right" type="button" onClick={ this.props.siguiente } value="Siguiente"/>
            </div>
          </div>

      );
  }
}