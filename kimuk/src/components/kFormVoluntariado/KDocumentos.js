import React, { Component } from 'react';
import './KFormVoluntariado.css';
import '../style/color.css';
import '../style/general.css';
import KFormPregunta from '../KFormPregunta/KFormPregunta';
import KHeaderVoluntariado from './KHeaderVoluntariado';
import './KDocumentos.css';

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
            <table  align="right" width="800" >
              <tr align="left">
                <th>
                  <input type="checkbox"/>
                </th>
                <th>
                  Seleccionar documentos requeridos
                  <input class="marcarbuttom" type="button" value="Marcar todo"/>
                </th>
              </tr>
              <tr align="left">
                <td>
                  <input type="checkbox"/>
                </td>
                <td class="round" >
                  Póliza de seguros
                  <input type="file" name="file" id="file" class="inputfile" />
                  <label for="file">Agregar</label>
                </td>
              </tr>
              <tr align="left">
                <td>
                  <input type="checkbox"/>
                </td>
                <td class="round">Hoja de delincuencia</td>
              </tr>
              <tr align="left">
                <td>
                  <input type="checkbox"/>
                </td>
                <td class="round">Currículum vitae</td>
              </tr>
              <tr align="left">
                <td>
                  <input type="checkbox"/>
                </td>
                <td class="round">Fotocopia de cédula de identidad</td>
              </tr>
              <tr align="left">
                <td>
                  <input type="checkbox"/>
                </td>
                <td class="round">Licencia</td>
              </tr>
              <tr align="left">
                <td>
                  <input type="checkbox"/>
                </td>
                <td class="round">Aviso en caso de seguridad</td>
              </tr>
            </table>
            <button
                            id="navigationButton"
                            className="btn btn-default btn-md"
                            onClick={this.props.anterior}
                        >
                            Anterior
                        </button>
            <div className="offset-6">
              <button
                            id="navigationButton"
                            className="btn btn-default btn-md"
                            onClick={this.props.siguiente}
                        >
                            Siguiente
                        </button>
           </div>
            
          </div>

      );
  }
}