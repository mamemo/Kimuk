import React, {Component} from "react";
import * as database from "../DB/documentsVolunteer";
import "./formDocuments.css";
import { FaDownload } from 'react-icons/fa';
import ReactTooltip from 'react-tooltip';

export default class KFormDocumentsBajadaVoluntario extends Component {

    constructor(props){
        super(props);
        this.state = {
            listaDocumentos: []
        }
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount(){
        // Add event listener, this close the modal when the click is outside
        document.addEventListener('mousedown', this.handleClickOutside);
        // read volunteers from database
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
                                <label data-tip data-for='download-tooltip' htmlFor={"file" + consecutivo}>Descargar <FaDownload/> </label>
                            </a>
                        </label>
                        <label className={"docname"} id={"name" + k.toString()}>&nbsp;</label>
                        <br/>
                        <ReactTooltip id='download-tooltip' type='info' effect='solid' place="top">
                            <span>Descargá el documento.</span>
                        </ReactTooltip>
                    </div>
                );
                consecutivo += 1;
            }
            this.setState({
                listaDocumentos: listaDocumentos
            });
        });
    }

    componentWillUnmount() {
      document.removeEventListener('mousedown', this.handleClickOutside);
    }

    /**
     * Set the wrapper ref
     */
    setWrapperRef(node) {
      this.wrapperRef = node;
    }

    /**
     * Alert if clicked on outside of element
     */
    handleClickOutside(event) {
      if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
        this.props.onClose();
      }
    }


    render(){
        return (
            <div ref={this.setWrapperRef} className="doc_div text-left">
              <h5> Documentos disponibles para descarga </h5>
              <div className="container text-center">
                <hr/>
                {this.state.listaDocumentos}
                <br/>
                <button className="btn btn-primary" onClick={()=>{this.props.onClose();}}> Cerrar </button>
              </div>
            </div>
        );
    }
}
