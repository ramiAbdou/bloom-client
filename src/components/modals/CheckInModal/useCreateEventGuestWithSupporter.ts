/* eslint-disable camelcase */

import { communityIdVar, eventIdVar } from 'src/App.reactive';

import {
  ApolloCache,
  DocumentNode,
  gql,
  Reference,
  useMutation
} from '@apollo/client';
import {
  OnFormSubmitArgs,
  OnFormSubmitFunction
} from '@components/organisms/Form/Form';
import { IEventGuest } from '@util/constants.entities';
import { getGraphQLError } from '@util/util';

interface CreateEventGuestWithSupporterArgs {
  communityId: string;
  eventId: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface CreateEventGuestWithSupporterResult {
  createEventGuest: IEventGuest;
}

const CREATE_EVENT_GUEST_WITH_SUPPORTER: DocumentNode = gql`
  mutation CreateEventGuestWithSupporter(
    $communityId: String!
    $email: String!
    $eventId: String!
    $firstName: String!
    $lastName: String!
  ) {
    createEventGuest(
      object: {
        eventId: $eventId
        supporter: {
          data: {
            communityId: $communityId
            email: $email
            firstName: $firstName
            lastName: $lastName
            user: {
              data: { email: $email }
              on_conflict: {
                constraint: users_email_unique
                update_columns: [updatedAt]
              }
            }
          }
          on_conflict: {
            constraint: supporters_community_id_email_unique
            update_columns: [updatedAt]
          }
        }
      }
    ) {
      createdAt
      id

      event {
        id
      }

      supporter {
        createdAt
        email
        id
        firstName
        lastName

        user {
          email
          id
        }
      }
    }
  }
`;

const useCreateEventGuestWithSupporter = (): OnFormSubmitFunction => {
  const [createEventGuestWithSupporter] = useMutation<
    CreateEventGuestWithSupporterResult,
    CreateEventGuestWithSupporterArgs
  >(CREATE_EVENT_GUEST_WITH_SUPPORTER, {
    update: (
      cache: ApolloCache<CreateEventGuestWithSupporterResult>,
      { data }
    ) => {
      const eventGuest: IEventGuest = data?.createEventGuest;

      cache.modify({
        fields: {
          members: (existingEventGuestRefs: Reference[] = []) => {
            const newEventGuestRef: Reference = cache.writeFragment({
              data: eventGuest,
              fragment: gql`
                fragment NewEventGuest on event_guests {
                  createdAt
                  id
                }
              `
            });

            return [...existingEventGuestRefs, newEventGuestRef];
          }
        },
        id: `events:${eventGuest.event.id}`
      });
    }
  });

  const onSubmit = async ({
    items,
    formDispatch,
    storyDispatch
  }: OnFormSubmitArgs) => {
    const firstName: string = items.FIRST_NAME?.value as string;
    const lastName: string = items.LAST_NAME?.value as string;
    const email: string = items.EMAIL?.value as string;

    try {
      await createEventGuestWithSupporter({
        variables: {
          communityId: communityIdVar(),
          email,
          eventId: eventIdVar(),
          firstName,
          lastName
        }
      });

      storyDispatch({ type: 'GO_FORWARD' });
    } catch (e) {
      formDispatch({ error: getGraphQLError(e), type: 'SET_ERROR' });
    }
  };

  return onSubmit;
};

export default useCreateEventGuestWithSupporter;
