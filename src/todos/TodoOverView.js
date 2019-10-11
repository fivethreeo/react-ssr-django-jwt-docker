import gql from 'graphql-tag';
import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';

import { useQuery } from 'urql';

import TodoList from './TodoList';
import NewTodoForm from './NewTodoForm';
import Login from '../auth/LoginComponent';

const TodoOverview = () => {
  const [filterCompleted, setFilterCompleted] = useState(false);

  const [overview, refetchOverView] =
    useQuery({ query: TodoOverviewQuery });

  let content;

  if (overview.error) {
    let error = <p>Error</p>;
    let gqlerror = '';
    if (overview.error.graphQLErrors) {
      gqlerror = overview.error.graphQLErrors.join(', ');
    }
    if (gqlerror.indexOf('permission') !== -1) {
      error = <><p>{gqlerror}.</p></>;
    }
    content = <Login onLoginSuccess={refetchOverView} error={error} />;
  } else {
    content = <>
      <div className="col-sm">
        <NewTodoForm users={overview.data.users} />
      </div>
      <div className="col-sm">
        <p>{overview.data.todos.length} todos</p>
        <TodoList todos={overview.data.todos}
          filterCompleted={filterCompleted} />
      </div>
    </>;
  }

  return (<>
    <div className="row">
      {content}
    </div>
  </>);
};
 
const TodoOverviewQuery = gql`
  query TodoOverview {
    todos {
      ...TodoList_todo
    }
    users {
      ...NewTodoForm_user
    }
  }
  ${TodoList.fragments.todo}
  ${NewTodoForm.fragments.user}
`;

export default TodoOverview;