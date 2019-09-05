import gql from 'graphql-tag';
import React from 'react';

import Todo from './Todo';

const NewTodoForm = () => {

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