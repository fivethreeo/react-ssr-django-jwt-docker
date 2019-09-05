import gql from 'graphql-tag';
import React from 'react';
import { useQuery } from 'urql';
import TodoList from './TodoList';
import NewTodoForm from './NewTodoForm';

const TodoOverview = () => {

  const [overview] = useQuery({ query: TodoOverviewQuery });
  console.log(overview)
  return (<>I</>)
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