import { createRequest } from 'urql';
import { pipe, toPromise } from 'wonka';

export const fromYupErrors = (err) => {
  const errout = {};
  err.inner.forEach(inner => {
    errout[inner.path] = inner.message;
  })
  return errout;
}

export const fromGqlErrors = (err) => {
  const errout = {};
  for (var i=0;i<err.length;i=i+2) {
    errout[err[i]] = err[i+1];
  }
  return errout;
}

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
