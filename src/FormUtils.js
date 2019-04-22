import React from 'react';

import classnames from 'classnames';

export const InputFeedback = ({ error }) =>
  error ? <div className="invalid-feedback">{error}</div> : null;

export const InputFeedbackTooltip = ({ error }) =>
  error ? <div className="invalid-tooltip" data-placement="right">{error}</div> : null;

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

export const TextInput = ({ type, id, name, label, touched, labelClassName="", inputClassName="", error, value, onChange, ...props }) => {
  const classes = classnames(
    'form-control',
    {
      'is-invalid': !!error,
    },
    {
      'is-valid': touched && (error === undefined),
    },
    inputClassName
  );
  return (
    <div class="col">
      <Label htmlFor={id} error={error} className={labelClassName}>
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
      <InputFeedbackTooltip error={error} />
    </div>
  );
};

export const CheckboxInput = ({ type, id, name, label, touched, error, value, onChange, className, labelClassName="", inputClassName="", ...props }) => {
  const classes = classnames(
    'form-check-input',
    {
      'is-invalid': !!error,
    },
    {
      'is-valid': touched && (error === undefined),
    },
    inputClassName
  );
  const labelClasses = classnames(
    'form-check-label',
    labelClassName
  );
  const wrapperClasses = classnames(
    'form-check',
    className
  );
  return ( 
    <div className={wrapperClasses}>
      <input
        id={id}
        name={name}
        className={classes}
        type={type}
        value={value}
        onChange={onChange}
        {...props}
      />
      <Label htmlFor={id} error={error} className={labelClasses}>
         {label}
      </Label>
      
      <InputFeedback error={error} />
    </div>
  );
};