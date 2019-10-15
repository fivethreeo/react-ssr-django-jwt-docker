import React from 'react';

const WebpackNonceComponent = ({ data, ...props }) => {
  if (process.env.NODE_ENV === 'development') {
    return (
      <script
        type="text/javascript"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `window.__webpack_nonce__='${props.nonce}';`,
        }}
        {...props}
      />
    );
  }
  return null;
};

export default WebpackNonceComponent;