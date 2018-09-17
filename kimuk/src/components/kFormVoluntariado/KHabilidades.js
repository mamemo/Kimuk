import React, { Component } from 'react';
import { Link } from 'react-router';
import './KFormVoluntariado.css';
import '../style/color.css';
import '../style/general.css';
import KFormPregunta from '../KFormPregunta/KFormPregunta';
import KHeaderVoluntariado from './KHeaderVoluntariado';


const question = {
  title: '¿Qué son habilidades?',
  question: '¿Deseas que tus voluntarios te informen sobre que habilidades tienen?',
  description: 'La habilidad es la aptitud innata, talento, destreza o capacidad'
              +' que ostenta una persona para llevar a cabo determinada actividad, trabajo u oficio.'
};

export default class KHabilidades extends Component {

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
