/**
 * Archivo que contiene las funciones para manejar los 
 * archivos de cada voluntario en el modo Administrador 
 * de un Voluntariado.
 */


import React, {Component} from "react";
import * as database from "../DB/documentsAdmin";
import "./formDocuments.css";

export default class KFormDocumentsAdmin extends Component {

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
        this.onClickDownloadButton = this.onClickDownloadButton.bind(this);
        this.onChangeCheckBoxDocumentosCampana = this.onChangeCheckBoxDocumentosCampana.bind(this);
        this.onChangeCheckBoxDocumentosRestantes = this.onChangeCheckBoxDocumentosRestantes.bind(this);
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
        let poliza = false;
        database.leer_documentos_campana(this.props.campana.id).then(result => {
            let documentos = result;
            let listaDocumentosCampana = [];
            let nombresDocumentos = [];
            for(let k in documentos) {
                nombresDocumentos.push(documentos[k]);


                if(documentos[k] === "Póliza de seguro"){
                        poliza = true;
                        listaDocumentosCampana.push(
                            <div className={"containerdoc"}>
                                <input className={"checkdoc"} type={"checkbox"} name={documentos[k]} id={"checkCamp" + k.toString()}
                                       onChange={this.onChangeCheckBoxDocumentosCampana} checked={true}/>
                                <label className={"lbldoc"}>&nbsp;&nbsp;{documentos[k]}

                                    <a id={"ref"} target="_blank">
                                        <input type="button" name={k} id={"filed" + k.toString()} className="uploadbutton"
                                               accessKey={documentos[k]} />
                                        <label htmlFor={"filed" + k.toString()}>Descargar</label>
                                    </a>

                                    <input type="file" name={k} id={"file" + k.toString()} className="uploadbutton"
                                           accessKey={documentos[k]}
                                           onChange={this.onChangeFileUploadButton}/>
                                    <label htmlFor={"file" + k.toString()}>Adjuntar</label>

                                </label>
                                <label className={"docname"} id={"name" + k.toString()}>&nbsp;</label>
                                <br/>
                                <progress className={"dos"} max={100} value={0} id={"bar" + k.toString()}>0%</progress>
                            </div>
                        );


                } else {
                    listaDocumentosCampana.push(
                        <div className={"containerdoc"}>
                            <input className={"checkdoc"} type={"checkbox"} name={documentos[k]} id={"checkCamp" + k.toString()}
                                   onChange={this.onChangeCheckBoxDocumentosCampana} checked={true}/>
                            <label className={"lbldoc"}>&nbsp;&nbsp;{documentos[k]}</label>
                            <br/>
                        </div>
                    );
                }
            }
            if(poliza) {
                database.leer_url_documento_campana(this.props.campana.id, "Póliza de seguro").then(result => {
                    document.getElementById("ref").href = result;
                });
            }
            this.setState({
                listaDocumentosCampana: listaDocumentosCampana,
                nombresDocumentos: nombresDocumentos
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
                                <input className={"checkdoc"} type={"checkbox"} name={documentos[k]}
                                       id={"checkDoc" + k.toString()}
                                       onChange={this.onChangeCheckBoxDocumentosRestantes} checked={false}/>
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
	 * Controla la acción del usuario en la interfaz 
     * con el objeto CheckBox de Documentos Campaña.
	 */
    onChangeCheckBoxDocumentosCampana(e){
        database.eliminar_nombre_documento_campana(this.props.campana.id, e.target.name).then(
            result => {
                this.componentDidMount();
            }
        );
    }

    /**
	 * Controla la acción del usuario en la interfaz 
     * con el objeto CheckBox de Documentos Restantes.
	 */
    onChangeCheckBoxDocumentosRestantes(e){
        database.insertar_nombre_documento_campana(this.props.campana.id, e.target.name, e.target.name).then(
            result => {
                this.componentDidMount();
            }
        )
    }

    /**
	 * Controla la acción del usuario en la interfaz 
     * con el objeto de Subir Archivo.
	 */
    onChangeFileUploadButton(e){
        try {
            const tipoDocumento = e.target.accessKey;
            const nombreArchivo = e.target.files[0].name;
            const idCampana = this.props.campana.id;
            // TODO -> Primer parametro cambiar a this.props.campana.id
            const task = database.insertar_documento_storage_campana(this.props.campana.id, tipoDocumento, e.target.files[0]);
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
                    database.insertar_url_nombre_documento_campana(idCampana, tipoDocumento, nombreArchivo);
                }
            );
        } catch (err) {
            alert(err);
            return;
        }
    }

    /**
	 * Controla la acción del usuario en la interfaz 
     * con el objeto de Descargar.
	 */
    onClickDownloadButton() {
        database.leer_url_documento_campana(this.props.campana.id, "Póliza de seguro").then(result => {
            let a = document.createElement('a');
            a.href = result;
            a.click()
        });
    }

    /**
	 * Muestra los componentes deseados. 
	 * Actualiza la interfaz dependiendo de lo que pase en la aplicación.
	 */
    render(){
        return(
            <div className="container text-center">
                <div>
                    {this.state.listaDocumentosCampana}
                    <br/>
                    {this.state.listaDocumentosRestantes}
                </div>
            </div>
        );
    }
}