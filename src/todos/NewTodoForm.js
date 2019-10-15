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

import { FormGroup, MenuItem, Button } from '@blueprintjs/core';
import { Select } from '@blueprintjs/select';


import {
  TextField,
  CheckboxField,
  useFieldExtra
} from '../components/BlueprintForm';

import Todo from './Todo';



function highlightText(text, query) {
    let lastIndex = 0;
    const words = query
        .split(/\s+/)
        .filter(word => word.length > 0)
        .map(escapeRegExpChars);
    if (words.length === 0) {
        return [text];
    }
    const regexp = new RegExp(words.join("|"), "gi");
    const tokens = [];
    while (true) {
        const match = regexp.exec(text);
        if (!match) {
            break;
        }
        const length = match[0].length;
        const before = text.slice(lastIndex, regexp.lastIndex - length);
        if (before.length > 0) {
            tokens.push(before);
        }
        lastIndex = regexp.lastIndex;
        tokens.push(<strong key={lastIndex}>{match[0]}</strong>);
    }
    const rest = text.slice(lastIndex);
    if (rest.length > 0) {
        tokens.push(rest);
    }
    return tokens;
}

function escapeRegExpChars(text) {
    return text.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

const UserSearchField = (props) => {
  const newProps = { type: 'select', ...props };
  const [formgroup, field, meta] = useFieldExtra(newProps);
/* 
  useServerNoopLayoutEffect(() => {

  });
 */

  const NONE = "(none)";

  const items = [...props.items, NONE];

  const filterUser = useCallback((query, user) => {
    if (query === "" && items.length < 3) {
        return true;
    }
    if (query === "" && user === NONE) {
        return true;
    }
    if (query === "") {
        return user.id === field.value;
    }
    return user.email && user.email.toLowerCase().indexOf(query.toLowerCase()) >= 0;
  }, [field]);

  const renderUser = useCallback((user, { modifiers, handleClick, query }) => {
    if (!modifiers.matchesPredicate) {
      return null;
    }
    return (
      <MenuItem
        active={modifiers.active}
        disabled={modifiers.disabled}
        key={user === NONE ? NONE : user.id}
        onClick={handleClick}
        text={user === NONE ? NONE : highlightText(user.email, query)}
      />
    );
  }, [field]);
 
  const onItemSelect = useCallback((item) => {
      field.onChange(item === NONE ? '' : item.id);
  }, [field]); 

  return (
    <FormGroup {...formgroup}>
      <Select items={items} itemRenderer={renderUser} itemPredicate={filterUser}
        onItemSelect={onItemSelect} noResults={<MenuItem disabled={true} text="No results." />} >
                <Button text={NONE} rightIcon="double-caret-vertical" />
      </Select>
    </FormGroup>
  );
};

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

            <UserSearchField
              name="creatorId"
              label="Assigned to"
              items={users}
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