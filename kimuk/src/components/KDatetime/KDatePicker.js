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

  /*
   * Handle changes in date inputs
   *
   */
   handleDateChange(date) {
      this.setState({
        startDate: date
      });
    }

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
