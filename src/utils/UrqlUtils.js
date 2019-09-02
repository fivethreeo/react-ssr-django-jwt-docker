import { createRequest } from 'urql';
import { pipe, toPromise } from 'wonka';

export default (client, doc, vars) => {
  const req = client.createRequestOperation(
    'mutation',
    createRequest(doc, vars)
  );

  return pipe(client.executeMutation(req), toPromise);
}
