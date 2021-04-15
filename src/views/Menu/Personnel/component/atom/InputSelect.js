import React, { Component } from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

class InputSelect extends Component {
    state = {}

    render() {
        return (
            <FormGroup>
                <Label htmlFor={this.props.id} className="input-label">{this.props.label}</Label>
                <Input type="select" name={this.props.id} id={this.props.id} disabled={this.props.disabled} value={this.props.value}>
                    {this.props.data.map((data, idx) => {
                        return (
                            <option key={idx} value={data.id}>{data.name}</option>
                        )
                    })}
                </Input>
            </FormGroup>
        );
    }
}

InputSelect.defaultProps = {
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

export default InputSelect;