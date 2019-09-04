import { createRequest } from 'urql';
import { pipe, toPromise } from 'wonka';

export const SSRCallback = (callback) => {
  return async (req, res, next) => {
    const retval = callback(req, res, next, res.locals.SSRCache, res.locals.urqlClient)
    if (retval) return retval
  }
}

export const executeMutation = (client, doc, vars) => {
  const req = client.createRequestOperation(
    'mutation',
    createRequest(doc, vars)
  );

  return pipe(client.executeMutation(req), toPromise);
}
