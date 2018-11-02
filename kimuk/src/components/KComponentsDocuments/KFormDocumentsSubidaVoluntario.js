import "./formDocuments.css";
import React, {Component} from "react";
import * as databaseVoluntario from "../DB/documentosVolunteer";
import * as database from "../DB/documentsAdmin"


export default class KFormDocumentsSubidaVoluntario extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            listaDocumentosCampana: []
        };
        this.onChangeFileUploadButtonVoluntario = this.onChangeFileUploadButtonVoluntario.bind(this);
    }

    componentDidMount(){
        database.leer_documentos_campana(this.props.campana.id).then(result => {
            let documentos = result;
            let listaDocumentosCampana = [];
            let consecutivo = 0;
            for(let k in documentos) {
                    listaDocumentosCampana.push(
                        <div className={"containerdoc"}>
                            <input className={"checkdoc"} type={"checkbox"} name={documentos[k]} id={consecutivo}
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
                            <progress  max={100} value={0} id={"bar" + k.toString()}>0%</progress>
                        </div>
                    );
                    consecutivo += 1;
            }
            this.setState({
                listaDocumentosCampana: listaDocumentosCampana,
            })
        });
    }


    onChangeFileUploadButtonVoluntario(e)
    {
        try {
            const tipoDocumento = e.target.accessKey;
            const nombreArchivo = e.target.files[0].name;
            const idCampana = this.props.campana.id;
            const voluntarioCedula = this.props.voluntario.cedula;
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

    render() {
        return (
            <div className="container text-center">
                <div>
                    <br/>
                    {this.state.listaDocumentosCampana}
                    <br/>
                </div>
            </div>
        );
    }

}