import './index.css';
import './index.scss';
import '../public/favicon.ico';

// Extend the time-based library for entire app.
import day from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { StoreProvider } from 'easy-peasy';
import { ClientContext, GraphQLClient } from 'graphql-hooks';
import React from 'react';
import ReactDOM from 'react-dom';
import { IconContext } from 'react-icons';

import ToastQueue from '@components/Toast/Toast';
import { APP } from '@constants';
import { store } from '@store/Store';
import Router from './Router';

day.extend(utc);

const client = new GraphQLClient({
  fetchOptions: { credentials: 'include' },
  url: `${APP.SERVER_URL}/graphql`
});

const App = () => (
  <ClientContext.Provider value={client}>
    <StoreProvider store={store}>
      <IconContext.Provider value={{ className: 'react-icon' }}>
        <Router />
        <ToastQueue />
      </IconContext.Provider>
    </StoreProvider>
  </ClientContext.Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));
