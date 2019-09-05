import gql from 'graphql-tag';
import React from 'react';

const Todo = ({ todo }) => {

} 

Todo.fragments = {
  todo: gql`
    fragment Todo_todo on TodoType {
      id
      title
      body
      completed
      creator {
        username
        firstName
        lastName
      }
    }
  `,
};

const UpdateTodoMutation = gql`
  mutation UpdateTodo(
    $id: ID!,
    $title: String,
    $body: String,
    $completed: Boolean) {
    updateTodo(
      id: $id,
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
export default Todo;