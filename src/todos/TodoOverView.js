import gql from 'graphql-tag';
import React, { useState } from 'react';

import { useQuery } from 'urql';

import TodoList from './TodoList';
import NewTodoForm from './NewTodoForm';

import loadable from '@loadable/component';

const Login = loadable(() => import(
  /* webpackChunkName: "auth" */ '../auth/LoginComponent'));

const JustifyCenter = ({ children }) => {
  return (<div className="grid justify-center">
    {children}
  </div>);
};

const TodoOverview = () => {
  const [filterCompleted, setFilterCompleted] = useState(false);

  const [overview, refetchOverView] =
    useQuery({ query: TodoOverviewQuery});

  if (overview.fetching) {
    return (<JustifyCenter>
      <div className="col-sm-4">Loading...</div></JustifyCenter>);
  } else if (overview.error && overview.error.graphQLErrors) {
    return (<JustifyCenter><div className="col-sm-4">
      <Login onLoginSuccess={refetchOverView}
        error={overview.error.graphQLErrors.join(', ')} /></div>
    </JustifyCenter>);
  }
  return (<JustifyCenter>
    <div className="col-sm-3">
      <NewTodoForm users={overview.data.users} />
    </div>
    <div className="col-sm-3">
      <p>{overview.data.todos.length} todos</p>
      <TodoList todos={overview.data.todos}
        filterCompleted={filterCompleted} />
    </div>
  </JustifyCenter>);
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