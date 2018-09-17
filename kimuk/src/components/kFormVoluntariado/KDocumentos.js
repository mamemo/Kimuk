import React, { Component } from 'react';
import './KFormVoluntariado.css';
import '../style/color.css';
import '../style/general.css';
import KFormPregunta from '../KFormPregunta/KFormPregunta';
import KHeaderVoluntariado from './KHeaderVoluntariado';

const question = {
  title: '¿A cuáles documentos hace referencia?',
  question: '¿Deseas seleccionar documentos requeridos?',
  description: 'Adjunta documentos como pólizas de seguro.'
              +' También puedes solicitar a los posibles voluntarios documentos como: cédula de identidad, hoja de delincuencia, curriculum vitae, etc.'
};

export default class KDocumentos extends Component {
  render(){
      return(
          <div className="container">
            <KHeaderVoluntariado />
            <div className="row">
              <KFormPregunta
                title={question.title}
                question={question.question}
                description={question.description} />
            </div>
            <div className="row">
              <div className="col-1 offset-2">
                  <button id="navigationButton" className="btn btn-default btn-md" onClick={ this.props.anterior }>No</button>
              </div>
              <div className="col-1 offset-6">
                  <button id="navigationButton" className="btn btn-primary btn-md" onClick={ this.props.siguiente }>Si</button>
              </div>
            </div>
          </div>
      );
  }
}
