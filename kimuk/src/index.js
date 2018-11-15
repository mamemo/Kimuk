/**
 * Archivo que enlaza la aplicación con el html.
 */


import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render( < App / > , document.getElementById('root'));
registerServiceWorker();