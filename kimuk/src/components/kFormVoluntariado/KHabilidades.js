import React, { Component } from 'react';
import './KFormVoluntariado.css';
import '../style/color.css';
import '../style/general.css';
import KFormPregunta from '../KFormPregunta/KFormPregunta';
import KModalHabilidades from './KModalHabilidades';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import ReactTooltip from 'react-tooltip'

const question = {
    title: '¿Qué son habilidades?',
    question: '¿Deseas que tus voluntarios te informen sobre que habilidades tienen?',
    description: 'La habilidad es la aptitud innata, talento, destreza o capacidad'
        + ' que ostenta una persona para llevar a cabo determinada actividad, trabajo u oficio.'
};

export default class KHabilidades extends Component {
    confirmacionAccion = (titulo, mensaje) => {
        confirmAlert({
            title: titulo,
            message: mensaje,
            buttons: [
              {
                label: 'Si',
                onClick: () => alert('Si')
              },
              {
                label: 'No',
                onClick: () => alert('No')
              }
            ]
          })
    };

    render() {
        return (
            <div className="container">
                <div className="row">
                    <KFormPregunta
                        title={question.title}
                        question={question.question}
                        description={question.description} />

                </div>
                <div className="row">
                    <div className="col-1 offset-2">
                        <button
                            id="navigationButton"
                            className="btn btn-secundary"
                            data-tip data-for='btn-tooltip'
                            onClick={this.props.siguiente}
                        >
                            No
                        </button>
                        <ReactTooltip id='btn-tooltip' type='warning' effect='solid' place="right">
                            <span>Si no querés seleccionar habilidades para tu voluntariado dale click aquí</span>
                        </ReactTooltip>
                        <button
                            id="navigationButton"
                            data-tip data-for='btn-tooltip2'
                            className="btn btn-default btn-md"
                            onClick={this.props.anterior}
                        >
                            Anterior
                        </button>
                        <ReactTooltip id='btn-tooltip2' type='info' effect='solid' place="bottom">
                            <span>Regresá a la sección de información de voluntariado</span>
                        </ReactTooltip>
                    </div>
                    <div className="col-1 offset-6">
                        <KModalHabilidades habilidades={this.props.skills} siguiente={this.props.siguiente} />
                    </div>
                </div>
            </div>
        );
    }
}
