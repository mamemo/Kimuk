import React, { Component } from 'react';
import './KModalInfo.css';

export default class KModalInfo extends Component {
  constructor(props){
    super(props);


    console.log(this.props.volunteerInfo);
    this.state = {
      estadoSolicitud: "",


      provincias:"",
      cantones:"",
      distritos:"",
      errors: {}
    }
    this.guardar_info=this.guardar_info.bind(this);
    this.cargar_provincias=this.cargar_provincias.bind(this);
  }

  guardar_info(e){
    if(e.target.name==="provincia"){
        
        fetch("https://ubicaciones.paginasweb.cr/provincia/"+e.target.value+"/cantones.json")
        .then((resp) => resp.json())
        .then((data) => this.setState({ cantones: data }))
        this.props.voluntario.canton="";
        this.props.voluntario.distrito="";
        this.render();
    }
    if(e.target.name==="canton"){
        fetch("https://ubicaciones.paginasweb.cr/provincia/"+this.props.voluntario.provincia+"/canton/"+e.target.value+"/distritos.json")
        .then((resp) => resp.json())
        .then((data) => this.setState({ distritos: data }))
        this.render();
    }
    this.props.voluntario[e.target.name]=e.target.value;
  }

  cargar_provincias(){
    fetch("https://ubicaciones.paginasweb.cr/provincias.json")
    .then((resp) => resp.json())
    .then((data) => this.setState({ provincias: data}));
  }


  handleChange(event){
    //this.setState({estadoSolicitud: event.target.value})
  }

  render() {

    this.cargar_provincias();
    const p= [];
    const c= [];
    const d= [];
    for(var k in this.state.provincias){
        p.push( <option value={k} >{this.state.provincias[k]}</option>);
    }
    for(var k in this.state.cantones){
        c.push( <option value={k} >{this.state.cantones[k]}</option>);
    }
    for(var k in this.state.distritos){
        d.push( <option value={k} >{this.state.distritos[k]}</option>);
    }

    return (

      <div className="container-form">
      <form className="form_container">

        <section>
          <div>
            <h5>Información Personal</h5>
            <hr></hr>
          </div>


          <div className="group_line">
            <div className="form_field">
              <label>Tipo de identificación</label>
              <select>
                <option value="">Cédula de identidad</option>

              </select>
            </div>

            <div className="form_field">
              <label>Identificación</label>
              <input type="number"/>
            </div>
          </div>

          <div className="group_line">

            <div className="form_field">
            <label>Nombre</label>
              <input type="text" className="name_input" placeholder={this.props.volunteerInfo.Nombre}/>
            </div>

          </div>

          <div className="form_field">
            <label>Fecha de Nacimiento</label>
            <input type="date" placeholder={this.props.volunteerInfo.Fecha_nacimiento}/>
          </div>

          <div className="form_field">
            <label>Género</label>
            <select>
              <option value="">Masculino</option>
              <option value="">Femenino</option>
              <option value="">Prefiero no especificar</option>
            </select>
          </div>


          <div className="form_field">
            <label>Estado civil</label>
            <select onChange={this.setState(this.handleChange)}>
              <option>Casado</option>
              <option>Soltero</option>
            </select>
          </div>
        </section>

        <section>


          <div>
            <h5>Lugar de residencia</h5>
            <hr></hr>
          </div>

          <div className="group_line">
            <div className="form_field">
              <label>Provincia</label>
              <select>
              <option value="" selected disabled>Provincia</option> 
                {p}
              </select>
            </div>

            <div className="form_field">
              <label>Cantón</label>
              <select>
              <option value="" selected disabled>Canton</option>
                {c}
              </select>
            </div>

            <div className="form_field">
              <label>Distrito</label>
              <select>
              <option value="" selected disabled>Distrito</option>
                {d}
              </select>
            </div>
          </div>

          <div className="form_field">
            <label>Dirección exacta</label>
            <input type="text-long" placeholder=""/>
          </div>

        </section>

        <section>

          <div>
            <h5>Contacto</h5>
            <hr></hr>
          </div>

          <div className="form_field">
            <label>Correo electrónico</label>
            <input type="email" placeholder={this.props.volunteerInfo.Correo_electronico}/>
          </div>

          <div className="form_field">
            <label>Teléfono 1</label>
            <input type="phone" placeholder={this.props.volunteerInfo.Telefono_uno}/>
          </div>

          <div className="form_field">
            <label>Teléfono 2</label>
            <input type="phone"placeholder={this.props.volunteerInfo.Telefono_dos}/>
          </div>

        </section>

      </form>
      </div>
    )
  }
}
