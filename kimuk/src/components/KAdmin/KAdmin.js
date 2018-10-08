import React, { Component } from 'react';
import './KAdmin.css';
import '../style/color.css';
import KAdminEncargados from "./KAdminEncargados";

export default class KAdmin extends Component {
    render(){
        return(
            <div className="container text-center">
                Hola Admin
                <KAdminEncargados/>
            </div>
        );
    }
}