import React from 'react';
import { Input } from 'reactstrap';

function InputField(props) {
    const { field, form: { touched, errors }, type} = props;

    return (
        <div className="form-group">
            <label htmlFor={props.id} className="label-color">
                {props.label} {props.required && <span className="required">*</span>}
            </label>
            <Input type={type} className="rounded-12" {...field} {...props} invalid={!!(touched[field.name] && errors[field.name])}/>
            {(touched[field.name] && errors[field.name]) && (
                <small className="invalid-feedback" role="alert">{errors[field.name]}</small>
            )}
        </div>
    )
}

export default InputField;