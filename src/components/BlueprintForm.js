import React from 'react';

import { useField } from 'formik';
import { FormGroup, InputGroup, Checkbox } from '@blueprintjs/core';

export const getBlueprintFormGroupProps = (props, field, meta) => {
  const id = 'id_' + field.name;
  const intent = (field.value && !!meta.error) ? 'danger' : (field.value && meta.touched && (meta.error === undefined) ? 'success' : null);
  return {labelFor: id, label: props.label, intent: intent};
};

export const getBlueprintInputProps = (props, field, meta) => {
  const id = 'id_' + field.name;
  const intent = (field.value && !!meta.error) ? 'danger' : (field.value && meta.touched && (meta.error === undefined) ? 'success' : null);
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
  const [formgroup, field, meta] = useFieldExtra(newProps);

  return (
    <FormGroup {...formgroup}>
      <InputGroup {...field} />
    </FormGroup>
  );
};


export const CheckboxField = (props) => {
  const newProps = { type: 'checkbox', ...props };
  const [formgroup, field, meta] = useFieldExtra(newProps);
  const { labelFor, formgroupProps } = formgroup;

  return (
    <Checkbox {...formgroupProps} {...field} />
  );
};