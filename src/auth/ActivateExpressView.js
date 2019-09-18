import {
  parse as parseQueryString,
  decodeQueryParams
} from 'serialize-query-params';
import parseUrl from 'parseurl';

import { SSRCallback, executeMutation } from '../utils/SSRUtils';
import { QueryParams, ActivateMutation } from './ActivateCommon';

export default SSRCallback( async (req, res, next, cache, client) => { 

    const { token, uid } = decodeQueryParams(QueryParams, parseQueryString(parseUrl(req).search));

    const mutationresult = await executeMutation(client, ActivateMutat0ion, { token: token, uid: uid });

    if (mutationresult.data && mutationresult.data.success) {
      cache.set('activated', true, [ token, uid ] );
    }
    else {
      cache.set('activated', true, [ token, uid ] );
    }
    return next();
  }
)
