import React, { useState, useEffect, useContext } from "react";
import { parse as parseQueryString } from 'serialize-query-params';

import { useQuery, Context  } from "urql";

import { executeMutation } from '../utils/SSRUtils';
//import { SocialAuthMutation } from './SocialAuthCommon';


const SocialAuth = ({ match: { params: { provider } }, ...props }) => {
  const client = useContext(Context);
 
  useEffect(() => {
    console.log(props)
/*parseQueryString(location.search)     if (!hasSSRState && typeof window !== 'undefined') {

      executeMutation(client, SocialAuthMutation, { token: token, uid: uid })
      .then((res)=>{

        if (res.data && res.data.success) {
          setActivated(true);
        }
        else {
          setActivated(false);
        }
        
      })

    } */

  });


  return (
    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
      { provider }
    </div>
  )

}

export default SocialAuth;