import gql from 'graphql-tag';
import React from 'react';

import Todo from './Todo';

const TodoList = ({ todos, filterCompleted }) => {
  todos = filterCompleted ? todos.filter(todo => todo.completed) : todos;
  return (
      <>{todos
        .map((todo, i) => <Todo todo={todo} key={i} />)}</>
  );
};

TodoList.fragments = {
  todo: gql`
    fragment TodoList_todo on TodoType {
      completed
      ...Todo_todo
    }
    ${Todo.fragments.todo}
  `,
};

export default TodoList;