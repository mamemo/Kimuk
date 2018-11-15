/**
 * Archivo que contiene las funciones para enseñar 
 * un selector de fecha.
 */


import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

export default class KDatePicker extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		startDate: moment()
		};
		this.handleDateChange = this.handleDateChange.bind(this);
	}

	/**
	* Maneja el cambio de fechas
	* @param date Es la nueva fecha
	*/
	handleDateChange(date) {
		this.setState({
			startDate: date
		});
	}

	/**
	* Muestra los componentes deseados. 
	* Actualiza la interfaz dependiendo de lo que pase en la aplicación.
	*/
	render() {
		return (
			<div id="datetime_picker_wrapper" className="time_picker_wrapper">
			<DatePicker
				name="execDate"
				selected={this.state.startDate}
				onChange={this.handleDateChange}
				className="form-control mb-2 mr-sm-2 mb-sm-0"
			/>
			</div>
		);
	}
}
