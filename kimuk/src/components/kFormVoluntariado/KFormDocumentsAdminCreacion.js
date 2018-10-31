import React, {Component} from "react";
import * as database from "../DB/documentsAdmin";
import "./formDocuments.css";
import ReactTooltip from 'react-tooltip';


const question = {
    title: '¿A cuáles documentos hace referencia?',
    question: '¿Deseas seleccionar documentos requeridos?',
    description: 'Adjunta documentos como pólizas de seguro.'
        +' También puedes solicitar a los posibles voluntarios documentos como: cédula de identidad, hoja de delincuencia, curriculum vitae, etc.'
};

export default class KFormDocumentsAdminCreacion extends Component {

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
    }

    componentDidMount() {
        this.cargarDocumentosCampana();
        this.cargarDocumentosRestantes();
    }

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
                                <input className={"checkdoc"} type={"checkbox"} name={documentos[k]} id={"checkCamp" + k.toString()}
                                       onChange={this.onChangeCheckBoxDocumentosCampana} checked={true}/>
                                <label className={"lbldoc"}>&nbsp;&nbsp;{documentos[k]}

                                    <input type="file" name={k} id={"file" + k.toString()} className="uploadbutton"
                                           accessKey={documentos[k]}
                                           onChange={this.onChangeFileUploadButton}/>
                                    <label htmlFor={"file" + k.toString()}>Adjuntar</label>

                                </label>
                                <label className={"docname"} id={"name" + k.toString()}>&nbsp;{nombreDoc}</label>
                                <br/>
                                <progress className={"dos"} max={100} value={progress} id={"bar" + k.toString()}>0%</progress>
                            </div>
                        );


                } else if (documentos[k] !== "Foto") {
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

            this.setState({
                listaDocumentosCampana: listaDocumentosCampana,
                nombresDocumentos: nombresDocumentos
            });

        });
    }

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

    onChangeCheckBoxDocumentosCampana(e){
        database.eliminar_nombre_documento_campana(this.props.campana.id, e.target.name).then(
            result => {
                this.componentDidMount();
            }
        );
    }

    onChangeCheckBoxDocumentosRestantes(e){
        database.insertar_nombre_documento_campana(this.props.campana.id, e.target.name, e.target.name).then(
            result => {
                this.componentDidMount();
            }
        )
    }

    onChangeFileUploadButton(e){
        try {
            const tipoDocumento = e.target.accessKey;
            this.props.handler(e.target.files[0].name);
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

            )
        } catch (err) {
            alert("ERROR " + err);
            return;
        }
    }



    render(){
        return(
            <div className="container text-center">
                <div>
                    {this.state.listaDocumentosCampana}
                    <br/>
                    {this.state.listaDocumentosRestantes}
                </div>

                <ReactTooltip id='table-tooltip' type='info' effect='solid'>
              <span>
                <h4> ¿A cuáles documentos hace referencia? </h4>
                <h5> ¿Deseas seleccionar documentos requeridos? </h5>
                <p>
                  Adjunta documentos como pólizas de seguro.
                  <br />
                  También puedes solicitar a los posibles voluntarios documentos como:
                  <br />
                  <ul>
                    <li>Cédula de identidad </li>
                    <li>Hoja de delincuencia</li>
                    <li>Curriculum Vitae </li>
                    <li>etc.</li>
                  </ul>
                </p>
              </span>
                </ReactTooltip>
                <div className="offset-6">
                    <input class="btn btn-default" float="left" type="button" onClick={ this.props.anterior } value="Anterior"/>
                    <input class="btn btn-primary" float="right" type="button" onClick={ this.props.siguiente } value="Siguiente"/>
                </div>

            </div>
        );
    }
}