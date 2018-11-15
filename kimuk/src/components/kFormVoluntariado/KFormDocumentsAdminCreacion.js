/**
 * Archivo que pregunta cuáles archivos subir.
 */


import React, { Component } from 'react';
import './KFormVoluntariado.css';
import '../style/color.css';
import '../style/general.css';
import KFormPregunta from '../KFormPregunta/KFormPregunta';
import KModalDocumentos from './KModalDocumentos';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import ReactTooltip from 'react-tooltip'
import { FaLongArrowAltLeft} from 'react-icons/fa';

const question = {
    title: '¿A cuáles documentos hace referencia?',
    question: '¿Deseas seleccionar documentos requeridos?',
    description: 'Adjunta documentos como pólizas de seguro.'
        +' También puedes solicitar a los posibles voluntarios documentos como: cédula de identidad, hoja de delincuencia, curriculum vitae, etc.'
};

export default class KFormDocumentsAdminCreacion extends Component {
    
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

              <KModalDocumentos
                campana = {{
                    id:this.props.campana.id,
                    subio:this.props.campana.subio,
                    document:this.props.campana.document,
                    subioCod:this.props.campana.subioCod,
                    documentCod:this.props.campana.documentCod
                 }}
                 siguiente = {this.props.siguiente}
                 anterior =  {this.props.anterior}
                 handler = {this.props.handler}
              />

              <div className="flex-item">

                  <button
                      className="btn btn-default btn-md"
                      onClick={this.props.anterior}
                      data-tip data-for='btn-tooltip2'
                  >
                    <FaLongArrowAltLeft />
                    Anterior
                  </button>
                  <br/>
                  <br/>
                  <ReactTooltip id='btn-tooltip2' type='warning' effect='solid' place="top">
                      <span>Regresá a la sección de habilidades</span>
                  </ReactTooltip>

              </div>

          </div>
        );
    }
}
