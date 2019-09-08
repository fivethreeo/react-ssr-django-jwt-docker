import gql from 'graphql-tag';
import React, { useState } from "react";
import { useQuery } from 'urql';
import TodoList from './TodoList';
import NewTodoForm from './NewTodoForm';

const TodoOverview = () => {
  const [filterCompleted, setFilterCompleted] = useState(false);

  const [overview] = useQuery({ query: TodoOverviewQuery });
  
  if (overview.error) {
    let error = 'Error'
    if (overview.error.graphQLErrors) {
      error = overview.error.graphQLErrors.join(', ')
    }
    return (<p>{error}</p>)
  }  

  return (<>
    <NewTodoForm users={overview.data.users} />
    <p>{overview.data.todos.length} todos</p>
    <TodoList todos={overview.data.todos} filterCompleted={filterCompleted} />
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