import React, { Component } from 'react';
import '../style/color.css';
import './formDocuments.css';
import {insertar_documento_storage_campana, leer_todos_tipos_documentos, eliminar_documento_campana,
    insertar_url_nombre_documento_campana, leer_url_documento_campana}
from "../DB/documentsAdmin";

export default class Kformdocuments extends Component {

    constructor(props) {
        super(props);
        this.state ={
            listaDocumentosEscogidos: [],
            listaDocumentosGrafica: [],
            downloadButtons: []
        };
        this.modificarListaDocumentosEscogitos = this.modificarListaDocumentosEscogitos.bind(this);
        this.mostrarDocumentos = this.mostrarDocumentos.bind(this);
        this.showDownloadButtons = this.showDownloadButtons.bind(this);
    }

    componentDidMount()
    {
        // TODO -> If 1 -> parte administrativa de subir archivos al crear una campana
       this.mostrarDocumentos();

       // TODO -> If 2 -> parte de carga de archivos de los voluntarios y descarga de archivos de la campana
        //this.showDownloadButtons();
    }

    mostrarDocumentos() {
        leer_todos_tipos_documentos().then(result => {
            const documentos = result;
            let documentosGraficos = [];
            let documentosLista = [];
            for(let k in documentos)
            {
                documentosGraficos.push(
                    <div className={"containerdoc"}>
                        <input className={"checkdoc"} type={"checkbox"} name={documentos[k]} id={k.toString()} onChange={Kformdocuments.onChangeCheckBox}/>
                        <label className={"lbldoc"}>&nbsp;&nbsp;{documentos[k]}
                            <input type="file" name={k} id={"file" + k.toString()} className="inputfile" accessKey={documentos[k]}
                                   disabled={true}
                                   onChange={this.onChangeFileButton}/>
                            <label htmlFor={"file" + k.toString()}>Adjuntar</label>
                        </label>
                        <label className={"docname"} id={"name" + k.toString()}>&nbsp;</label>
                        <br/>
                        <progress max={100} value={0} id={"bar" + k.toString()}>0%</progress>
                        <br/>
                    </div>
                );
                documentosLista.push(documentos[k]);
            }
            this.setState({
                listaDocumentosGrafica: documentosGraficos,
                listaDocumentosEscogidos: documentosLista
            });
        });
    }

    static onChangeCheckBox(e) {
        const button = document.getElementById("file" + e.target.id);
        button.disabled = !button.disabled;
    }

    modificarListaDocumentosEscogitos()
    {
        // TODO al finalizar, si el usuario subio un archivo pero luego se arrepintio y lo quito, hay que
        // TODO hacer un proceso que quite los que ya se subieron a partir de la lista listaDocumentosEscogidos
        // TODO (los que no esten en la lista y estan en la BD) -> se quitan
    }

    onChangeFileButton(e){
        try {
            const tipoDocumento = e.target.accessKey;
            const nombreArchivo = e.target.files[0].name;
            // TODO -> Primer parametro cambiar a this.props.campana.id
            const task = insertar_documento_storage_campana("7812303", tipoDocumento, e.target.files[0]);
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
                    insertar_url_nombre_documento_campana("7812303", tipoDocumento, nombreArchivo);
                }
            );
        } catch (err) {
            return;
        }
    };


    render(){
        return(
            <div className="container text-center">
                <div>
                    <br/>
                    {this.state.listaDocumentosGrafica}
                    <br/>
                </div>

            </div>
        );
    }
}