import React, {Component} from "react";
import * as database from "../DB/documentsVolunteer";
import "./formDocuments.css";

export default class KFormDocumentsBajadaVoluntario extends Component {

    constructor(props){
        super(props);
        this.state = {
            listaDocumentos: []
        }
    }

    componentDidMount(){
        database.leer_documentos_voluntario(this.props.campana, this.props.voluntario.cedula).then(result => {
            let documentos = result;
            let listaDocumentos = [];
            let consecutivo = 0;
            for(let k in documentos)
            {
                listaDocumentos.push(
                    <div className={"containerdoc"}>
                        <label className={"lbldoc"}>&nbsp;&nbsp;{k}
                            <a href={documentos[k]} target="_blank">
                                <input type="button" name={k} id={"file" + consecutivo} className="uploadbutton"
                                   accessKey={k} />
                                <label htmlFor={"file" + consecutivo}>Descargar</label>
                            </a>
                        </label>
                        <label className={"docname"} id={"name" + k.toString()}>&nbsp;</label>
                        <br/>
                    </div>
                );
                consecutivo += 1;
            }
            this.setState({
                listaDocumentos: listaDocumentos
            });
        });
    }


    render(){
        return (
            <div className="container text-center">
                <div>
                    <br/>
                    {this.state.listaDocumentos}
                    <br/>
                </div>
            </div>
        );
    }
}