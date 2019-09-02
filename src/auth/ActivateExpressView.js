import {
  parse as parseQueryString,
  decodeQueryParams
} from 'serialize-query-params';
import parseUrl from 'parseurl';

import executeMutation from '../utils/UrqlUtils';
import { QueryParams, ActivateMutation } from './ActivateCommon';

export default async (req, response, next) => { 
  const { token, uid } = decodeQueryParams(QueryParams, parseQueryString(parseUrl(req).search));
  executeMutation(response.locals.urqlClient, ActivateMutation, { token: token, uid: uid }).then((res)=>{
    if (res.data && res.data.success) { response.locals.SSRCache.set('activated', true, [ token, uid ] ); }
    else { response.locals.SSRCache.set('activated', false, [ token, uid ] ); }
    next();
  })
}
