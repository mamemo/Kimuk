import React, { Component } from 'react';
import './KFormVoluntariado.css';
import '../style/color.css';
import '../style/general.css';
import './KHeaderVoluntariado.css'
import { Glyphicon } from 'react-bootstrap';

export default class KHeaderVoluntariado extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputType: 'hidden'
    };

    this.handleHiddenInput = this.handleHiddenInput.bind(this);
  }

  handleHiddenInput() {
    this.setState({inputType: 'text'});
  }
  /*
   * Volunteering Data Component
   * Parts: Image, name
   */
  volunteeringData() {
    return (
      <div className="flex-container">

        <div className="flex-item">

          <div className="thumbnail">

            <img
              id="profile-img"
              src={(this.props.url === "") ?  require('../../media/image1-icon.png') : this.props.url}
              className={'img-responsive'}
              accept="image/*"
              width="150"
              height="150" />

          </div>

          <div id="img-div" className="form-group">

              <label className="btn btn-link">
                  Agregar imagen al voluntariado

                  <input
                    id="image-file"
                    name="volImage"
                    type="file"
                    style={{display: 'none'}}
                    value={this.props.image}
                    onChange={this.props.handlerImage}
                  />

              </label>


              <progress className={"tres"} max={100} id={"barimg"}>0%</progress>

              <input
                className="form-control input-lg"
                type={this.state.inputType}
                value={this.props.image}
                onChange={this.props.handlerImage}
              />

          </div>

        </div>

        <div className="flex-item-name">

          <div className="input-group input-group-lg">

            <input
              name="volName"
              type="text"
              className="form-control"
              aria-label="Large"
              placeholder="Nombre del voluntariado"
              value={this.props.name}
              onChange={this.props.handler} />

          </div>

        </div>

      </div>
    );
  }

  render(){
      return(
        <div className="container">
          {this.volunteeringData()}
        </div>
      );
  }
}
