import React, { Component } from 'react';
import { FormGroup, Label } from 'reactstrap';
import DatePicker from 'react-datepicker';

class InputDate extends Component {
    state = {
        [this.props.id]: this.props.value
    }

    handleChange = date => {
        // console.log(date.toString())
        this.setState({
            [this.props.id]: new Date(date)
        });
        // console.log(this.state);
    }

    render() {
        return (
            <FormGroup>
                <Label htmlFor={this.props.id} className="input-label">{this.props.label}</Label>
                <DatePicker className="form-control"
                    selected={this.state[this.props.id]}
                    onChange={this.handleChange}
                    dateFormat="yyyy-MM-dd"
                    disabled={this.props.disabled}
                />
            </FormGroup>
        );
    }
}

InputDate.defaultProps = {
    id: "input",
    label: "Your Label",
    disabled: false,
    data: [
        {
            id: 1,
            name: "option 1"
        },
        {
            id: 2,
            name: "option 2"
        }
    ]
}

export default InputDate;