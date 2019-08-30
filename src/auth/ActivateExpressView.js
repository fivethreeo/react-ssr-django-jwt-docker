import {
  decodeQueryParams
} from 'serialize-query-params';

import { executeMutation } from '../utils/UrqlUtils';
import { QueryParams, ActivateMutation } from './ActivateCommon';

export default (req, res, next) => { 
  const decodedQuery = decodeQueryParams(QueryParams, parsedQuery);
}
