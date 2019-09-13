import gql from 'graphql-tag';
import React, { useState, useRef, useContext, useEffect, useCallback, useImperativeHandle, useLayoutEffect } from 'react';
import { useMutation } from 'urql';
import { Formik, useField } from 'formik';
import classnames from 'classnames';

import { TextField, CheckboxField, Label, useFieldExtra, InputGroup, InputFeedback } from '../utils/FormUtils';

import Todo from './Todo';

const RegistryContext = React.createContext();

const useRegistry = () => {
  const registry = useRef({});

  useEffect(() => {
    return () => {
      registry.current = {};
    }
  });

  return [registry, ({children}) => (
    <RegistryContext.Provider value={registry}>
      {children}
    </RegistryContext.Provider>)];
}

const useRegister = (id, context, deps) => {
  const registry = useContext(RegistryContext);

  useEffect(() => {
    registry.current[id] = context;
    return () => {
      delete registry.current[id];
    }
  }, [deps]);
}



export const SearchGroup = ({children}) => {
  return (<div className="input-group">
      {children}
    <div className="input-group-append">
      <span className="input-group-text">V</span>
    </div>

  </div>);
};

const useIsomorphicNoopLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : () => ({});

export const SearchResult = ({ id, description }) => {
  return (<li className="list-group-item">{id}: {description}</li>)
}

export const SearchResults = React.forwardRef(({ choices }, ref) => {
  const [registry, RegistryProvider] = useRegistry();
  const [searchResults, setSearchResults] = useState([]);
  const listGroupRef = useRef();

  useIsomorphicNoopLayoutEffect(() => {
    const brect = listGroupRef.current.getBoundingClientRect();
    listGroupRef.current.style.width = `${brect.width.toFixed()}px`;
    listGroupRef.current.style.position = 'absolute'; 
    listGroupRef.current.style.zIndex = 4; 
  });

  useImperativeHandle(ref, () => ({
    setSearchResults: (results) => {
      setSearchResults(results)
    }
  }))

    return (
      <RegistryProvider><ul className="list-group" ref={listGroupRef}>{searchResults
        .map((result, i) => <SearchResult key={i} {...result} />)}</ul></RegistryProvider>
  );
})

export const SearchWidget = ({ field, choices, ...props }) => {
  const searchRef = useRef(null);

  const { onChange, onBlur, value, ...oldField } = field;

  const onChangeSearch = useCallback((event) => {
    searchRef.current.setSearchResults(
      choices.filter(choice => choice.description.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1))
  }, [])

  return (<>
    <SearchGroup><input {...{onChange: onChangeSearch, ...oldField}} /></SearchGroup>
    <SearchResults ref={searchRef} />
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


/* 
              onResultSelect={onResultSelect}
              onSearchChange={onSearchChange}
              results={searchResults}

  const [searchQuery, setSearchQuery] = useState('');


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
    .filter(user => user.username.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1)

  */
  const modifyChoices = (users) => users
    .map(user => {
      return {
        description: user.email,
        id: parseInt(user.id, 10),
      }
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