import React from 'react'
import { Label, Input, FormGroup } from 'reactstrap';
export default function Question(props) {
    const { code, onAnswered, checked, a, b} = props;

    function changeOption(e) {
        onAnswered(code, e.target.value);
    }

    return (
        <div className="card item-test" style={{ boxShadow: '0 2px 3px rgba(33,33,33,0.1)' }}>
            <div className="card-body">
                <FormGroup check>
                    <Label check>
                        <Input type="radio" name={code} value="a" onChange={changeOption} checked={checked === 'a'} />
                        &nbsp;
                        {a}
                    </Label>
                </FormGroup>
                <br />
                <FormGroup check>
                    <Label check>
                        <Input type="radio" name={code} value="b" onChange={changeOption} checked={checked === 'b'} />
                        &nbsp;
                        {b}
                    </Label>
                </FormGroup>
            </div>
        </div>
    )
}