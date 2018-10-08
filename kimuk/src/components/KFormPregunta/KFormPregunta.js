import React, { Component } from 'react';
import '../style/color.css';
import { Glyphicon } from 'react-bootstrap';

export default class KFormPregunta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: this.props.description,
      title: this.props.title,
      question: this.props.question
    };
  }

  questionData(){
    return (
      <div className="row">
        <div className="row">
          <br />
          <br />
          <div clasName="container">
            <h2 name="title"> {this.state.title} </h2>
            <div class="form-group">
              <p name="description">{this.state.description}</p>
            </div>
            <h5 name="question">{this.state.question} </h5>
          </div>
        </div>
      </div>
    );
  }


  render(){
      return(
        <div className="container">
          {this.questionData()}
        </div>
      );
  }
}
