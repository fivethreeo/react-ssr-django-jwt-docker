import React from 'react';

import classnames from 'classnames';
import { useField } from 'formik';

export const InputFeedback = ({ error }) =>
  error ? <div className="invalid-feedback">{error}</div> : null;

export const InputFeedbackTooltip = ({ error }) =>
  error ? <div className="invalid-tooltip">{error}</div> : null;

export const Label = ({ error, className, children, ...props }) => {
  const classes = classnames(
    'label',
    {
      'error': error,
    },
    className
  );
  return (
    <label className={classes} {...props}>
      {children}
    </label>
  );
};

export const TextInput = ({ label, labelClassName="", inputClassName="", ...props }) => {
  const [field, meta] = useField(props);
  const id = 'id_' + field.name;

  const classes = classnames(
    'form-control',
    {
      'is-invalid': !!meta.error,
    },
    {
      'is-valid': meta.touched && (meta.error === undefined),
    },
    inputClassName
  );
  return (
    <>
      <Label htmlFor={id} error={!!meta.error} className={labelClassName}>
        {label}
      </Label>
      <input
        id={id}
        className={classes}
        {...field}
        {...props}
      />
      <InputFeedbackTooltip error={meta.error} />
    </>
  );
};

export const CheckboxInput = ({ label, className, labelClassName="", inputClassName="", ...props }) => {
  const [field, meta] = useField(props);
  const id = 'id_' + field.name;

  const classes = classnames(
    'form-check-input',
    {
      'is-invalid': !!meta.error,
    },
    {
      'is-valid': meta.touched && (meta.error === undefined),
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
        className={classes}
        {...field}
        {...props}
      />
      <Label htmlFor={id} error={!!meta.error} className={labelClasses}>
         {label}
      </Label>
      
      <InputFeedback error={meta.error} />
    </div>
  );
};