import camelCaseKeys from 'camelcase-keys';
import { snakeCase } from 'change-case';
import day from 'dayjs';

import { DocumentNode, gql } from '@apollo/client';
import { Schema } from '@store/Db/Db.schema';
import { buildArgsString, buildFieldsString } from '../gql.util';

const map = {
  events: Schema.EVENT,
  memberSocials: Schema.MEMBER_SOCIALS,
  members: Schema.MEMBER,
  questions: Schema.QUESTION,
  users: Schema.USER
};

const update = async ({
  client,
  entity,
  updatedFields,
  mergeEntities,
  where
}) => {
  const set = { ...updatedFields, updatedAt: day.utc().format() };
  // Example: '(where: { email: { $eq: "rami@onbloom.co" } })'
  const argsString: string = buildArgsString({ set, where });

  // Example: 'id member { id firstName }'
  const fieldsString: string = buildFieldsString(Object.keys(set));

  // Example: "members", "users"
  const operationString: string = snakeCase(`update_${entity}`);

  const mutation: DocumentNode = gql`
      mutation {
        ${operationString} ${argsString} {
          returning {
            id
            ${fieldsString}
          }
        }
      }
    `;

  const { data, errors } = await client.mutate({ mutation });

  const camelCaseData = camelCaseKeys(
    data ? data[operationString]?.returning : null,
    { deep: true }
  );

  const result = camelCaseData?.length ? camelCaseData[0] : null;

  if (result) mergeEntities({ data: result, schema: map[entity] });

  return { data: result, error: errors?.length && errors[0]?.message };
};

export default update;
