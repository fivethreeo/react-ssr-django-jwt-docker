import React from 'react';

import classnames from 'classnames';

export const InputFeedback = ({ error }) =>
  error ? <div className="input-feedback">{error}</div> : null;

export const Label = ({ error, className, children, ...props }) => {
  const classes = classnames(
    'label',
    {
      'error': !!error,
    },
    className
  );
  return (
    <label className={classes} {...props}>
      {children}
    </label>
  );
};

export const TextInput = ({ type, id, name, label, error, value, onChange, ...props }) => {
  const classes = classnames(
    'form-control',
    {
      'error': !!error,
    },
    props.inputClassName
  );
  return (
    <>
      <Label htmlFor={id} error={error} className={props.labelClassName || ""}>
        {label}
      </Label>
      <input
        id={id}
        name={name}
        className={classes}
        type={type}
        value={value}
        onChange={onChange}
        {...props}
      />
      <InputFeedback error={error} />
    </>
  );
};

export const CheckboxInput = ({ type, id, name, label, error, value, onChange, className, ...props }) => {
  const classes = classnames(
    'checkbox',
    {
      'error': !!error,
    },
    props.inputClassName || ""
  );
  const wrapperClasses = classnames(
    'checkbox',
    className
  );
  return ( 
    <div className={wrapperClasses}>
      <Label htmlFor={id} error={error} className={props.labelClassName}>
        <input
          id={id}
          name={name}
          className={classes}
          type={type}
          value={value}
          onChange={onChange}
          {...props}
        /> {label}
      </Label>
      
      <InputFeedback error={error} />
    </div>
  );
};