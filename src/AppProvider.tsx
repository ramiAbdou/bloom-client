/* eslint-disable no-underscore-dangle */
import 'react-datepicker/dist/react-datepicker.css';
import './index.scss';
import '../public/favicon.ico';

import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import React from 'react';
import { IconContext } from 'react-icons';
import { BrowserRouter } from 'react-router-dom';

import { ApolloClient, ApolloProvider, HttpLink } from '@apollo/client';
import cache from './App.cache';

// Extend the time-based library for entire app.
day.extend(advancedFormat);
day.extend(timezone);
day.extend(utc);

const apolloLink: HttpLink = new HttpLink({
  credentials: 'include',
  headers: {
    'Hasura-Client-Name': `Bloom Client (${process.env.APP_ENV})`,
    'X-Community-Id': localStorage.getItem('communityId'),
    'X-Member-Id': localStorage.getItem('memberId'),
    'content-type': 'application/json'
  },
  uri: process.env.HASURA_SERVER_URL
});

const apolloClient = new ApolloClient({
  cache,
  connectToDevTools: process.env.APP_ENV === 'dev',
  link: apolloLink
});

const AppProvider: React.FC = ({ children }) => (
  <ApolloProvider client={apolloClient}>
    <IconContext.Provider value={{ className: 'react-icon' }}>
      <BrowserRouter>{children}</BrowserRouter>
    </IconContext.Provider>
  </ApolloProvider>
);

export default AppProvider;
