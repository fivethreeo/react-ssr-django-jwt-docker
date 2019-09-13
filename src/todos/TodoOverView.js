import gql from 'graphql-tag';
import React, { useState } from "react";
import { Link } from 'react-router-dom'

import { useQuery } from 'urql';

import TodoList from './TodoList';
import NewTodoForm from './NewTodoForm';

const TodoOverview = () => {
  const [filterCompleted, setFilterCompleted] = useState(false);

  const [overview] = useQuery({ query: TodoOverviewQuery });

  if (overview.error) {
    let error = <p>Error</p>   
    let gqlerror = '';
    if (overview.error.graphQLErrors) {
      gqlerror = overview.error.graphQLErrors.join(', ')
    }
    if (gqlerror.indexOf('permission') !== -1) {
      error = <><p>{gqlerror}.</p>  <p><Link to='/login'>Log in</Link> to see todos.</p></>
    }
    
    return (error)
  }  

  return (<>
    <div className="row">
      <div className="col-sm">
        <NewTodoForm users={overview.data.users} />
      </div>
      <div className="col-sm">
        <p>{overview.data.todos.length} todos</p>
        <TodoList todos={overview.data.todos} filterCompleted={filterCompleted} />
      </div>
    </div>
  </>)
}
 
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