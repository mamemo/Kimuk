import React, { Component } from 'react';
import './KFormVoluntariado.css';
import '../style/color.css';
import '../style/general.css';
import { Glyphicon } from 'react-bootstrap';

export default class KHeaderVoluntariado extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  /*
   * Volunteering Data Component
   * Parts: Image, name
   */
  volunteeringData() {
    return (
      <div className="row">
        <div className="col-md-3">
          <div className="thumbnail">
            <img
              id="profile-img"
              src={require('../../media/image1-icon.png')}
              className={'img-responsive'}
              width="200"
              height="200" />
          </div>
        </div>

        <div className="col-md-9">
          <div className="center">
            <div className="input-group input-group-lg">
              <input
                name="volName"
                type="text"
                className="form-control"
                aria-label="Large"
                aria-describedby="inputGroup-sizing-sm"
                align="left"
                placeholder="Nombre del voluntariado"
                value={this.props.name}
                onChange={this.props.handler} />
            </div>
          </div>
        </div>
        <div id="img-div" class="form-group">
          <input
            name="volImage"
            type="file"
            class="form-control-file"
            id="image-file"
            value={this.props.image}
            onChange={this.props.handler}
          />
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
