import "./formDocuments.css";
import React, {Component} from "react";
import * as databaseVoluntario from "../DB/documentsVolunteer";
import * as database from "../DB/documentsAdmin";
import "./formDocumentsSubida.css";
import {insertar_actualizar_beneficiaros, insertar_actualizar_contacto_emergencia_voluntario} from "../DB/volunteers";


/*
Estas variables contienen la informacion de los beneficiarios
 */
let cedulaBen1 = ""; // Cedula
let nombreBen1 = ""; // Nombre
let parentescoBen1 = ""; // Parentesco
let porcentajeBen1 = ""; // Porcentaje

let cedulaBen2 = "";
let nombreBen2 = "";
let parentescoBen2 = "";
let porcentajeBen2 = "";


let cedulaBen3 = "";
let nombreBen3 = "";
let parentescoBen3 = "";
let porcentajeBen3 = "";

/*
Estas variables contienen la informacion del contacto de emergencia
 */
let nombreContacto = ""; // Nombre
let parentescoContacto = ""; // Parentesco
let telefonoContacto = ""; // Telefono


export default class KFormDocumentsSubidaVoluntario extends Component {

    /*
    Informacion del state:
        - listaDocumentosCampana: contiene el jsx de cada documento
        - codigo, poliza, emergencia: son valores booleanos que pasan a ser true cuando se solicita
                                      el codigo de conducta, la poliza de seguro y el contacto de emergencia
     */
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

