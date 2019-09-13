import React from 'react';
import isEmpty from 'is-empty';

import classnames from 'classnames';
import { useField } from 'formik';

export const InputFeedback = ({ error }) =>
  error ? <div className="invalid-feedback">{error}</div> : null;

export const Label = ({ className = 'form-label', field, label }) => {

  return (
    <label htmlFor={field.id} className={className}>
      {label}
    </label>
  );
};

export const InputGroup = ({ className = '', children }) => {
  const classes = classnames(
    'input-group',
    className
  );
  return (<div className={classes} children={children} />)
}

export const get_id_classes = (className, field, meta) => {
  const id = 'id_' + field.name;

  const classes = classnames(
    className,
    {
      'is-invalid': !!meta.error && meta.touched,
    },
    {
      'is-valid': meta.touched && (meta.error === undefined),
    }
  );
  return {id: id, className: classes};
}

export const useFieldExtra = ({className = 'form-control', ...props}) => {
  const [field, meta] = useField(props);
  return [
    {...get_id_classes(className, field, meta), ...field},
    meta]
}

export const InputWidget = (props) => {
  return (<input {...props} />);
};


export const TextField = ({ className='', ...props }) => {
  const newProps = { type: 'text', ...props };
  const [field, meta] = useFieldExtra(newProps);

  const classes = classnames(
    'form-group',
    className
  );

  return (
    <div className={classes}>
      <Label field={field} {...props} />
      <InputWidget type={newProps.type} {...field} />
      <InputFeedback error={meta.error} />
    </div>
  );
};


export const CheckboxField = ({ className='', ...props }) => {
  const newProps = { type: 'checkbox', className: 'form-check-input', ...props };
  const [field, meta] = useFieldExtra(newProps);

  const classes = classnames(
    'form-check',
    className
  );

  return (
    <div className={classes}>
      <InputWidget type={newProps.type} {...field} />
      <Label className='form-check-label' field={field} {...props} />
      <InputFeedback error={meta.error} />
    </div>
  );
};