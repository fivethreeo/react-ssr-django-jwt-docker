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
import classnames from 'classnames';


import {
  TextField,
  CheckboxField,
  Label,
  useFieldExtra,
  InputFeedback
} from '../utils/FormUtils';

import Todo from './Todo';


export const SearchGroup = ({children}) => {
  return (<div className="input-group">
      {children}
    <div className="input-group-append">
      <span className="input-group-text">V</span>
    </div>

  </div>);
};

export const SearchResult = ({ id, description }) => {
  useRegister(id, description, []);
  return (<li className="list-group-item">{id}: {description}</li>);
};

export const SearchResults = React.forwardRef(({ fieldRef }, ref) => {
  const [registry, RegistryProvider] = useRegistry();
  const [searchResults, setSearchResults] = useState([]);
  const listGroupRef = useRef();
  
  const onClickGlobal = useCallback((event) => {
    if (event.target!==fieldRef.current
      && !listGroupRef.current.contains(event.target)) {
      listGroupRef.current.style.display = 'none';
    }
  }, []);

  useGlobalMouseClick(onClickGlobal);

  useServerNoopLayoutEffect(() => {
    const brect = listGroupRef.current.getBoundingClientRect();
    listGroupRef.current.style.width = `${brect.width.toFixed()}px`;
    listGroupRef.current.style.position = 'absolute'; 
    listGroupRef.current.style.zIndex = 4;
    listGroupRef.current.style.display = 'block';
  });

  const searchCallback = useCallback((event) => {
    console.log(listGroupRef.current.contains(event.target));
  }, []);

  useImperativeHandle(ref, () => ({
    setSearchResults: (results) => {
      setSearchResults(results);
    }
  }));

  return (
    <RegistryProvider>
      <ul className="list-group" ref={listGroupRef}>{searchResults
      .map((result, i) => <SearchResult key={i} {...result} />)}</ul>
    </RegistryProvider>
  );
});

export const SearchWidget = ({ field, choices, ...props }) => {
  const searchRef = useRef(null);
  const fieldRef = useRef(null);

  const { onChange, onBlur, value, ...oldField } = field;

  const onChangeSearch = useCallback((event) => {
    searchRef.current.setSearchResults(
      choices.filter(choice => choice
        .description.toLowerCase()
        .indexOf(event.target.value.toLowerCase()) !== -1));
  }, []);

  const fieldProps =  {
    onChange: onChangeSearch,
    // onFocus: onChangeSearch,
    ref: fieldRef,
    ...oldField};

  return (<>
    <SearchGroup><input {...fieldProps} /></SearchGroup>
    <SearchResults ref={searchRef} fieldRef={fieldRef} />
    </>);
};

export const SearchField = ({ className='', ...props }) => {
  const newProps = { type: 'text', ...props };
  const [field, meta] = useFieldExtra(newProps);

  const classes = classnames(
    'form-group',
    className
  );

  return (
    <div className={classes}>
      <Label field={field} {...props} />
      <SearchWidget
        field={field}
        meta={meta}
        {...newProps}
      />
      <InputFeedback error={meta.error} />
    </div>
  );
};


const modifyChoices = (users) => users
  .map(user => {
    return {
      description: user.email,
      id: parseInt(user.id, 10),
    };
  }); 

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
            <SearchField
              name="creatorId"
              label="User"
              choices={modifyChoices(users)}
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