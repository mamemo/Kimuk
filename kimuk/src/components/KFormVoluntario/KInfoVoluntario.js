import React, { Component } from 'react';
import './KFormVoluntario.css';
import '../style/color.css';

export default class KInfoVoluntario extends Component {
    obtener_canton(){
        console.log("Hola mundo");
    }
    render(){
        return(
            <div className=" text-left container">
                <div className="row"> 
                <table>
                    <tr>
                        <td colspan="3">Tipo de indentificación
                            <br/>
                            <select>
                            <option value="cedula">Cedula</option>
                            <option value="pasaporte">Pasaporte</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="3">Indentificación | Número de residencia:
                            <br/>
                            <input type="text" />
                        </td>
                    </tr>
                    <tr>
                        <td>Nombre:
                            <br/>
                            <input type="text" />
                        </td>
                        <td>Primer apellido:
                            <br/>
                            <input type="text" />
                        </td> 
                       <td>Segundo apellido:
                            <br/>
                            <input type="text" />
                        </td>
                    </tr>
                    <tr>
                        <td colspan="3">Fecha de nacimiento:
                            <br/>
                            <input type="text" />
                        </td>
                    </tr>
                    <tr>
                        <td colspan="3">Género:
                            <br/>
                            <input type="radio" name="genero" value="masculino" /> Masculino
                            <input type="radio" name="genero" value="femenino" /> Femenino
                            <input type="radio" name="genero" value="otro" /> Prefiero no especificar
                        </td>
                    </tr>
                    <tr>
                        <td colspan="3">Estado civil:
                            <br/>
                            <select>
                            <option value="soltero">Soltero</option>
                            <option value="casado">Casado</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="3">Ocupación:
                            <br/>
                            <input type="radio" name="ocupacion" value="trabajo" /> Trabajo
                            <input type="radio" name="ocupacion" value="estudio" /> Estudio
                            <input type="radio" name="ocupacion" value="ambos" /> Ambos
                            <input type="radio" name="ocupacion" value="ninguno" /> Ninguno
                        </td>
                    </tr>
                    <tr>
                        <td colspan="3">
                        <h3>Lugar de residencia</h3>   
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <br/> Provincia:<br/>
                            <select onChange={this.obtener_canton} >
                            <option value="1">San Jose</option>
                            <option value="2">Cartago</option>
                            </select>
                        </td>
                        <td>
                            <br/> Canton:<br/>
                            <select>
                            <option value="cedula">Cedula</option>
                            <option value="pasaporte">Pasaporte</option>
                            </select>
                        </td>
                        <td>
                            <br/> Distrito:<br/>
                            <select>
                            <option value="cedula">Cedula</option>
                            <option value="pasaporte">Pasaporte</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="3">
                            <br/> Dirección exacta:
                            <input type="text" />
                        </td>

                    </tr>
                </table>
                <br/>
                <br/>
                
                </div>
                <br/>
                <br/>
                
                <div className="row">
                    <div className="col-1 offset-2">
                        <button className="bt" onClick={ this.props.anterior }>anterior</button> 
                    </div>
                    <div className="col-1 offset-6">
                        <button className="bt-lg" onClick={ this.props.siguiente }>continuar</button> 
                    </div>
                </div>
                <br/>
                <br/>
                
            </div>    
        );
    }
}