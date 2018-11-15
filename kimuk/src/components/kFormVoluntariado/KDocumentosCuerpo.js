/**
 * Archivo que actualiza la base de datos con los 
 * archivos que se escogen a la hora de crear una campaña.
 */


import React, {Component} from "react";
import './KFormVoluntariado.css';
import * as database from "../DB/documentsAdmin";
import "./formDocuments.css";
import ReactTooltip from 'react-tooltip';
import { FaUpload } from 'react-icons/fa';


export default class KDocumentosCuerpo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listaDocumentosCampana: [],
            listaDocumentosRestantes: [],
            nombresDocumentos: [],
        };


        this.cargarDocumentosCampana = this.cargarDocumentosCampana.bind(this);
        this.cargarDocumentosRestantes = this.cargarDocumentosRestantes.bind(this);
        this.onChangeFileUploadButton = this.onChangeFileUploadButton.bind(this);
        this.onChangeCheckBoxDocumentosCampana = this.onChangeCheckBoxDocumentosCampana.bind(this);
        this.onChangeCheckBoxDocumentosRestantes = this.onChangeCheckBoxDocumentosRestantes.bind(this);

        this.onChangeSeleccionarTodos = this.onChangeSeleccionarTodos.bind(this);
        this.onClickSeleccionarTodos = this.onClickSeleccionarTodos.bind(this);
    }

    /**
	 * Obtiene los documentos de la base de datos y 
	 * llena las variables con la información obtenida.
	 */
    componentDidMount() {
        this.cargarDocumentosCampana();
        this.cargarDocumentosRestantes();
    }

    /**
	 * Obtiene los documentos de la campaña.
	 */
    cargarDocumentosCampana(){

        database.leer_documentos_campana(this.props.campana.id).then(result => {
            let documentos = result;
            let listaDocumentosCampana = [];
            let nombresDocumentos = [];
            for(let k in documentos) {
                nombresDocumentos.push(documentos[k]);
                if(documentos[k] === "Póliza de seguro"){

                    let nombreDoc = "";
                    let progress = 0;
                    if(this.props.campana.subio)
                    {
                        nombreDoc = this.props.campana.document;
                        progress = 100;
                    }

                        listaDocumentosCampana.push(
                            <div className={"containerdoc"}>

                                <label className="container_checkbox">

                                    <input type="checkbox"
                                        className="checkdoc"
                                        name={documentos[k]}
                                        id={"checkCamp" + k.toString()}
                                        onChange={this.onChangeCheckBoxDocumentosCampana}
                                        checked={true}
                                    />
                                    <span class="checkmark"></span>
                                </label>


                                <label className={"lbldoc"}>&nbsp;&nbsp;{documentos[k]}

                                    <input type="file" name={k} id={"file" + k.toString()} className="uploadbutton"
                                           accessKey={documentos[k]}
                                           onChange={this.onChangeFileUploadButton}/>
                                    <label data-tip data-for='upload-tooltip' htmlFor={"file" + k.toString()}>Adjuntar <FaUpload/> </label>

                                </label>
                                <label className={"docname"} id={"name" + k.toString()}>&nbsp;{nombreDoc}</label>
                                <br/>
                                <progress className={"documentosbar"} max={100} value={progress} id={"bar" + k.toString()}>0%</progress>
                                <ReactTooltip id='upload-tooltip' type='info' effect='solid' place="top">
                                  <span>
                                    Adjuntá el documento deseado
                                  </span>
                                </ReactTooltip>
                            </div>
                        );


                } else {
                    if (documentos[k] === "Código de conducta") {

                        let nombreDoc = "";
                        let progress = 0;
                        if(this.props.campana.subioCod)
                        {
                            nombreDoc = this.props.campana.documentCod;
                            progress = 100;
                        }

                        listaDocumentosCampana.push(
                            <div className={"containerdoc"}>
                                <label className="container_checkbox">

                                    <input className={"checkdoc"}
                                        type={"checkbox"}
                                        name={documentos[k]}
                                        id={"checkCamp" + k.toString()}
                                        onChange={this.onChangeCheckBoxDocumentosCampana}
                                        checked={true}/>

                                    <span class="checkmark"></span>
                                </label>

                                <label className={"lbldoc"}>&nbsp;&nbsp;{documentos[k]}

                                    <input type="file" name={k} id={"file" + k.toString()} className="uploadbutton"
                                           accessKey={documentos[k]}
                                           data-tip data-for='upload-tooltip'
                                           onChange={this.onChangeFileUploadButton}/>
                                    <label data-tip data-for='upload-tooltip' htmlFor={"file" + k.toString()}>Adjuntar <FaUpload/> </label>

                                </label>
                                <label className={"docname"} id={"name" + k.toString()}>&nbsp;{nombreDoc}</label>
                                <br/>
                                <progress className={"documentosbar"} max={100} value={progress} id={"bar" + k.toString()}>0%</progress>
                                <ReactTooltip id='upload-tooltip' type='info' effect='solid' place="top">
                                  <span>
                                    Adjuntá el documento deseado
                                  </span>
                                </ReactTooltip>
                            </div>
                        );


                    }
                    else {
                        if (documentos[k] !== "Foto") {
                            listaDocumentosCampana.push(
                                <div className={"containerdoc"}>

                                    <label className="container_checkbox">

                                        <input className={"checkdoc"}
                                            type={"checkbox"}
                                            name={documentos[k]}
                                            id={"checkCamp" + k.toString()}
                                            onChange={this.onChangeCheckBoxDocumentosCampana}
                                            checked={true}/>

                                        <span class="checkmark"></span>
                                    </label>

                                    <label className={"lbldoc"}>&nbsp;&nbsp;{documentos[k]}</label>
                                    <br/>
                                </div>
                            );
                        }
                    }
                }
            }

            this.setState({
                listaDocumentosCampana: listaDocumentosCampana.reverse(),
                nombresDocumentos: nombresDocumentos.reverse()
            });
        });
    }

    /**
	 * Obtiene los tipos de documentos que no fueron usados en la campaña.
	 */
    cargarDocumentosRestantes(){
        database.leer_todos_tipos_documentos().then(result => {
            let documentos = result;
            let restoDocumentos = [];
            for (let k in documentos) {
                if(!this.state.nombresDocumentos.includes(documentos[k])) {
                        restoDocumentos.push(
                            <div className={"containerdoc"}>
                                <label className="container_checkbox">

                                    <input className={"checkdoc"}
                                        type={"checkbox"}
                                        name={documentos[k]}
                                        id={"checkDoc" + k.toString()}
                                        onChange={this.onChangeCheckBoxDocumentosRestantes}
                                        checked={false}/>

                                    <span class="checkmark"></span>
                                </label>


                                <label className={"lbldoc"}>&nbsp;&nbsp;{documentos[k]}</label>
                                <br/>
                            </div>
                        );
                }
            }

            this.setState({
                listaDocumentosRestantes: restoDocumentos
            });
        });
    }

    /**
	 * Controla la acción de cuando se selecciona el 
     * CheckBox de Marcar todos los docuemntos.
	 */
    onClickSeleccionarTodos(){
        for(let i in this.state.listaDocumentosRestantes){
        database.insertar_nombre_documento_campana(this.props.campana.id,
                                                    this.state.listaDocumentosRestantes[i].props.children[1].props.children[1],
                                                    this.state.listaDocumentosRestantes[i].props.children[1].props.children[1]).then(
          result => {
            this.componentDidMount();
          }
        )
      }
    }

    /**
	 * Controla la acción de cuando se cambia la selección del 
     * CheckBox de Marcar todos los docuemntos.
	 */
    onChangeSeleccionarTodos(e){
        if(e.target.checked == true){
          for(let i in this.state.listaDocumentosRestantes){
            database.insertar_nombre_documento_campana(this.props.campana.id,
                                                      this.state.listaDocumentosRestantes[i].props.children[1].props.children[1],
                                                      this.state.listaDocumentosRestantes[i].props.children[1].props.children[1]).then(
              result => {
                this.componentDidMount();
              }
            )

          }
        }
        else{
          for(let i in this.state.listaDocumentosCampana){
            database.eliminar_nombre_documento_campana(this.props.campana.id,
                                                      this.state.listaDocumentosCampana[i].props.children[1].props.children[1]).then(
              result => {
                this.componentDidMount();
              }
            )
          }
        }
    }

    /**
	 * Controla la acción de cuando se cambia la selección del 
     * CheckBox de un Documento que ya está en la campaña.
	 */
    onChangeCheckBoxDocumentosCampana(e){
        database.eliminar_nombre_documento_campana(this.props.campana.id, e.target.name).then(
            result => {
                this.componentDidMount();
            }
        );
    }

    /**
	 * Controla la acción de cuando se cambia la selección del 
     * CheckBox de un Documento.
	 */
    onChangeCheckBoxDocumentosRestantes(e){
        database.insertar_nombre_documento_campana(this.props.campana.id, e.target.name, e.target.name).then(
            result => {
                this.componentDidMount();
            }
        )
    }

    /**
	 * Controla la acción de cuando se le da click al
     * botón de Subir Archivo.
	 */
    onChangeFileUploadButton(e){
        try {
            const tipoDocumento = e.target.accessKey;
            this.props.handler(e.target.files[0].name, tipoDocumento);
            const nombreArchivo = e.target.files[0].name;
            const idCampana = this.props.campana.id;

            const task = database.insertar_documento_storage_campana(this.props.campana.id, tipoDocumento, e.target.files[0]);
            const progressBar = document.getElementById("bar" + e.target.name);
            progressBar.style.display = "block";
            document.getElementById("name" + e.target.name).innerHTML = e.target.files[0].name;  // File name label
            task.on('state_changed',

                function progress(snapshot) {  // Update progress bar
                    progressBar.value = 100 * (snapshot.bytesTransferred / snapshot.totalBytes);
                },

                function error(err) { // possible errors
                    alert("Error\n" + err.message + "\nPor favor suba el archivo nuevamente.");
                },

                function complete() { // Lets me know when the file has been uploaded
                    database.insertar_url_nombre_documento_campana(idCampana, tipoDocumento, nombreArchivo);
            }

            )
        } catch (err) {
            alert("ERROR " + err);
            return;
        }
    }

    /**
	 * Muestra los componentes deseados. 
	 * Actualiza la interfaz dependiendo de lo que pase en la aplicación.
	 */
    render(){


        return(

            <div className="container text-center">
                <div className="SeleccionDocumentos">

                    <label className="container_checkbox">
                        &nbsp;&nbsp;{"Seleccionar documentos requeridos"}
                        <input type="checkbox"
                            name="todosDocumentos"
                            className="checkbox"
                            onChange={this.onChangeSeleccionarTodos}
                        />
                        <span class="checkmark"></span>
                    </label>

                </div>
                <div>
                    <input class="marcarbuttom"
                           onClick={this.onClickSeleccionarTodos}
                           type="button"
                           value="Marcar todo"/>
                </div>

                <div className="tablasDocumentos">
                    {this.state.listaDocumentosCampana}
                    {this.state.listaDocumentosRestantes}
                </div>

                <div className="offset-6">
                </div>

            </div>
        );
    }
}
