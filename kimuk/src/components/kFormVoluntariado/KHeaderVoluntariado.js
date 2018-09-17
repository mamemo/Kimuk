import React, { Component } from 'react';
import '../style/color.css';
import '../style/general.css';
import { Glyphicon } from 'react-bootstrap';

export default class KHeaderVoluntariado extends Component {
  constructor(props) {
    super(props);
    this.state = {
      volName: "Nombre del Voluntariado"
    };
  }

  /*
   * Volunteering Data Component
   * Parts: Image, name
   */
  volunteeringData() {
    return (
      <div className="row">
        <div className="col-4">
          <div className="thumbnail">
            <img
              src={require('../../media/image1-icon.png')}
              className={'img-responsive'}
              width="200"
              height="200"/>
          </div>
        </div>

        <div className="col-8">
          <div className="input-group input-group-lg">
            <input
              id="volName"
              name="volName"
              type="text"
              className="form-control"
              aria-label="Large"
              aria-describedby="inputGroup-sizing-sm"
              align="left"
              value={this.state.volName}
              onChange={this.handleInputChange} />
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
