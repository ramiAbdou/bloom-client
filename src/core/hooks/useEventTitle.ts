import { ApolloClient, gql, useApolloClient } from '@apollo/client';
import { IEvent } from '@util/constants.entities';

const useEventTitle = (eventId: string): string => {
  const apolloClient: ApolloClient<unknown> = useApolloClient();

  const event: IEvent = apolloClient.cache.readFragment({
    fragment: gql`
      fragment EventTitle on events {
        title
      }
    `,
    id: `events:${eventId}`
  });

  return event?.title;
};

export default useEventTitle;