    /*
    Muestra los documentos de la campaña. Los consulta en la BD y crea el jsx de cada uno.
    Crea jsx especiales para el codigo de conducta y la poliza del seguro.
    Se puede visualizar codigo repetido al final, esto es porque se tuvo que hacer así debido a que
    javascript ejecuta codigo de manera asincrona y esa fue una solucion para lograr meter
    el jsx de los documenotos a la lista listaDocumentosCampana del state
     */
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
                    listaDocumentosCampana.push(this.jsxPoliza(consecutivo, result));
                    consecutivo += 2;
                    if(codigo)
                    {
                        database.leer_url_documento_campana(this.props.campana.id, "Código de conducta").then(result => {
                            listaDocumentosCampana.push(this.jsxCodigo(consecutivo, result));
                            consecutivo += 2;
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
                        listaDocumentosCampana.push(this.jsxCodigo(consecutivo, result));
                        consecutivo += 2;
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

    /*
     Devuelve el jsx del documento poliza de seguro
      */
    jsxPoliza(consecutivo, result) {
        return (
            <div className={"containerdoc"}>
                <input className={"checkdoc"} type={"checkbox"} name={"Póliza de seguro"} id={(consecutivo + 1)}
                       onChange={KFormDocumentsSubidaVoluntario.onchangeCheckBox}/>
                <label className={"lbldoc"}>&nbsp;&nbsp;Póliza de seguro
                    <a href={result} target="_blank">
                        <input type="button" name={"down"} id={"file" + consecutivo} className="uploadbutton"
                        />
                        <label htmlFor={"file" + consecutivo}>Descargar</label>
                    </a>
                    <input type="file" name={"Póliza de seguro"} id={"file" + (consecutivo + 1)} className="uploadbutton"
                           disabled={true}
                           onChange={this.onChangeFileUploadButtonVoluntario}/>
                    <label htmlFor={"file" + (consecutivo + 1)}>Adjuntar</label>
                </label>
                <label className={"docname"} id={"name" + "Póliza de seguro"}>&nbsp;</label>
                <br/>
                <progress max={100} className={"especial"} value={0} id={"bar" + "Póliza de seguro"}>0%</progress>
                <br/>
            </div>
        );
    }

    /*
     Devuelve el jsc del documento codigo de conducta
      */
    jsxCodigo(consecutivo, result) {
        return(
            <div className={"containerdoc"}>
                <input className={"checkdoc"} type={"checkbox"} name={"Código de conducta"} id={(consecutivo + 1)}
                       onChange={KFormDocumentsSubidaVoluntario.onchangeCheckBox}/>
                <label className={"lbldoc"}>&nbsp;&nbsp;Código de conducta
                    <a href={result} target="_blank">
                        <input type="button" name={"down"} id={"file" + consecutivo} className="uploadbutton"
                        />
                        <label htmlFor={"file" + consecutivo}>Descargar</label>
                    </a>
                    <input type="file" name={"Código de conducta"} id={"file" + (consecutivo + 1)} className="uploadbutton"
                           disabled={true}
                           onChange={this.onChangeFileUploadButtonVoluntario}/>
                    <label htmlFor={"file" + (consecutivo + 1)}>Adjuntar</label>
                </label>
                <label className={"docname"} id={"name" + "Código de conducta"}>&nbsp;</label>
                <br/>
                <progress max={100} className={"especial"} value={0} id={"bar" + "Código de conducta"}>0%</progress>
                <br/>
            </div>
        )
    }

    /*
    Este metodo es accionado por el boton de adjuntar.
    Lo que hace es subir a la base de datos el documento seleccionado.
    El documento tiene un limitante de 50MB
     */
    onChangeFileUploadButtonVoluntario(e) {
        try {
            if (e.target.files[0].size > 500000){
                alert("Error\nEl archivo supera los 50MB, por favor suba un archivo por debajo de 50MB");
                return;
            }
            const tipoDocumento = e.target.name;
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
            document.getElementById("name" + e.target.name).innerHTML = e.target.files[0].name;  // Se coloca en el label adjunto el nombre del archivo
            task.on('state_changed',

                function progress(snapshot) {  // Este metodo actualiza la barra de progreso
                    progressBar.value = 100 * (snapshot.bytesTransferred / snapshot.totalBytes);
                },

                function error(err) { // En caso de algun error se va a alertar
                    alert("Error\n" + err.message + "\nPor favor suba el archivo nuevamente.");
                },

                function complete() { // Avisa cuando el documento se subio y crea el URL de descarga para el.
                    databaseVoluntario.insertar_url_nombre_documento_voluntario(idCampana, voluntarioCedula, tipoDocumento, nombreArchivo);
                }
            );
        } catch (err) {
            return;
        }
    }

    /*
    Al darle click al checkbox se ejecuta este metodo.
    Lo que hace es habilitar el boton de adjuntar respectivo.
     */
    static onchangeCheckBox(e) {
        try {
            const button = document.getElementById("file" + e.target.id);
            button.disabled = !button.disabled;
        }catch (e) {

        }
    }

    /*
    Este metodo guarda en las variables de arriba la informacion ingresada del beneficiario 1
     */
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

    /*
    Este metodo guarda en las variables de arriba la informacion ingresada del beneficiario 2
     */
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

    /*
    Este metodo guarda en las variables de arriba la informacion ingresada del beneficiario 3
     */
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

    /*
    Este metodo guarda en las variables de arriba la informacion ingresada del contacto de emergencia
     */
    static guardar_info_emergencia(e){
        switch (e.target.name) {
            case "Nombre":
                nombreContacto = e.target.value;
                break;
            case "Parentesco":
                parentescoContacto = e.target.value;
                break;
            case "Telefono":
                telefonoContacto = e.target.value;
                break;
            default:
                break;
        }
    }


    // TODO -> Validaciones y CSS de beneficiarios
    /*
    Este metodo se ejecuta al oprimir el boton de aceptar al lado de la informacion de un beneficiaro.
    Manda a guardar la informacion de los beneficiarios que se encuentra en las variables al inicio.
     */
    beneficarioOnClick(e) {
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
            nombreContacto, parentescoContacto, telefonoContacto
            );
    }

    /*
    Devuelve el jsx de los beneficiarios
     */
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

    /*
    Devuelve el jsx del contacto de emergencia
     */
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
        // 472 -> si hay poliza entonces muestre los beneficiarios
        // 474 -> si hay contacto de emergencia entonces muestre el contacto de emergencia
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
                        <button className="btn btn-default" onClick={ this.props.anterior }>Anterior</button>
                    </div>
                    <div className="col-1 offset-6">
                        <button className="btn btn-primary" onClick={ this.props.siguiente }>Siguiente</button>
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
