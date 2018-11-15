/**
 * Archivo que pregunta si se quiere agregar Habilidades para el Voluntariado.
 */


import React, { Component } from 'react';
import './KFormVoluntariado.css';
import '../style/color.css';
import '../style/general.css';
import KFormPregunta from '../KFormPregunta/KFormPregunta';
import KModalHabilidades from './KModalHabilidades';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import ReactTooltip from 'react-tooltip'
import { FaLongArrowAltLeft} from 'react-icons/fa';

const question = {
    title: '¿Qué son habilidades?',
    question: '¿Deseas que tus voluntarios te informen sobre que habilidades tienen?',
    description: 'La habilidad es la aptitud innata, talento, destreza o capacidad'
        + ' que ostenta una persona para llevar a cabo determinada actividad, trabajo u oficio.'
};

export default class KHabilidades extends Component {
    
    /**
	 * Conforma la pregunta a mostrar.
     * @param titulo El título de la pregunta
     * @param mensaje Mensaje de la pregunta
	 */
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

     /**
	 * Muestra los componentes deseados. 
	 * Actualiza la interfaz dependiendo de lo que pase en la aplicación.
	 */
    render() {
        return (
            <div className="container_habilidades1">

                <div className="flex-item-hab">

                  <div className="text-center">

                    <KFormPregunta
                        title={question.title}
                        question={question.question}
                        description={question.description} />

                  </div>

                </div>

                <KModalHabilidades habilidades={this.props.skills} siguiente={this.props.siguiente} />

                <div className="flex-item">

                  <button
                      data-tip data-for='btn-tooltip2'
                      className="btn btn-default"
                      onClick={this.props.anterior}
                  >
                    <FaLongArrowAltLeft/>
                    Anterior
                  </button>
                  <ReactTooltip id='btn-tooltip2' type='warning' effect='solid' place="top">
                      <span>Regresá a la sección de información del voluntariado</span>
                  </ReactTooltip>

               </div>

            </div>
        );
    }
}
