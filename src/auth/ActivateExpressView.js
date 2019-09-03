import {
  parse as parseQueryString,
  decodeQueryParams
} from 'serialize-query-params';
import parseUrl from 'parseurl';

import executeMutation from '../utils/UrqlUtils';
import { QueryParams, ActivateMutation } from './ActivateCommon';

const SSRCallback = (callback) => {
  return async (req, res, next) => {
    const retval = callback(req, res, next, res.locals.SSRCache, res.locals.urqlClient)
    if (retval) return retval
  }
}

export default SSRCallback( (req, res, next, cache, client) => { 

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
