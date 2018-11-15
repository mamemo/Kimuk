/**
 * Archivo que contiene las funciones para enseñar 
 * un selector de horas.
 */


import React from 'react';
import TimePicker from 'react-times';
import timeHelper from 'react-times';
import ICONS from 'react-times';
// Para usar el tema "material"
import 'react-times/css/material/default.css';
// O usar el tema clásico
import 'react-times/css/classic/default.css';

export default class TimePickerWrapper extends React.Component {
	constructor(props) {
		super(props);
		const { defaultTime, meridiem, focused, showTimezone, timezone } = props;
		let hour = '';
		let minute = '';

		this.state = {
		hour,
		minute,
		meridiem,
		focused,
		timezone,
		showTimezone,
		};

		this.onFocusChange = this.onFocusChange.bind(this);
		this.onTimeChange = this.onTimeChange.bind(this);
		this.handleFocusedChange = this.handleFocusedChange.bind(this);
	}

	/**
	* Maneja el cambio de horas.
	* @param options Es la nueva hora.
	*/
	onTimeChange(options) {
		const {
		hour,
		minute,
		meridiem
		} = options;

		this.setState({ hour, minute, meridiem });
	}

	/**
	* Método que dice si el mouse hizo click en el componente.
	* @param focused Es un boolean para ver si se encuentra seleccionado.
	*/
	onFocusChange(focused) {
		console.log(`onFocusChange: ${focused}`);
		this.setState({ focused });
	}

	/**
	* Método que controla cuando el mouse hizo click en el componente.
	*/
	handleFocusedChange() {
		const { focused } = this.state;
		this.setState({ focused: !focused });
	}

	/**
	* Obtiene la acción del usuario.
	*/
	get basicTrigger() {
		const { hour, minute } = this.state;
		return (
		<div
			onClick={this.handleFocusedChange}
			className="time_picker_trigger"
		>
			<div>
			Click to open panel<br />
			{hour}:{minute}
			</div>
		</div>
		);
	}

	/**
	* Obtiene la acción del usuario.
	*/
	get customTrigger() {
		return (
		<div
			onClick={this.handleFocusedChange}
			className="time_picker_trigger"
		>
			{ICONS.time}
		</div>
		);
	}

	/**
	* Obtiene la acción del usuario.
	*/
	get trigger() {
		const { customTriggerId } = this.props;
		const triggers = {
		0: (<div />),
		1: this.basicTrigger,
		2: this.customTrigger
		};
		return triggers[customTriggerId] || null;
	}

	/**
	 * Muestra los componentes deseados. 
	 * Actualiza la interfaz dependiendo de lo que pase en la aplicación.
	 */
	render() {
		const {
		hour,
		minute,
		focused,
		meridiem,
		timezone,
		showTimezone,
		} = this.state;

		return (
		<div id="datetime_picker_wrapper" className="time_picker_wrapper">
			<TimePicker
			trigger={this.trigger}
			{...this.props}
			focused={focused}
			meridiem={meridiem}
			timezone={timezone}
			onFocusChange={this.onFocusChange}
			onTimeChange={this.onTimeChange}
			showTimezone={showTimezone}
			time={hour && minute ? `${hour}:${minute}` : null}
			/>
		</div>
		);
	}
}

TimePickerWrapper.defaultProps = {
  customTriggerId: null,
  defaultTime: null,
  focused: false,
  meridiem: null,
  showTimezone: false
};