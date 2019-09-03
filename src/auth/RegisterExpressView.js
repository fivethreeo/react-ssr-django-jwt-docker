
import executeMutation from '../utils/UrqlUtils';
import {RegisterSchema, RegisterMutation } from './RegisterCommon';

export default async (req, response, next) => { 
  executeMutation(response.locals.urqlClient, RegisterMutation, { token: token, uid: uid }).then((res)=>{
    if (res.data && res.data.success) { response.locals.SSRCache.set('activated', true, [ token, uid ] ); }
    else { response.locals.SSRCache.set('activated', false, [ token, uid ] ); }
  })
}
