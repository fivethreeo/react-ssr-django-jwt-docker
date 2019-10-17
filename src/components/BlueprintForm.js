import React from 'react';

import { useField } from 'formik';
import { FormGroup, InputGroup, Checkbox } from '@blueprintjs/core';

export const getBlueprintFormGroupProps = (props, field, meta) => {
  const id = 'id_' + field.name;
  const intent = (meta.touched && !!meta.error) ? 'danger' :
    (field.value && meta.touched && (meta.error === undefined) ?
      'success' : null);

  const error = (meta.touched && !!meta.error) ? meta.error : null;
  return {labelFor: id, label: props.label, intent: intent, helperText: error};
};

export const getBlueprintInputProps = (props, field, meta) => {
  const id = 'id_' + field.name;
  const intent = (field.value && !!meta.error) ? 'danger' :
    (field.value && meta.touched && (meta.error === undefined) ?
      'success' : null);
  return {id: id, intent: intent};
};

export const useFieldExtra = (props) => {
  const [field, meta] = useField(props);
  return [
    getBlueprintFormGroupProps(props, field, meta),
    {...getBlueprintInputProps(props, field, meta), ...field},
    meta];
};

export const TextField = (props) => {
  const newProps = { type: 'text', ...props };
  const [formgroup, field] = useFieldExtra(newProps);

  return (
    <FormGroup {...formgroup}>
      <InputGroup {...field} />
    </FormGroup>
  );
};


export const CheckboxField = (props) => {
  const newProps = { type: 'checkbox', ...props };
  const [formgroup, field] = useFieldExtra(newProps);
  const { labelFor: _, ...formgroupProps } = formgroup;

  return (
    <Checkbox {...formgroupProps} {...field} />
  );
};