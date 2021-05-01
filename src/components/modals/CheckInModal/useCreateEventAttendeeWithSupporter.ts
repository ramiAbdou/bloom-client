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
import { IEventAttendee } from '@util/constants.entities';
import { getGraphQLError, openHref } from '@util/util';

interface CreateEventAttendeeWithSupporterArgs {
  communityId: string;
  eventId: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface CreateEventAttendeeWithSupporterResult {
  createEventAttendee: IEventAttendee;
}

const CREATE_EVENT_ATTENDEE_WITH_SUPPORTER: DocumentNode = gql`
  mutation CreateEventAttendeeWithSupporter(
    $communityId: String!
    $email: String!
    $eventId: String!
    $firstName: String!
    $lastName: String!
  ) {
    createEventAttendee(
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
        videoUrl
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

const useCreateEventAttendeeWithSupporter = (): OnFormSubmitFunction => {
  const [createEventAttendeeWithSupporter] = useMutation<
    CreateEventAttendeeWithSupporterResult,
    CreateEventAttendeeWithSupporterArgs
  >(CREATE_EVENT_ATTENDEE_WITH_SUPPORTER, {
    update: (
      cache: ApolloCache<CreateEventAttendeeWithSupporterResult>,
      { data }
    ) => {
      const eventAttendee: IEventAttendee = data?.createEventAttendee;

      cache.modify({
        fields: {
          members: (existingEventAttendeeRefs: Reference[] = []) => {
            const newEventAttendeeRef: Reference = cache.writeFragment({
              data: eventAttendee,
              fragment: gql`
                fragment NewEventAttendee on event_attendees {
                  createdAt
                  id
                }
              `
            });

            return [...existingEventAttendeeRefs, newEventAttendeeRef];
          }
        },
        id: `events:${eventAttendee.event.id}`
      });
    }
  });

  const onSubmit = async ({
    formDispatch,
    storyDispatch,
    items
  }: OnFormSubmitArgs) => {
    const firstName: string = items.FIRST_NAME?.value as string;
    const lastName: string = items.LAST_NAME?.value as string;
    const email: string = items.EMAIL?.value as string;

    try {
      const { data } = await createEventAttendeeWithSupporter({
        variables: {
          communityId: communityIdVar(),
          email,
          eventId: eventIdVar(),
          firstName,
          lastName
        }
      });

      const eventAttendee: IEventAttendee = data?.createEventAttendee;
      openHref(eventAttendee.event.videoUrl);

      storyDispatch({
        branchId: 'ATTENDEE_CONFIRMATION',
        pageId: 'CONFIRMATION',
        type: 'SET_CURRENT_PAGE'
      });

      storyDispatch({ type: 'GO_FORWARD' });
    } catch (e) {
      formDispatch({ error: getGraphQLError(e), type: 'SET_ERROR' });
    }
  };

  return onSubmit;
};

export default useCreateEventAttendeeWithSupporter;
