/* eslint-disable no-underscore-dangle */
import 'react-datepicker/dist/react-datepicker.css';
import './index.scss';
import '../public/favicon.ico';

import { snakeCase } from 'change-case';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { StoreProvider } from 'easy-peasy';
import { ClientContext, GraphQLClient } from 'graphql-hooks';
import pluralize from 'pluralize';
import React from 'react';
import { IconContext } from 'react-icons';
import { BrowserRouter } from 'react-router-dom';

import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache
} from '@apollo/client';
import {
  IApplication,
  ICommunity,
  ICommunityIntegrations,
  IEvent,
  IEventAttendee,
  IEventGuest,
  IEventWatch,
  IMember,
  IMemberIntegrations,
  IMemberSocials,
  IMemberType,
  IMemberValue,
  IPayment,
  IQuestion,
  IRankedQuestion,
  ISupporter,
  IUser
} from '@core/db/db.entities';
import { store } from '@core/store/Store';
import { APP } from '@util/constants';

// Extend the time-based library for entire app.
day.extend(advancedFormat);
day.extend(timezone);
day.extend(utc);

const client: GraphQLClient = new GraphQLClient({
  fetchOptions: { credentials: 'include' },
  url: `${APP.SERVER_URL}/graphql`
});

/**
 * Resolves the Apollo Client query so that once an entity is fetched, if we
 * query by it's ID, then we'll be able to use our cache store for it.
 */
function resolveReadQuery<T>(entity: new () => T) {
  // All of our entity types start with an I (ex: IMember, IUser, etc).
  const nameWithoutI: string = entity.name.substring(1);

  // To get the GraphQL version of the entity name, we make the name plural
  // and convert to snake case (which automatically converts to lowercase).
  const entityName: string = snakeCase(pluralize(nameWithoutI));

  return (existing, { args, toReference }) => {
    if (args.where?.id) {
      return toReference({
        __typename: entityName,
        id: args.where?.id?._eq
      });
    }

    return existing;
  };
}

const apolloClient = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          applications: resolveReadQuery(IApplication),
          communities: resolveReadQuery(ICommunity),
          community_integrations: resolveReadQuery(ICommunityIntegrations),
          event_attendees: resolveReadQuery(IEventAttendee),
          event_guests: resolveReadQuery(IEventGuest),
          event_watches: resolveReadQuery(IEventWatch),
          events: resolveReadQuery(IEvent),
          member_integrations: resolveReadQuery(IMemberIntegrations),
          member_socials: resolveReadQuery(IMemberSocials),
          member_types: resolveReadQuery(IMemberType),
          member_values: resolveReadQuery(IMemberValue),
          members: resolveReadQuery(IMember),
          payments: resolveReadQuery(IPayment),
          questions: resolveReadQuery(IQuestion),
          ranked_questions: resolveReadQuery(IRankedQuestion),
          supporters: resolveReadQuery(ISupporter),
          users: resolveReadQuery(IUser)
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
