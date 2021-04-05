import camelCaseKeys from 'camelcase-keys';
import { snakeCase } from 'change-case';
import day from 'dayjs';
import { nanoid } from 'nanoid';

import { DocumentNode, gql } from '@apollo/client';
import { Schema } from '@db/db.entities';
import buildArgsString from './buildArgsString';
import buildFieldsString from './buildFieldsString';

const map = {
  eventGuests: Schema.EVENT_GUEST,
  eventWatches: Schema.EVENT_WATCH,
  events: Schema.EVENT,
  memberSocials: Schema.MEMBER_SOCIALS,
  members: Schema.MEMBER,
  questions: Schema.QUESTION,
  users: Schema.USER
};

const create = async ({ client, fields, entity, body, mergeEntities }) => {
  const object = {
    ...body,
    createdAt: day.utc().format(),
    id: nanoid(),
    updatedAt: day.utc().format()
  };

  // Example: '(where: { email: { $eq: "rami@onbloom.co" } })'
  const argsString: string = buildArgsString({ object });

  // Example: 'id member { id firstName }'
  const fieldsString: string = buildFieldsString(fields);

  // Example: "members", "users"
  const operationString: string = snakeCase(`insert_${entity}_one`);

  const mutation: DocumentNode = gql`
      mutation {
        ${operationString} ${argsString} {
          id
          ${fieldsString}
        }
      }
    `;

  const { data, errors } = await client.mutate({ mutation });

  const result = camelCaseKeys(data ? data[operationString] : null, {
    deep: true
  });

  if (result) mergeEntities({ data: result, schema: map[entity] });

  return { data: result, error: errors?.length && errors[0]?.message };
};

export default create;
