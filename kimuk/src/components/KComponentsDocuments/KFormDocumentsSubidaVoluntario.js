import "./formDocuments.css";
import React, {Component} from "react";
import * as databaseVoluntario from "../DB/documentsVolunteer";
import * as database from "../DB/documentsAdmin";
import "./formDocumentsSubida.css";
import {insertar_actualizar_beneficiaros, insertar_actualizar_contacto_emergencia_voluntario} from "../DB/volunteers";


let cedulaBen1 = "";
let nombreBen1 = "";
let parentescoBen1 = "";
let porcentajeBen1 = "";

let cedulaBen2 = "";
let nombreBen2 = "";
let parentescoBen2 = "";
let porcentajeBen2 = "";


let cedulaBen3 = "";
let nombreBen3 = "";
let parentescoBen3 = "";
let porcentajeBen3 = "";

let aviso = "";
let parentescoAviso = "";
let telefono = "";


export default class KFormDocumentsSubidaVoluntario extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            listaDocumentosCampana: [],
            codigo: false,
            poliza: false,
            emergencia: false
        };
        this.onChangeFileUploadButtonVoluntario = this.onChangeFileUploadButtonVoluntario.bind(this);
        this.beneficarioOnClick = this.beneficarioOnClick.bind(this);
        this.emergenciaOnClick = this.emergenciaOnClick.bind(this);
    }

    componentDidMount(){
        database.leer_documentos_campana(this.props.campana.id).then(result => {
            let documentos = result;
            let listaDocumentosCampana = [];
            let consecutivo = 0;
            let poliza = false;
            let codigo = false;
            for(let k in documentos) {
                if(documentos[k] !== "Foto") {
                    if(documentos[k] === "Aviso en caso de emergencia")
                    {
                        this.setState({
                            emergencia: true
                        })
                    } else
                    if(documentos[k] === "Póliza de seguro")
                    {
                        this.setState({
                            poliza: true
                        });
                        poliza = true;
                    } else {
                        if (documentos[k] === "Código de conducta") {
                            this.setState({
                               codigo: true
                            });
                            codigo = true;
                        } else {
                            listaDocumentosCampana.push(
                                <div className={"containerdoc"}>
                                    <input className={"checkdoc"} type={"checkbox"} name={documentos[k]}
                                           id={consecutivo}
                                           onChange={KFormDocumentsSubidaVoluntario.onchangeCheckBox}/>
                                    <label className={"lbldoc"}>&nbsp;&nbsp;{documentos[k]}
                                        <input type="file" name={k} id={"file" + consecutivo} className="uploadbutton"
                                               accessKey={documentos[k]}
                                               disabled={true}
                                               onChange={this.onChangeFileUploadButtonVoluntario}/>
                                        <label htmlFor={"file" + consecutivo}>Adjuntar</label>
                                    </label>
                                    <label className={"docname"} id={"name" + k.toString()}>&nbsp;</label>
                                    <br/>
                                    <progress max={100} value={0} id={"bar" + k.toString()}>0%</progress>
                                </div>
                            );
                        }
                    }
                    consecutivo += 1;
                }
            }
            if(poliza)
            {
                database.leer_url_documento_campana(this.props.campana.id, "Póliza de seguro").then(result => {
                    listaDocumentosCampana.push(
                    <div className={"containerdoc"}>
                        <input className={"checkdoc"} type={"checkbox"} name={"Póliza de seguro"} id={consecutivo}
                               onChange={KFormDocumentsSubidaVoluntario.onchangeCheckBox}/>
                        <label className={"lbldoc"}>&nbsp;&nbsp;Póliza de seguro
                            <a href={result} target="_blank">
                                <input type="button" name={"down"} id={"file" + consecutivo} className="uploadbutton"
                                       disabled={true}/>
                                <label htmlFor={"file" + consecutivo}>Descargar</label>
                            </a>
                        </label>
                        <br/>     <br/>
                    </div>
                    );
                    consecutivo += 1;
                    if(codigo)
                    {
                        database.leer_url_documento_campana(this.props.campana.id, "Código de conducta").then(result => {
                            listaDocumentosCampana.push(
                                <div className={"containerdoc"}>
                                    <input className={"checkdoc"} type={"checkbox"} name={"Código de conducta"}
                                           id={consecutivo}
                                           onChange={KFormDocumentsSubidaVoluntario.onchangeCheckBox}/>
                                    <label className={"lbldoc"}>&nbsp;&nbsp;Código de conducta
                                        <a href={result} target="_blank">
                                            <input type="button" name={"down"} id={"file" + consecutivo}
                                                   className="uploadbutton"
                                                   disabled={true}/>
                                            <label htmlFor={"file" + consecutivo}>Descargar</label>
                                        </a>
                                    </label>
                                    <br/>     <br/>
                                </div>
                            );
                            consecutivo += 1;
                            this.setState({
                                listaDocumentosCampana: listaDocumentosCampana,
                            })
                        });
                    } else {
                        this.setState({
                            listaDocumentosCampana: listaDocumentosCampana,
                        });
                    }
                });
            } else {
                if (codigo) {
                    database.leer_url_documento_campana(this.props.campana.id, "Código de conducta").then(result => {
                        listaDocumentosCampana.push(
                            <div className={"containerdoc"}>
                                <input className={"checkdoc"} type={"checkbox"} name={"Código de conducta"}
                                       id={consecutivo}
                                       onChange={KFormDocumentsSubidaVoluntario.onchangeCheckBox}/>
                                <label className={"lbldoc"}>&nbsp;&nbsp;Código de conducta
                                    <a href={result} target="_blank">
                                        <input type="button" name={"down"} id={"file" + consecutivo}
                                               className="uploadbutton"
                                               disabled={true}/>
                                        <label htmlFor={"file" + consecutivo}>Descargar</label>
                                    </a>
                                </label>
                                <br/>     <br/>
                            </div>
                        );
                        consecutivo += 1;
                        this.setState({
                            listaDocumentosCampana: listaDocumentosCampana,
                        })
                    });
                } else {
                    this.setState({
                        listaDocumentosCampana: listaDocumentosCampana,
                    })
                }
            }
        });
    }
    onChangeFileUploadButtonVoluntario(e) {
        try {
            const tipoDocumento = e.target.accessKey;
            const nombreArchivo = e.target.files[0].name;
            const idCampana = this.props.campana.id;
            const voluntarioCedula = this.props.voluntario.cedula;
            if(voluntarioCedula == null || voluntarioCedula === "")
            {
                alert("No se ha ingresado la cedula del voluntario\nNo se puede subir el documento");
                return;
            }
            const task =  databaseVoluntario.insertar_documento_storage_voluntario(idCampana, voluntarioCedula,
                tipoDocumento, e.target.files[0]);
            const progressBar = document.getElementById("bar" + e.target.name);
            document.getElementById("name" + e.target.name).innerHTML = e.target.files[0].name;  // File name label
            task.on('state_changed',

                function progress(snapshot) {  // Update progress bar
                    progressBar.value = 100 * (snapshot.bytesTransferred / snapshot.totalBytes);
                },

                function error(err) { // possible errors
                    alert("Error\n" + err.message + "\nPor favor suba el archivo nuevamente.");
                },

                function complete() { // Lets me know when the file has been uploaded
                    databaseVoluntario.insertar_url_nombre_documento_voluntario(idCampana, voluntarioCedula, tipoDocumento, nombreArchivo);
                }
            );
        } catch (err) {
            return;
        }
    }

    static onchangeCheckBox(e) {
        try {
            const button = document.getElementById("file" + e.target.id);
            button.disabled = !button.disabled;
        }catch (e) {

        }
    }
    static guardar_info_Ben1(e){
        switch(e.target.name)
        {
            case "Cedula":
                cedulaBen1 = e.target.value;
                break;
            case "Nombre":
                nombreBen1 = e.target.value;
                break;
            case "Parentesco" :
                parentescoBen1 = e.target.value;
                break;
            case "Porcentaje":
                porcentajeBen1 = e.target.value;
                break;
        }
    }
    static guardar_info_Ben2(e){
        switch(e.target.name)
        {
            case "Cedula":
                cedulaBen2 = e.target.value;
                break;
            case "Nombre":
                nombreBen2 = e.target.value;
                break;
            case "Parentesco" :
                parentescoBen2 = e.target.value;
                break;
            case "Porcentaje":
                porcentajeBen2 = e.target.value;
                break;
        }
    }
    static guardar_info_Ben3(e){
        switch(e.target.name)
        {
            case "Cedula":
                cedulaBen3 = e.target.value;
                break;
            case "Nombre":
                nombreBen3 = e.target.value;
                break;
            case "Parentesco" :
                parentescoBen3 = e.target.value;
                break;
            case "Porcentaje":
                porcentajeBen3 = e.target.value;
                break;
        }
    }
    static guardar_info_emergencia(e){
        switch (e.target.name) {
            case "Nombre":
                aviso = e.target.value;
                break;
            case "Parentesco":
                parentescoAviso = e.target.value;
                break;
            case "Telefono":
                telefono = e.target.value;
                break;
            default:
                break;
        }
    }


    // TODO -> Validaciones y CSS

    beneficarioOnClick(e)
    {
        // TODO -> Validaciones

        switch (e.target.name) {
            case "ben1":
                if(cedulaBen1)
                insertar_actualizar_beneficiaros(this.props.campana.id, this.props.voluntario.cedula,
                    cedulaBen1, nombreBen1, parentescoBen1, porcentajeBen1);
                else alert("Cedula en blanco");
                break;
            case "ben2":
                if(cedulaBen2)
                insertar_actualizar_beneficiaros(this.props.campana.id, this.props.voluntario.cedula,
                    cedulaBen2, nombreBen2, parentescoBen2, porcentajeBen2);
                else alert("Cedula en blanco");
                break;
            case "ben3":
                if(cedulaBen2)
                insertar_actualizar_beneficiaros(this.props.campana.id, this.props.voluntario.cedula,
                    cedulaBen3, nombreBen3, parentescoBen3, porcentajeBen3);
                else alert("Cedula en blanco");
                break;
            default:
                break;
        }
    }
    emergenciaOnClick(e)
    {
        insertar_actualizar_contacto_emergencia_voluntario(this.props.campana.id, this.props.voluntario.cedula,
            aviso, parentescoAviso, telefono
            );
    }

    mostrarBeneficiarios(){
        return (

            <div>
                <table className="title">
                    <tr>
                        <label>Beneficiario 1:</label>
                        <input type={"text"} placeholder={"Cedula"} name={"Cedula"} onChange={KFormDocumentsSubidaVoluntario.guardar_info_Ben1}/>
                        <input type={"text"} placeholder={"Nombre"} name={"Nombre"} onChange={KFormDocumentsSubidaVoluntario.guardar_info_Ben1}/>
                        <select name={"Parentesco"} onChange={KFormDocumentsSubidaVoluntario.guardar_info_Ben1}>
                            <option value="" selected disabled hidden>Parentesco</option>
                            <option value="Padre">Padre</option>
                            <option value="Madre">Madre</option>
                            <option value="Conyugue">Conyugue</option>
                            <option value="Otro">Otro</option>
                        </select>
                        <input type="number" name="Porcentaje" min="1" max="100" onChange={KFormDocumentsSubidaVoluntario.guardar_info_Ben1}/>
                        <button name={"ben1"} onClick={this.beneficarioOnClick}>Aceptar</button>
                    </tr>

                    <tr>
                        <label>Beneficiario 2:</label>
                        <input type={"text"} placeholder={"Cedula"} name={"Cedula"} onChange={KFormDocumentsSubidaVoluntario.guardar_info_Ben2}/>
                        <input type={"text"} placeholder={"Nombre"} name={"Nombre"} onChange={KFormDocumentsSubidaVoluntario.guardar_info_Ben2}/>
                        <select name={"Parentesco"} onChange={KFormDocumentsSubidaVoluntario.guardar_info_Ben1}>
                            <option value="" selected disabled hidden>Parentesco</option>
                            <option value="Padre">Padre</option>
                            <option value="Madre">Madre</option>
                            <option value="Conyugue">Conyugue</option>
                            <option value="Otro">Otro</option>
                        </select>
                        <input type="number" name="Porcentaje" min="1" max="100" onChange={KFormDocumentsSubidaVoluntario.guardar_info_Ben2}/>
                        <button name={"ben2"} onClick={this.beneficarioOnClick}>Aceptar</button>
                    </tr>

                    <tr>
                        <label>Beneficiario 3:</label>
                        <input type={"text"} placeholder={"Cedula"} name={"Cedula"} onChange={KFormDocumentsSubidaVoluntario.guardar_info_Ben3}/>
                        <input type={"text"} placeholder={"Nombre"} name={"Nombre"} onChange={KFormDocumentsSubidaVoluntario.guardar_info_Ben3}/>
                        <select name={"Parentesco"} onChange={KFormDocumentsSubidaVoluntario.guardar_info_Ben1}>
                            <option value="" selected disabled hidden>Parentesco</option>
                            <option value="Padre">Padre</option>
                            <option value="Madre">Madre</option>
                            <option value="Conyugue">Conyugue</option>
                            <option value="Otro">Otro</option>
                        </select>
                        <input type="number" name="Porcentaje" min="1" max="100" onChange={KFormDocumentsSubidaVoluntario.guardar_info_Ben3}/>
                        <button name={"ben3"} onClick={this.beneficarioOnClick}>Aceptar</button>
                    </tr>

                </table>
            </div>
        );
    }
    mostrarContactoEmergencia() {
        return(
          <div>
              <label>Contacto de emergencia:</label>
              <input type={"text"} placeholder={"Avisar a: nombre"} name={"Nombre"} onChange={KFormDocumentsSubidaVoluntario.guardar_info_emergencia} />
              <select name={"Parentesco"}  onChange={KFormDocumentsSubidaVoluntario.guardar_info_emergencia}>
                  <option value="" selected disabled hidden>Parentesco</option>
                  <option value="Padre">Padre</option>
                  <option value="Madre">Madre</option>
                  <option value="Conyugue">Conyugue</option>
                  <option value="Otro">Otro</option>
              </select>
              <input type={"text"} placeholder={"Telefono"} name={"Telefono"}  onChange={KFormDocumentsSubidaVoluntario.guardar_info_emergencia}/>
              <button onClick={this.emergenciaOnClick}>Aceptar</button>
          </div>
        );
    }

    render() {
        return (
            <div className="container text-center">
                <br/>
                <br/>
                <h1>Subir documentos</h1>
                <div>
                    <br/>
                    {this.state.listaDocumentosCampana}
                    <br/>
                    {(this.state.poliza) ? this.mostrarBeneficiarios(): void(0)}
                    <br/>
                    {(this.state.emergencia) ? this.mostrarContactoEmergencia(): void(0)}
                </div>
                <div className="row">
                    <div className="col-1 offset-2">
                        <button className="btn btn-info" onClick={ this.props.anterior }>anterior</button>
                    </div>
                    <div className="col-1 offset-6">
                        <button className="btn btn-primary" onClick={ this.props.siguiente }>continuar</button>
                    </div>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                </div>

            </div>
        );
    }

}