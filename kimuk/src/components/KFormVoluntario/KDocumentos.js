/**
 * Archivo que actualiza la base de datos con los 
 * archivos que se escogen a la hora de registrarse como voluntario.
 */


import axios from 'axios'
import Blob from 'blob'
import FormData from 'form-data'
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Files from 'react-files'
import './KFormVoluntario.css';
import '../style/color.css';

export default class KDocumentos extends Component {
    constructor (props) {
        super(props)
        this.state = {
          files: []
        }
    }

	/**
	 * Método que ontrola cuando hay un cambio en los archivos.
	 */
    onFilesChange = (files) => {
        this.setState({
			files
        }, () => {
          console.log(this.state.files)
        })
    }

	/**
	 * Método que controla cuando hubo un fallo subiendo un archivo.
	 */
    onFilesError = (error, file) => {
        console.log('error code ' + error.code + ': ' + error.message)
    }

	/**
	 * Método que controla cuando se elimina un archivo subido.
	 */
	filesRemoveOne = (file) => {
		this.refs.files.removeFile(file)
	}

	/**
	 * Método que controla cuando se eliminan todos los archivos subidos.
	 */
    filesRemoveAll = () => {
        this.refs.files.removeFiles()
    }

	/**
	 * Método que controla el subir un archivo.
	 */
    filesUpload = () => {
        const formData = new FormData()
        Object.keys(this.state.files).forEach((key) => {
          const file = this.state.files[key]
          formData.append(key, new Blob([file], { type: file.type }), file.name || 'file')
        })

        axios.post(`/files`, formData)
        .then(response => window.alert(`${this.state.files.length} files uploaded succesfully!`))
        .catch(err => window.alert('Error uploading files :('))
    }
	
	/**
	 * Muestra los componentes deseados. 
	 * Actualiza la interfaz dependiendo de lo que pase en la aplicación.
	 */
	render(){
        return(
            <div className="">
                <div className="">
                <div className="col-6 offset-3">
                <div>
        <h1>Subir documentos</h1>
        <Files
          ref='files'
          className='files-dropzone-list'
          style={{ height: '100px' }}
          onChange={this.onFilesChange}
          onError={this.onFilesError}
          multiple
          maxFiles={10}
          maxFileSize={10000000}
          minFileSize={0}
          clickable
        >
          Arrastrar archivos o clickear para subir
        </Files>
        <button className="btn btn-info" onClick={this.filesRemoveAll}>Remover todos los archivos</button>
        <button className="btn btn-info" onClick={this.filesUpload}>Subir</button>
        {
          	this.state.files.length > 0
			? <div className='files-list'>
				<ul>{this.state.files.map((file) =>
				<li className='files-list-item' key={file.id}>
					<div className='files-list-item-preview'>
					{file.preview.type === 'image'
					? <img className='files-list-item-preview-image' src={file.preview.url} />
					: <div className='files-list-item-preview-extension'>{file.extension}</div>}
					</div>
					<div className='files-list-item-content'>
					<div className='files-list-item-content-item files-list-item-content-item-1'>{file.name}</div>
					<div className='files-list-item-content-item files-list-item-content-item-2'>{file.sizeReadable}</div>
					</div>
					<div
					id={file.id}
					className='files-list-item-remove'
					onClick={this.filesRemoveOne.bind(this, file)} // eslint-disable-line
					/>
				</li>
				)}</ul>
			</div>
			: null
        }
		</div>
		<br/>
		<br/>
			</div>
			</div>
				<div className="row">
					<div className="col-1 offset-2">
						<button className="btn btn-default" onClick={ this.props.anterior }>Anterior</button>
					</div>
					<div className="col-1 offset-6">
						<button className="btn btn-primary" onClick={ this.props.siguiente }>Siguiente</button>
					</div>
				</div>
				<br/>
				<br/>
			</div>
        );
    }
}
