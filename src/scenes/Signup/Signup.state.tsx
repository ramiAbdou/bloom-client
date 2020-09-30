/**
 * @fileoverview State: Signup
 * @author Rami Abdou
 */

import React, { ReactNode, useContext, useEffect, useState } from 'react';

import { Form } from '@constants';
import { getMembershipForm } from './Signup.gql';

/* 
  _____                      __  ___ _        _       
 |_   _|  _ _ __  ___ ___   / / / __| |_ __ _| |_ ___ 
   | || || | '_ \/ -_|_-<  / /  \__ \  _/ _` |  _/ -_)
   |_| \_, | .__/\___/__/ /_/   |___/\__\__,_|\__\___|
       |__/|_|                                        
*/

type SignupState = { communityId: string; form: Form };
const initialState: SignupState = { communityId: '', form: null };

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
  const [communityId, setCommunityId] = useState('');
  const [form, setForm] = useState<Form>(null);

  useEffect(() => {
    (async () => {
      const result = await getMembershipForm(community);
      setForm(result.membershipForm as Form);
      setCommunityId(result.id as string);
    })();
  }, []);

  return (
    <SignupContext.Provider value={{ communityId, form }}>
      {children}
    </SignupContext.Provider>
  );
};
