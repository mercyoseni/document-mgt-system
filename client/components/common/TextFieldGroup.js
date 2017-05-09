import React from 'react';
import PropTypes from 'prop-types';

const TextFieldGroup = ({ field, value, label, type, onChange, icon, placeholder }) => {
  return(
    <div className="input-field col s12">
      <i className="material-icons prefix">{icon}</i>
      <input
      value={value}
      onChange={onChange}
      name={field} 
      type={type}
      placeholder={placeholder}
      className="validate" required />
      <label>{label}</label>
    </div>
  );
}

TextFieldGroup.propTypes = {
  field: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired
}

TextFieldGroup.defaultProps = {
  type: 'text'
}

export default TextFieldGroup;