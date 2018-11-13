import React, {Component} from "react";
import './KFormVoluntariado.css';
import * as database from "../DB/documentsAdmin";
import "./formDocuments.css";
import ReactTooltip from 'react-tooltip';
import KHeaderVoluntariado from './KHeaderVoluntariado'
import KModalDocumentos from './KModalDocumentos';;


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
                                    <label htmlFor={"file" + k.toString()}>Adjuntar</label>

                                </label>
                                <label className={"docname"} id={"name" + k.toString()}>&nbsp;{nombreDoc}</label>
                                <br/>
                                <progress className={"documentosbar"} max={100} value={progress} id={"bar" + k.toString()}>0%</progress>
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
                                           onChange={this.onChangeFileUploadButton}/>
                                    <label htmlFor={"file" + k.toString()}>Adjuntar</label>

                                </label>
                                <label className={"docname"} id={"name" + k.toString()}>&nbsp;{nombreDoc}</label>
                                <br/>
                                <progress className={"documentosbar"} max={100} value={progress} id={"bar" + k.toString()}>0%</progress>
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
                </div>

            </div>
        );
    }
}
