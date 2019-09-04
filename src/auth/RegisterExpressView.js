import { SSRCallback, executeMutation } from '../utils/SSRUtils';
import { RegisterSchema, RegisterMutation } from './RegisterCommon';

export default SSRCallback( async (req, res, next, cache, client) => { 

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
