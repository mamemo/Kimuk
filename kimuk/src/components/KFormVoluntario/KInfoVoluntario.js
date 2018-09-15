import React, { Component } from 'react';
import './KFormVoluntario.css';
import '../style/color.css';

export default class KInfoVoluntario extends Component {
    constructor(){
        super();
        this.guardar_info=this.guardar_info.bind(this);
    }
    obtener_canton(){
        console.log("Hola mundo");
    }
    guardar_info(e){
        console.log(e.target.name,e.target.value);
        this.props.voluntario[e.target.name]=e.target.value;
    }
    render(){
        return(
            <div className="container text-left">
                <div className="row"> 
                <div className="col-6 offset-3">
                        <table>
                        <tr>
                            <td colspan="3">
                            <br/>Tipo de indentificación<br/>
                                <select name="tipo_id" defaultValue={this.props.voluntario.tipo_id} onChange={this.guardar_info}>
                                <option value="" selected disabled>Tipo indentificación</option>
                                <option value="cedula_identidad">Cedula identidad</option>
                                <option value="cedula_residencia">Cedula residencia</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3">
                            <br/>Indentificación | Número de residencia:<br/>
                                <input type="text" name="id" placeholder="1-1111-1111" defaultValue={this.props.voluntario.id} onChange={this.guardar_info} />
                            </td>
                        </tr>
                        <tr>
                            <td><br/>Nombre:
                                <br/>
                                <input type="text" name="nombre" placeholder="Nombre" defaultValue={this.props.voluntario.nombre} onChange={this.guardar_info}/>
                            </td>
                            <td><br/>Primer apellido:
                                <br/>
                                <input type="text" name="apellido_1" placeholder="Primer apellido" defaultValue={this.props.voluntario.apellido_1} onChange={this.guardar_info} />
                            </td> 
                        <td><br/>Segundo apellido:
                                <br/>
                                <input type="text" name="apellido_2" placeholder="Segundo apellido" defaultValue={this.props.voluntario.apellido_2} onChange={this.guardar_info}/>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3"><br/>Fecha de nacimiento:
                                <br/>
                                <input type="date" name="f_nacimiento"  defaultValue={this.props.voluntario.f_nacimiento} onChange={this.guardar_info}/>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3">
                                <br/>
                                Género:
                                <br/>
                                <input type="radio" name="genero" value="masculino" defaultChecked={this.props.voluntario.genero==="masculino"} onChange={this.guardar_info}/> Masculino
                                <input type="radio" name="genero" value="femenino" defaultChecked={this.props.voluntario.genero==="femenino"} onChange={this.guardar_info}/> Femenino
                                <input type="radio" name="genero" value="otro" defaultChecked={this.props.voluntario.genero==="otro"} onChange={this.guardar_info}/> Prefiero no especificar
                                
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3">
                                <br/>
                                Estado civil:
                                <br/>
                                <select name="estado_civil" defaultValue={this.props.voluntario.estado_civil} onChange={this.guardar_info}>
                                <option value="" selected disabled >Estado civil</option>
                                <option value="soltero">Soltero</option>
                                <option value="casado">Casado</option>
                                <option value="viudo">Viudo</option>
                                <option value="divorciado">Divorciado</option>
                                <option value="union_libre">Unión libre</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3"><br/>Ocupación:
                                <br/>
                                <input type="radio" name="ocupacion" value="trabajo" defaultChecked={this.props.voluntario.ocupacion==="trabajo"}  onChange={this.guardar_info} /> Trabajo
                                <input type="radio" name="ocupacion" value="estudio" defaultChecked={this.props.voluntario.ocupacion==="estudio"} onChange={this.guardar_info}/> Estudio
                                <input type="radio" name="ocupacion" value="ambos" defaultChecked={this.props.voluntario.ocupacion==="ambos"} onChange={this.guardar_info}/> Ambos
                                <input type="radio" name="ocupacion" value="ninguno" defaultChecked={this.props.voluntario.ocupacion==="ninguno"} onChange={this.guardar_info}/> Ninguno
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3">
                            <br/>
                            <h3>Lugar de residencia</h3>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <br/> <br/>Provincia:<br/>
                                <select name="provincia" defaultValue={this.props.voluntario.provincia} onChange={this.guardar_info} >
                                <option value="" selected disabled>Provincia</option>                                
                                </select>
                            </td>
                            <td>
                                <br/> <br/>Canton:<br/>
                                <select>
                                <option value="" selected disabled>Canton</option>
                                </select>
                            </td>
                            <td>
                                <br/> <br/>Distrito:<br/>
                                <select>
                                <option value="" selected disabled>Distrito</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3">
                                <br/> Dirección exacta:<br/>
                                <input type="text" placeholder="Dirección exacta de la casa de habitación" name="direccion_exacta" defaultValue={this.props.voluntario.direccion_exacta} onChange={this.guardar_info} /> 
                            </td>
                        </tr>
                        <tr>
                        <td colspan="3">
                                <br/> <h3>Contacto</h3>
                            </td>
                        </tr>
                        <tr>
                        <td colspan="3">
                                <br/> Correo electrónico:<br/>
                                <input type="text" placeholder="Correo" name="correo" defaultValue={this.props.voluntario.correo} onChange={this.guardar_info}/>     
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <br/> Teléfono 1:<br/>
                                <input type="text" placeholder="88-88-88-88" name="telefono_1" defaultValue={this.props.voluntario.telefono_1} onChange={this.guardar_info}/>     
                            </td>
                            <td>
                                <br/> Teléfono 2:<br/>
                                <input type="text" placeholder="88-88-88-88" name="telefono_2" defaultValue={this.props.voluntario.telefono_2} onChange={this.guardar_info}/>     
                            </td>
                        </tr>

                    </table>
                    
                    
                </div>
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