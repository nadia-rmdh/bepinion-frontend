import React from 'react';
import { AppSwitch } from '@coreui/react';
import PropTypes from 'prop-types';

const ButtonSwitch = ({ id, name, checked, onChange }) => (

    <AppSwitch className={'mx-1'} variant={'pill'} id={id} name={name} color={'primary'} checked={checked} onChange={onChange} />
);

ButtonSwitch.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string.isRequired,
    checked: PropTypes.bool,
    onChange: PropTypes.func.isRequired
}

export default ButtonSwitch;