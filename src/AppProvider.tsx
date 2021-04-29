/* eslint-disable no-underscore-dangle */
import 'react-datepicker/dist/react-datepicker.css';
import './index.scss';
import '../public/favicon.ico';

import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { ClientContext, GraphQLClient } from 'graphql-hooks';
import React from 'react';
import { IconContext } from 'react-icons';
import { BrowserRouter } from 'react-router-dom';

import { ApolloClient, ApolloProvider, HttpLink } from '@apollo/client';
import { APP } from '@util/constants';
import cache from './App.cache';

// Extend the time-based library for entire app.
day.extend(advancedFormat);
day.extend(timezone);
day.extend(utc);

const client: GraphQLClient = new GraphQLClient({
  fetchOptions: { credentials: 'include' },
  url: `${APP.SERVER_URL}/graphql`
});

const apolloClient = new ApolloClient({
  cache,
  connectToDevTools: process.env.APP_ENV === 'dev',
  link: new HttpLink({
    credentials: 'include',
    headers: {
      'Hasura-Client-Name': `Bloom Client (${process.env.APP_ENV})`,
      'content-type': 'application/json'
    },
    uri: process.env.HASURA_SERVER_URL
  })
});

const AppProvider: React.FC = ({ children }) => (
  <ClientContext.Provider value={client}>
    <ApolloProvider client={apolloClient}>
      <IconContext.Provider value={{ className: 'react-icon' }}>
        <BrowserRouter>{children}</BrowserRouter>
      </IconContext.Provider>
    </ApolloProvider>
  </ClientContext.Provider>
);

export default AppProvider;
