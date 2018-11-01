import React, { Component } from 'react';
import './KFormVoluntariado.css';
import '../style/color.css';
import '../style/general.css';
import KFormPregunta from '../KFormPregunta/KFormPregunta';
import KHeaderVoluntariado from './KHeaderVoluntariado';
import KModalDocumentos from './KModalDocumentos';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';


const question = {
    title: '¿A cuáles  hace referencia?',
    question: '¿Deseas seleccionar documentos requeridos?',
    description: 'Adjunta documentos como pólizas de seguro.'
        +' También puedes solicitar a los posibles voluntarios documentos como: cédula de identidad, hoja de delincuencia, curriculum vitae, etc.'
};

export default class KFormDocumentsAdminCreacion extends Component {
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
                            className="btn btn-default btn-md"
                            onClick={this.props.siguiente}
                        >
                            No
                        </button>
                        <button
                            id="navigationButton"
                            className="btn btn-default btn-md"
                            onClick={this.props.anterior}
                        >
                            Anterior
                        </button>
                    </div>
                    <div className="col-1 offset-6">
                        <KModalDocumentos

                        campana = {{
                          id:this.props.campana.id,
                          subio:this.props.campana.subio,
                          document:this.props.campana.document
                         }}
                         siguiente = {this.props.siguiente}
                         anterior =  {this.props.anterior}

                         handler = {this.props.handler}

                        />
                    </div>
                </div>
            </div>
        );
    }
}
