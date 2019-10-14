import gql from 'graphql-tag';
import React, { 
  useState,
  useRef,
  useCallback,
  useImperativeHandle
} from 'react';
import { useServerNoopLayoutEffect } from '../hooks/IsomorphicEffects';
import { useGlobalMouseClick } from '../hooks/WindowEvents';
import { useRegistry, useRegister } from '../hooks/Registry';
import { useMutation } from 'urql';
import { Formik } from 'formik';

import { FormGroup, MenuItem } from '@blueprintjs/core';
import { MultiSelect } from '@blueprintjs/select';


import {
  TextField,
  CheckboxField,
  useFieldExtra
} from '../components/BlueprintForm';

import Todo from './Todo';

export const SearchField = (props) => {
  const newProps = { type: 'select', ...props };
  const [formgroup, field, meta] = useFieldExtra(newProps);

  return (
    <FormGroup {...formgroup}>
      <MultiSelect items={props.items} itemRenderer={props.itemRenderer} {...field} />
    </FormGroup>
  );
};
/* 
const renderUser = (user, { modifiers, handleClick }) => {
  if (!modifiers.matchesPredicate) {
    return null;
  }
  return (
    <MenuItem
      active={modifiers.active}
      icon={this.isFilmSelected(film) ? "tick" : "blank"}
      key={film.rank}
      label={film.year.toString()}
      onClick={handleClick}
      text={`${film.rank}. ${film.title}`}
      shouldDismissPopover={false}
    />
  );
};
 */
const NewTodoForm = ({users}) => {

  const [result, executeMutation] = useMutation(NewTodoMutation);

  return (<Formik
        initialValues={{title: '', body: '', creatorId: 0, completed: false}}
        onSubmit={(values, actions) => {
        }}
        render={(props) => (
          <form onSubmit={props.handleSubmit} noValidate>
            <TextField
              name="title"
              label="Title"
              placeholder="Todo Title"
            />
            <TextField
              name="body"
              label="Body"
              placeholder="I have to &hellip;"
            />

            <CheckboxField
              name="completed"
              label="Completed"
            />            
            <p><button className="btn btn-lg btn-primary btn-block"
              type="submit">Submit</button></p>
          </form>

        )}
      />);
};

NewTodoForm.fragments = {
  user: gql`
    fragment NewTodoForm_user on UserType {
      id
      username
      email
      firstName
      lastName
    }
  `,
};

const NewTodoMutation = gql`
  mutation CreateTodo(
    $title: String!,
    $body: String!,
    $creatorId: ID!,
    $completed: Boolean!) {
    createTodo(
      creatorId: $creatorId,
      title: $title,
      body: $body,
      completed: $completed
    ) {
      todo {
        ...Todo_todo
      }
    }
  }
  ${Todo.fragments.todo}
`;

export default NewTodoForm;