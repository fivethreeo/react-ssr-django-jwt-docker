import gql from 'graphql-tag';
import React, { useState } from 'react';
import { useMutation } from 'urql';
import { Formik } from 'formik';

import { TextField, CheckboxField } from '../utils/FormUtils';

import Todo from './Todo';

const NewTodoForm = ({users}) => {

  const [result, executeMutation] = useMutation(NewTodoMutation); 

  const [mutationParams, setMutationParams] = useState({
    title: '',
    body: '',
    creatorId: null,
    completed: false,
  });

  const [searchQuery, setSearchQuery] = useState('');

  const onChange = (e) => {
    setMutationParams((state) => {
      return Object.assign({}, state,
        { [e.target.name]: e.target.value || e.target.checked }
      )
    });
  };

  const onSearchChange = (event) => {
    setSearchQuery(event.target.value);
  }

  const onResultSelect = (event, { result: { title, id } }) => {
    setMutationParams((state) => {
      return Object.assign({}, state,
        { creatorId: id }
      )
    });
    setSearchQuery(title);
  }

  const onSubmit = e => {
    executeMutation({
      variables: mutationParams,
    })
  };
  
  const {
    title,
    body,
    completed,
  } = mutationParams;
  
  const searchResults = users
    .filter(user => user.username.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1)
    .map(user => {
      const fullName = user.firstName + ' ' + user.lastName;
      return {
        title: user.username,
        description: fullName !== ' ' ? fullName : null,
        id: parseInt(user.id, 10),
      }
    });
  
  const initialValues = Object.assign({}, mutationParams, { user: searchQuery });

  return (<Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
        }}
        render={(props) => (
          <form onSubmit={onSubmit} noValidate>
            <TextField
              name="title"
              label="Title"
              placeholder="Todo Title"
              type="text"
            />
            <TextField
              name="body"
              label="Body"
              placeholder="I have to &hellip;"
            />
            <TextField
              name="user"
              label="User"
              onResultSelect={onResultSelect}
              onSearchChange={onSearchChange}
              results={searchResults}
            />
            <CheckboxField
              type="checkbox"
              name="completed"
              label="Completed"
            />            
            <p><button className="btn btn-lg btn-primary btn-block" type="submit">Submit</button></p>
          </form>

        )}
      />)
}

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
`

export default NewTodoForm;