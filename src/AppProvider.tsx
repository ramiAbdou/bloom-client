/* eslint-disable no-underscore-dangle */
import 'react-datepicker/dist/react-datepicker.css';
import './index.scss';
import '../public/favicon.ico';

import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { StoreProvider } from 'easy-peasy';
import { ClientContext, GraphQLClient } from 'graphql-hooks';
import React from 'react';
import { IconContext } from 'react-icons';
import { BrowserRouter } from 'react-router-dom';

import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache
} from '@apollo/client';
import { store } from '@store/Store';
import { APP } from '@util/constants';

// Extend the time-based library for entire app.
day.extend(advancedFormat);
day.extend(timezone);
day.extend(utc);

const client: GraphQLClient = new GraphQLClient({
  fetchOptions: { credentials: 'include' },
  url: `${APP.SERVER_URL}/graphql`
});

const apolloClient = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          //   applications: (_, { args, toReference }) =>
          //     toReference({
          //       __typename: 'applications',
          //       id: args.where?.id?._eq
          //     }),
          //   communities: (_, { args, toReference }) =>
          //     toReference({
          //       __typename: 'communities',
          //       id: args.where?.id?._eq
          //     }),
          //   community_integrations: (_, { args, toReference }) =>
          //     toReference({
          //       __typename: 'communities',
          //       id: args.where?.id?._eq
          //     }),
          //   event_attendees: (_, { args, toReference }) =>
          //     toReference({
          //       __typename: 'event_attendees',
          //       id: args.where?.id?._eq
          //     }),
          //   event_guests: (_, { args, toReference }) =>
          //     toReference({
          //       __typename: 'event_guests',
          //       id: args.where?.id?._eq
          //     }),
          //   event_watches: (_, { args, toReference }) =>
          //     toReference({
          //       __typename: 'event_watches',
          //       id: args.where?.id?._eq
          //     }),
          //   events: (_, { args, toReference }) =>
          //     toReference({
          //       __typename: 'events',
          //       id: args.where?.id?._eq
          //     }),
          //   member_integrations: (_, { args, toReference }) =>
          //     toReference({
          //       __typename: 'member_integrations',
          //       id: args.where?.id?._eq
          //     }),
          //   member_socials: (_, { args, toReference }) =>
          //     toReference({
          //       __typename: 'member_socials',
          //       id: args.where?.id?._eq
          //     }),
          //   member_types: (_, { args, toReference }) =>
          //     toReference({
          //       __typename: 'members_types',
          //       id: args.where?.id?._eq
          //     }),
          //   member_values: (_, { args, toReference }) =>
          //     toReference({
          //       __typename: 'member_values',
          //       id: args.where?.id?._eq
          //     }),
          members: (_, { args, toReference }) =>
            toReference({
              __typename: 'members',
              id: args.where?.id?._eq
            })
          //   payments: (_, { args, toReference }) =>
          //     toReference({
          //       __typename: 'payments',
          //       id: args.where?.id?._eq
          //     }),
          //   questions: (_, { args, toReference }) =>
          //     toReference({
          //       __typename: 'questions',
          //       id: args.where?.id?._eq
          //     }),
          //   ranked_questions: (_, { args, toReference }) =>
          //     toReference({
          //       __typename: 'ranked_questions',
          //       id: args.where?.id?._eq
          //     }),
          //   supporters: (_, { args, toReference }) =>
          //     toReference({
          //       __typename: 'supporters',
          //       id: args.where?.id?._eq
          //     }),
          // users: (_, { args, toReference }) =>
          //   toReference({
          //     __typename: 'users',
          //     id: args.where?.id?._eq
          //   })
        }
      }
    }
  }),
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
      <StoreProvider store={store}>
        <IconContext.Provider value={{ className: 'react-icon' }}>
          <BrowserRouter>{children}</BrowserRouter>
        </IconContext.Provider>
      </StoreProvider>
    </ApolloProvider>
  </ClientContext.Provider>
);

export default AppProvider;
