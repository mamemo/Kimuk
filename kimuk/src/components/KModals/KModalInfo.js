import React, { Component } from 'react'

import './KModalInfo.css';

export default class KModalInfo extends Component {
  constructor(props){
    super(props);

    console.log(this.props.volunteerInfo);
  }
  render() {
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
            <select>
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
                <option>San José</option>
              </select>
            </div>

            <div className="form_field">
              <label>Cantón</label>
              <select>
                <option>San José</option>
              </select>
            </div>

            <div className="form_field">
              <label>Distrito</label>
              <select>
                <option>San José</option>
              </select>
            </div>
          </div>

          <div className="form_field">
            <label>Dirección exacta</label>
            <input type="text-long"/>
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

      <div className="btn_group">
          <button>Guardar</button>
          <button>Cancelar</button>
      </div>
      </div>
    )
  }
}
