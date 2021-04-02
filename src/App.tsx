import 'react-datepicker/dist/react-datepicker.css';
import './index.scss';
import '../public/favicon.ico';

import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import timezone from 'dayjs/plugin/timezone';
import { StoreProvider } from 'easy-peasy';
import { ClientContext, GraphQLClient } from 'graphql-hooks';
import React from 'react';
import ReactDOM from 'react-dom';
import { IconContext } from 'react-icons';
import { BrowserRouter } from 'react-router-dom';

import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache
} from '@apollo/client';
import Loader from '@organisms/Loader/Loader';
import Modal from '@organisms/Modal/Modal';
import Panel from '@organisms/Panel/Panel';
import ToastQueue from '@organisms/Toast/Toast';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import { store } from '@store/Store';
import { APP } from '@util/constants';
import Router from './core/routing/Router';

// Extend the time-based library for entire app.
day.extend(advancedFormat);
day.extend(timezone);

const client: GraphQLClient = new GraphQLClient({
  fetchOptions: { credentials: 'include' },
  url: `${APP.SERVER_URL}/graphql`
});

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    credentials: 'include',
    headers: {
      'Hasura-Client-Name': `Bloom Client (${process.env.APP_ENV})`,
      'content-type': 'application/json'
    },
    uri: process.env.HASURA_SERVER_URL
  })
});

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.APP_ENV,
  integrations: [new Integrations.BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: process.env.APP_ENV === 'dev' ? 1.0 : 0.75
});

const App: React.FC = () => (
  <ClientContext.Provider value={client}>
    <ApolloProvider client={apolloClient}>
      <StoreProvider store={store}>
        <IconContext.Provider value={{ className: 'react-icon' }}>
          <BrowserRouter>
            <Loader />
            <Modal />
            <Panel />
            <Router />
            <ToastQueue />
          </BrowserRouter>
        </IconContext.Provider>
      </StoreProvider>
    </ApolloProvider>
  </ClientContext.Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));
