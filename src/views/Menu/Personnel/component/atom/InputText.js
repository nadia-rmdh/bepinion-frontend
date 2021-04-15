import React, { Component } from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

class InputText extends Component {
    state = {
        [this.props.id]: this.props.value
    }

    handleChangeValue = (value) => {
        this.props.changeValue(value)
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        },
            // () => {
            //     this.handleChangeValue(this.state);
            // }
        )

    }

    render() {
        // console.log(this.state)
        return (
            <FormGroup>
                <Label htmlFor={this.props.id} className="input-label">{this.props.label}</Label>
                <Input type="text" id={this.props.id} name={this.props.id} placeholder={this.props.label}
                    disabled={this.props.disabled}
                    value={this.state[this.props.id]}
                    onChange={this.handleChange} />
            </FormGroup>
        );
    }
}

InputText.defaultProps = {
    id: "input",
    label: "Your Label",
    placeholder: "Placeholder",
    disabled: false,
    value: ""
}

export default InputText;