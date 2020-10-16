/**
 * @fileoverview State: Signup
 * @author Rami Abdou
 */

import { useQuery } from 'graphql-hooks';
import React, { ReactNode, useContext, useEffect, useState } from 'react';

import { Form } from '@constants';
import { GET_MEMBERSHIP_FORM } from './SignupGQL';

/* 
  _____                      __  ___ _        _       
 |_   _|  _ _ __  ___ ___   / / / __| |_ __ _| |_ ___ 
   | || || | '_ \/ -_|_-<  / /  \__ \  _/ _` |  _/ -_)
   |_| \_, | .__/\___/__/ /_/   |___/\__\__,_|\__\___|
       |__/|_|                                        
*/

type SignupState = {
  application: Form;
  communityId: string;
  userId: string;
  setUserId: (value: string) => void;
};

const initialState: SignupState = {
  application: null,
  communityId: '',
  setUserId: () => {},
  userId: ''
};

/* 
   ___         _           _       __  _  _          _   
  / __|___ _ _| |_ _____ _| |_    / / | || |___  ___| |__
 | (__/ _ \ ' \  _/ -_) \ /  _|  / /  | __ / _ \/ _ \ / /
  \___\___/_||_\__\___/_\_\\__| /_/   |_||_\___/\___/_\_\
*/

const SignupContext = React.createContext(initialState);
export const useSignup = () => useContext(SignupContext);

/* 
  ___             _    _         
 | _ \_ _ _____ _(_)__| |___ _ _ 
 |  _/ '_/ _ \ V / / _` / -_) '_|
 |_| |_| \___/\_/|_\__,_\___|_|  
*/

type SignupProvider = { children: ReactNode; community: string };

export default ({ children, community }: SignupProvider) => {
  const [application, setApplication] = useState<Form>(null);
  const [communityId, setCommunityId] = useState('');
  const [userId, setUserId] = useState('');

  const { data } = useQuery(GET_MEMBERSHIP_FORM, {
    variables: { encodedUrlName: community }
  });

  useEffect(() => {
    setApplication(data?.getCommunity?.application as Form);
    setCommunityId(data?.getCommunity?.id as string);
  }, [data]);

  return (
    <SignupContext.Provider
      value={{ application, communityId, setUserId, userId }}
    >
      {children}
    </SignupContext.Provider>
  );
};
