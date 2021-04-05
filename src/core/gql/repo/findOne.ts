import camelCaseKeys from 'camelcase-keys';
import { snakeCase } from 'change-case';

import { DocumentNode, gql } from '@apollo/client';
import { Schema } from '@db/db.schema';
import buildArgsString from './buildArgsString';
import buildFieldsString from './buildFieldsString';

const map = { events: Schema.EVENT, users: Schema.USER };

const findOne = async ({ client, entity, fields, mergeEntities, where }) => {
  // Example: '(where: { email: { $eq: "rami@onbloom.co" } })'
  const argsString: string = buildArgsString({ where });

  // Example: 'id member { id firstName }'
  const fieldsString: string = buildFieldsString(fields);

  // Example: "members", "users"
  const operationString: string = snakeCase(entity);

  const query: DocumentNode = gql`
      query {
        ${operationString} ${argsString} {
          ${fieldsString}
        }
      }
    `;

  const { data, errors } = await client.query({ query });

  const camelCaseData = camelCaseKeys(data ? data[operationString] : null, {
    deep: true
  });

  const result = camelCaseData?.length ? camelCaseData[0] : null;

  if (result) mergeEntities({ data: camelCaseData, schema: map[entity] });

  return { data, error: errors?.length && errors[0]?.message };
};

export default findOne;
