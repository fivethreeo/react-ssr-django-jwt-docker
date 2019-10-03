import React from "react";
import serialize from 'serialize-javascript';

const UrqlDataComponent = ({ nonce,  data }) => {
  return (
    <script
      type="text/javascript"
      nonce={nonce}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: `window.URQL_DATA=${serialize(data)}`,
      }}
    />
  );
}

export default UrqlDataComponent; 
