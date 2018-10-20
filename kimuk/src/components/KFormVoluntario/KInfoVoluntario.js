import React, { Component } from 'react';
import './KFormVoluntario.css';
import '../style/color.css';
import DatePicker from 'react-datepicker';
import ReactTooltip from 'react-tooltip';

export default class KInfoVoluntario extends Component {
    constructor(){
        super();
        this.state={
            provincias:"",
            cantones:"",
            distritos:""
        }
        this.guardar_info=this.guardar_info.bind(this);
        this.cargar_provincias=this.cargar_provincias.bind(this);
    }
    guardar_info(e){
        if(e.target.name==="provincia"){
            
            fetch("https://ubicaciones.paginasweb.cr/provincia/"+e.target.value+"/cantones.json")
            .then((resp) => resp.json())
            .then((data) => this.setState({ cantones: data }))
            this.props.voluntario.canton="";
            this.props.voluntario.distrito="";
            this.render();
        }
        if(e.target.name==="canton"){
            fetch("https://ubicaciones.paginasweb.cr/provincia/"+this.props.voluntario.provincia+"/canton/"+e.target.value+"/distritos.json")
            .then((resp) => resp.json())
            .then((data) => this.setState({ distritos: data }))
            this.render();
        }
        this.props.voluntario[e.target.name]=e.target.value;
    }
    cargar_provincias(){
        fetch("https://ubicaciones.paginasweb.cr/provincias.json")
        .then((resp) => resp.json())
        .then((data) => this.setState({ provincias: data }))
    }
    render(){
        this.cargar_provincias();
        const p= [];
        const c= [];
        const d= [];
        for(var k in this.state.provincias){
            p.push( <option value={k} >{this.state.provincias[k]}</option>);
        }
        for(var k in this.state.cantones){
            c.push( <option value={k} >{this.state.cantones[k]}</option>);
        }
        for(var k in this.state.distritos){
            d.push( <option value={k} >{this.state.distritos[k]}</option>);
        }
        return(
            <div className="container text-left">
                <div className="row"> 
                <div className="col-6 offset-3">
                        <table>
                        <tr>
                            <td >
                            <br/>Tipo de indentificación<br/>
                                <select name="tipo_id" defaultValue={this.props.voluntario.tipo_id} onChange={this.guardar_info}>
                                <option value="" selected disabled>Tipo indentificación</option>
                                <option value="cedula_identidad">Cedula identidad</option>
                                <option value="cedula_residencia">Cedula residencia</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td >
                            <br/>Indentificación | Número de residencia:<br/>
                                <input type="text" name="id" placeholder="1-1111-1111" defaultValue={this.props.voluntario.id} onChange={this.guardar_info} />
                            </td>
                        </tr>
                        <tr>
                            <td><br/>Nombre:
                                <br/>
                                <input type="text" name="nombre" placeholder="Nombre" defaultValue={this.props.voluntario.nombre} onChange={this.guardar_info}/>
                            <br/>Primer apellido:
                                <br/>
                                <input type="text" name="apellido_1" placeholder="Primer apellido" defaultValue={this.props.voluntario.apellido_1} onChange={this.guardar_info} />
                            <br/>Segundo apellido:
                                <br/>
                                <input type="text" name="apellido_2" placeholder="Segundo apellido" defaultValue={this.props.voluntario.apellido_2} onChange={this.guardar_info}/>
                            </td>
                        </tr>
                        <tr>
                            <td ><br/>Fecha de nacimiento:
                                <br/>
                                <DatePicker
                                    name="f_nacimiento"
                                    selected={this.props.voluntario.f_nacimiento}
                                    onChange={this.guardar_info}
                                    className="form-control mb-2 mr-sm-2 mb-sm-0"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td >
                                <br/>
                                Género:
                                <br/>
                                <input type="radio" name="genero" value="masculino" defaultChecked={this.props.voluntario.genero==="masculino"} onChange={this.guardar_info}/> Masculino
                                <input type="radio" name="genero" value="femenino" defaultChecked={this.props.voluntario.genero==="femenino"} onChange={this.guardar_info}/> Femenino
                                <input type="radio" name="genero" value="otro" defaultChecked={this.props.voluntario.genero==="otro"} onChange={this.guardar_info}/> Prefiero no especificar
                                
                            </td>
                        </tr>
                        <tr>
                            <td >
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
                            <td ><br/>Ocupación:
                                <br/>
                                <input type="radio" name="ocupacion" value="trabajo" defaultChecked={this.props.voluntario.ocupacion==="trabajo"}  onChange={this.guardar_info} /> Trabajo
                                <input type="radio" name="ocupacion" value="estudio" defaultChecked={this.props.voluntario.ocupacion==="estudio"} onChange={this.guardar_info}/> Estudio
                                <input type="radio" name="ocupacion" value="ambos" defaultChecked={this.props.voluntario.ocupacion==="ambos"} onChange={this.guardar_info}/> Ambos
                                <input type="radio" name="ocupacion" value="ninguno" defaultChecked={this.props.voluntario.ocupacion==="ninguno"} onChange={this.guardar_info}/> Ninguno
                            </td>
                        </tr>
                        <tr>
                            <td >
                            <br/>
                            <h3>Lugar de residencia</h3>
                            <hr/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                 Provincia:<br/>
                                <select name="provincia" defaultValue={this.props.voluntario.provincia} onChange={this.guardar_info} >
                                <option value="" selected disabled>Provincia</option>                                
                                {p}
                                </select>
                                <br/>Canton:<br/>
                                <select name="canton" defaultValue={this.props.voluntario.canton} onChange={this.guardar_info}>
                                <option value="" selected disabled>Canton</option>
                                {c}
                                </select>
                                <br/>Distrito:<br/>
                                <select name="distrito" defaultValue={this.props.voluntario.distrito} onChange={this.guardar_info}>
                                <option value="" selected disabled>Distrito</option>
                                {d}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td >
                            <br/>Dirección exacta:<br/>
                                <input type="text" placeholder="Dirección exacta de la casa de habitación" name="direccion_exacta" defaultValue={this.props.voluntario.direccion_exacta} onChange={this.guardar_info} /> 
                            </td>
                        </tr>
                        <tr>
                        <td >
                                <br/> <h3>Contacto</h3>
                                <hr/>
                            </td>
                        </tr>
                        <tr>
                        <td >
                                 Correo electrónico:<br/>
                                <input type="text" placeholder="Correo" name="correo" data-tip data-for='email-tooltip' defaultValue={this.props.voluntario.correo} onChange={this.guardar_info}/>     
                                <ReactTooltip id='email-tooltip' type='info' effect='solid'>
                                    <span>ejemplo@kimuk.com</span>
                                </ReactTooltip>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <br/> Teléfono 1:<br/>
                                <input type="text" placeholder="8888-8888" name="telefono_1" defaultValue={this.props.voluntario.telefono_1} onChange={this.guardar_info}/>     
                            <br/> Teléfono 2:<br/>
                                <input type="text" placeholder="8888-8888" name="telefono_2" defaultValue={this.props.voluntario.telefono_2} onChange={this.guardar_info}/>     
                            </td>
                        </tr>

                    </table>
                    
                    
                </div>
                </div>
                <br/>
                <br/>
                
                <div className="row">
                    
                    <div className="col-1 offset-8">
                        <button className="btn btn-primary" data-tip data-for='btn-tooltip' onClick={ this.props.siguiente }>Siguiente</button> 
                    </div>
                    <ReactTooltip id='btn-tooltip' type='warning' effect='solid'>
                        <span>Para poder continuar debe de asegurarse de haber completado correctamente todos los campos de información solicitados.</span>
                    </ReactTooltip>
                </div>
                <br/>
                <br/>
                
            </div>    
        );
    }
}