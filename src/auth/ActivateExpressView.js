import {
  parse as parseQueryString,
  decodeQueryParams
} from 'serialize-query-params';
import parseUrl from 'parseurl';

import { SSRCallback, executeMutation } from '../utils/SSRUtils';
import { QueryParams, ActivateMutation } from './ActivateCommon';

export default SSRCallback( async (req, res, next, cache, client) => { 

    const { token, uid } = decodeQueryParams(QueryParams, parseQueryString(parseUrl(req).search));

    executeMutation(client, ActivateMutation, { token: token, uid: uid }).then((res)=>{

      if (res.data && res.data.success) {
        cache.set('activated', true, [ token, uid ] );
      }
      else {
        cache.set('activated', true, [ token, uid ] );
      }
      next();

    })
  }
)
