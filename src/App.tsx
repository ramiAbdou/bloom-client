/**
 * @fileoverview Component: App
 * - All globally-used React Context Providers are here.
 * @author Rami Abdou
 */

import './index.scss';
import '../public/favicon.ico';

import { StoreProvider } from 'easy-peasy';
import { ClientContext, GraphQLClient } from 'graphql-hooks';
import React from 'react';
import ReactDOM from 'react-dom';

import { LoaderProvider } from '@components/Loader';
import { APP } from '@constants';
import { store } from '@store/Store';
import AppRouter from './Router';

const client = new GraphQLClient({
  fetchOptions: { credentials: 'include' },
  url: `${APP.SERVER_URL}/graphql`
});

const Background = () => <div id="app" />;

const App = () => (
  <ClientContext.Provider value={client}>
    <StoreProvider store={store}>
      <LoaderProvider>
        <Background />
        <AppRouter />
      </LoaderProvider>
    </StoreProvider>
  </ClientContext.Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));
