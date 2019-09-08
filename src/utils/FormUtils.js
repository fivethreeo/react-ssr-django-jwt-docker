import React from 'react';
import isEmpty from 'is-empty';

import classnames from 'classnames';
import { useField } from 'formik';

export const InputFeedback = ({ error }) =>
  error ? <div className="invalid-feedback">{error}</div> : null;

export const Label = ({ className = '', field, ...props }) => {
  const id = 'id_' + field.name;

  return (
    <label for={id} className={className}>
      {props.label}
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

export const Input = ({ field, meta, baseClassName = 'form-control', className = '', group = {}, ...props }) => {
  const id = 'id_' + field.name;

  const classes = classnames(
    baseClassName,
    {
      'is-invalid': !!meta.error && meta.touched,
    },
    {
      'is-valid': meta.touched && (meta.error === undefined),
    },
    className
  );

  const LocalInputGroup = !isEmpty(group) ? (!!group.component ? group.component : InputGroup) : React.Fragment;

  return (<>
      <LocalInputGroup {...group}>
        <input
          id={id}
          className={classes}
          {...field}
          {...props}
        />
      </LocalInputGroup>
      <InputFeedback error={meta.error} />
    </>
  );
};

export const CheckboxInput = ({ field, meta, ...props }) => {

  return (
      <Input
        baseClassName='form-check-input'
        field={field}
        meta={meta}
        {...props} 
      />
  );
};



export const TextField = ({ className='', ...props }) => {
  const [field, meta] = useField(props);

  const classes = classnames(
    'form-group',
    className
  );

  return (
    <div class={classes}>
      <Label field={field} {...props} />
      <Input
        field={field}
        meta={meta}
        {...props}
      />
    </div>
  );
};

export const CheckboxField = ({ className='', ...props }) => {
  const [field, meta] = useField(props);

  const classes = classnames(
    'form-check',
    className
  );

  return (
    <div class={classes}>
      <CheckboxInput
        field={field}
        meta={meta}
        {...props}
      />
      <Label className='form-check-label' field={field} {...props} />
    </div>
  );
};