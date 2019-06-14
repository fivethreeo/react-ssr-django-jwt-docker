import React from 'react';
import PropTypes from 'prop-types';
import serialize from 'serialize-javascript';
import filterWithRules from '../../utils/objects/filterWithRules';
import values from '../values';

function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

function mergeDeep(target, source) {
  let output = Object.assign({}, target);
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target))
          Object.assign(output, { [key]: source[key] });
        else
          output[key] = mergeDeep(target[key], source[key]);
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
}
// Filter the config down to the properties that are allowed to be included
// in the HTML response.
const clientConfig = filterWithRules(
  // These are the rules used to filter the config.
  values.clientConfigFilter,
  // The config values to filter.
  values,
);

const serializedClientConfig = serialize(mergeDeep(clientConfig, values.clientConfigOverrides));

/**
 * A react component that generates a script tag that binds the allowed
 * values to the window so that config values can be read within the
 * browser.
 *
 * They get bound to window.__CLIENT_CONFIG__
 */
function ClientConfig({ nonce }) {
  return (
    <script
      type="text/javascript"
      nonce={nonce}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: `window.__CLIENT_CONFIG__=${serializedClientConfig}`,
      }}
    />
  );
}

ClientConfig.propTypes = {
  nonce: PropTypes.string.isRequired,
};

export default ClientConfig;
