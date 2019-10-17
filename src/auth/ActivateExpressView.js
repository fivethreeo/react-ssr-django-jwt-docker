import {
  parse as parseQueryString,
  decodeQueryParams
} from 'serialize-query-params';
import parseUrl from 'parseurl';

import { executeMutation } from '../common/utils/urql';
import { QueryParams, ActivateMutation } from './ActivateCommon';

import getUrqlProps from '../server/utils/urql';
import renderApp from '../server/renderApp';

export default async (req, res) => { 

  const urqlProps = getUrqlProps(req, res);
  const { urqlClient } = urqlProps;

  const { token, uid } = decodeQueryParams(QueryParams, parseQueryString(parseUrl(req).search));

  const mutationresult = await executeMutation(urqlClient, ActivateMutation, { token: token, uid: uid });

  if (mutationresult.data && mutationresult.data.activate.success) {
    renderApp({ req, res, severContext: true, ...urqlProps });
  }
  else {
    renderApp({ req, res, severContext: false, ...urqlProps });
  }

};
