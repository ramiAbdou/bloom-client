/**
 * @fileoverview State: Application
 * @author Rami Abdou
 */

import React, { useContext, useState } from 'react';

import { Form, ProviderProps } from '@constants';

type ApplicationState = {
  application: Form;
  setApplication: (application: Form) => void;
};

const initialState: ApplicationState = {
  application: null,
  setApplication: () => {}
};

const ApplicationContext = React.createContext(initialState);
export const useApplication = () => useContext(ApplicationContext);

export default ({ children }: ProviderProps) => {
  const [application, setApplication] = useState<Form>(null);

  return (
    <ApplicationContext.Provider value={{ application, setApplication }}>
      {children}
    </ApplicationContext.Provider>
  );
};
