import { useMemo } from 'react';

import { ApolloClient, useApolloClient } from '@apollo/client';
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
} from '@db/db.entities';
import GQLUtility from './GQLUtility';

// import { IEntities } from '../db/db.types';
// export type GQL = Record<keyof IEntities, GQLUtility>;

const useGQL = () => {
  const client: ApolloClient<any> = useApolloClient();

  const gql = useMemo(() => {
    return {
      applications: new GQLUtility(IApplication, client),
      communities: new GQLUtility(ICommunity, client),
      communityIntegrations: new GQLUtility(ICommunityIntegrations, client),
      eventAttendees: new GQLUtility(IEventAttendee, client),
      eventGuests: new GQLUtility(IEventGuest, client),
      eventWatches: new GQLUtility(IEventWatch, client),
      events: new GQLUtility(IEvent, client),
      memberIntegrations: new GQLUtility(IMemberIntegrations, client),
      memberSocials: new GQLUtility(IMemberSocials, client),
      memberTypes: new GQLUtility(IMemberType, client),
      memberValues: new GQLUtility(IMemberValue, client),
      members: new GQLUtility(IMember, client),
      payments: new GQLUtility(IPayment, client),
      questions: new GQLUtility(IQuestion, client),
      rankedQuestions: new GQLUtility(IRankedQuestion, client),
      supporters: new GQLUtility(ISupporter, client),
      users: new GQLUtility(IUser, client)
    };
  }, []);

  return gql;
};

export default useGQL;
