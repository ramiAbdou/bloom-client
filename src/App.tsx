/**
 * @fileoverview Component: App
 * - All globally-used React Context Providers are here.
 * @author Rami Abdou
 */

import './index.scss';
import '../public/favicon.ico';

import { StoreProvider } from 'easy-peasy';
import { ClientContext, GraphQLClient } from 'graphql-hooks';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { IconContext } from 'react-icons';

import Flow from '@components/Flow/Flow';
import Picker from '@components/Picker/Picker';
import ToastQueue from '@components/Toast/Toast';
import { APP } from '@constants';
import { store, useStoreActions } from '@store/Store';
import Router from './Router';

const client = new GraphQLClient({
  fetchOptions: { credentials: 'include' },
  url: `${APP.SERVER_URL}/graphql`
});

const Background = () => <div id="app" />;

const ResizeScreen = () => {
  const setCoordinates = useStoreActions(({ picker }) => picker.setCoordinates);
  const setWindowWidth = useStoreActions(({ screen }) => screen.setWindowWidth);

  const onWindowResize = () => {
    setCoordinates();
    setWindowWidth(window.innerWidth);
  };

  // Add the window resize event listener.
  useEffect(() => {
    onWindowResize(); // Set the initial values.
    window.addEventListener('resize', onWindowResize);
    return () => window.removeEventListener('resize', onWindowResize);
  }, []);

  return null;
};

const App = () => (
  <ClientContext.Provider value={client}>
    <StoreProvider store={store}>
      <IconContext.Provider value={{ className: 'react-icon' }}>
        <ResizeScreen />
        <Router />
        <Background />
        <Picker />
        <Flow />
        <ToastQueue />
      </IconContext.Provider>
    </StoreProvider>
  </ClientContext.Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));
