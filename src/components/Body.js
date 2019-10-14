import React from 'react';
import loadable from '@loadable/component';
import { Callout } from '@blueprintjs/core';
import logo from './react.svg';

const BodyPart = loadable(() =>
  import(/* webpackChunkName: "body-part" */ './BodyPart')
);

const Body = () => {
  return (<>
      <img src={logo} className="react-logo" alt="logo" />
      <Callout title="Welcome to razzle" >
        To get started, edit <code className="bp3-code">src/Body.js</code> or{' '}
        <code className="bp3-code">src/Header.js</code> and save to reload.
      </Callout>
    </>
  );
}


export default Body;
