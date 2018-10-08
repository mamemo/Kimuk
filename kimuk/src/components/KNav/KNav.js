import React, { Component } from 'react';
import { Link } from 'react-router';
import './KNav.css';
import '../style/color.css';


class Popup extends Component {
  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>
          <h5>{this.props.title}</h5>
          <h6><b>Teléfono: </b>{this.props.telephone}</h6>
          <h6><b>Dirección: </b>{this.props.adress}</h6>
          <h6><b>Otras Señas: </b>{this.props.others}</h6>
          <h2>____________________________________________</h2>
          <h5>{this.props.title2}</h5>
          <h6><b>Teléfono: </b>{this.props.telephone2}</h6>
          <h6><b>Dirección: </b>{this.props.adress2}</h6>
          <h6><b>Otras Señas: </b>{this.props.others2}</h6>
        <a type="button" onClick={this.props.closePopup} href="#">Cerrar</a>
        </div>
      </div>
    );
  }
}

export default class KNav extends Component {

  constructor() {
    super();
    this.state = {
      showPopup: false
    };
  }
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  render(){
    return(
      <nav className="container-fluid color_1">
        <div className="row align-items-end">
          <div className="col-1"> 
            <a class="navbar-brand text-white align-text-bottom" href="#">
              <img src={require('../rsc/logo-solo-blanco.png')} width="30" height="38" class="d-inline-block align-top" alt=""/>
                 &nbsp; Kimuk
            </a>
            
          </div>
          <div className="col-4 "> 
            <ul class="nav">
              <li class="nav-item">
                <a class="nav-link text-white align-text-bottom" onClick={() => this.props.ir(2)} href>Crear Voluntariado</a>
              </li>
              <li class="nav-item">
                <a class="nav-link text-white align-text-bottom" onClick={() => {alert('El Ciclo de Gestión de Voluntariado, es el proceso que garantiza la inclusión de los voluntarios en los programas de asistencia de la Cruz Roja Costarricense. Este proceso busca fortalecer y organizar los esfuerzos realizados por la institución y los voluntarios para poder cumplir con sus labores y objetivos, así como con su misión y visión. \nEl Ciclo tiene como objetivo primordial el fortalecer el talento humano de todos los voluntarios que apoyan el alcance de los objetivos y metas de la Cruz Roja Costarricense, a través de etapas de reclutamiento, capacitación, integración, nivelación, transición y salida de la Sociedad Nacional. Por lo tanto, el Ciclo contempla desde el ingreso del personal hasta su salida de la organización (si se diera el caso), buscando la especialización dentro del área de trabajo respectiva para cada sección de servicio.\n\nEtapas del Ciclo de Voluntariado.\nComo se menciona, el Ciclo está compuesto por varias fases o etapas que responden a momentos críticos en el proceso de reclutamiento y formación del recurso humano voluntario, procesos que todo voluntario deberá de completar para formar parte de la organización; las etapas son:\n1) Captación y reclutamiento: durante esta fase se realiza la campaña de reclutamiento, las entrevistas de aspirantes, los convivios y la inscripción de aspirantes a voluntarios.\n2) Capacitación: una de las fases primordiales del Ciclo, comprende todo el proceso de formación del voluntario, la capacitación básica institucional, la formación general y la formación especializada; además de incluir el proceso de consolidación, en la cual los aspirantes seleccionan la sección de servicio a la cual se integrarán.\n3) Nivelación: este proceso está enfocado en los voluntarios con mayor tiempo de pertenecer a la organización, y que por algún motivo no han podido completar su proceso de capacitación, aprovechando el ingreso de nuevos aspirantes, se unen a estos para continuar con el cumplimiento de la malla curricular correspondiente.\n4) Desafiliación: durante este proceso se evalúan las posibilidades de cada voluntario de continuar como miembro de la organización, se busca las personas quienes no puedan continuar tengan la opción de mantenerse en contacto con la organización y reingresar posteriormente. Además le permite a los comités auxiliares desafiliar a aquellas personas que han abandonado el proceso, dejando espacio para que otras personas puedan ser reclutadas.');}} href="#">Información</a>
              </li>
              <li class="nav-item" >
                <a class="nav-link text-white align-text-bottom" onClick={this.togglePopup.bind(this)} href="#" >Contacto</a>
              </li>
            </ul>
          </div>

        </div>
        {this.state.showPopup ? 
          <Popup
            title='Dirección Principal'
            telephone='+506 2542 -5000'
            adress='Calle 8, Avenida 14, Distrito Hospital, San José 10103, Costa Rica'
            others='200 m sur, 50 oeste,  Parque la Merced, San José'
            title2='Sede Administrativa Zapote'
            telephone2='+506 2528-0000'
            adress2='Avenida 20A, Zapote, San José, 10105, Costa Rica'
            others2='De Casa Presidencial, 300 m noroeste y 25 metros norte'
            closePopup={this.togglePopup.bind(this)}
          />
          : null
        }
      </nav>
    );
  }
}