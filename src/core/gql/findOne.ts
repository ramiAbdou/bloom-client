import camelCaseKeys from 'camelcase-keys';
import { snakeCase } from 'change-case';

import { DocumentNode, gql } from '@apollo/client';
import { buildArgsString, buildFieldsString } from './gql.util';

const findOne = async ({ client, entity, fields, where }) => {
  const argsString: string = buildArgsString({ where });
  const fieldsString: string = buildFieldsString(fields);
  const operationString: string = snakeCase(entity);

  const query: DocumentNode = gql`
      query {
        ${operationString} ${argsString} {
          ${fieldsString}
        }
      }
    `;

  console.log(`
    query {
      ${operationString} ${argsString} {
        ${fieldsString}
      }
    }
  `);

  const { data } = await client.query({ query });

  const camelCaseData = camelCaseKeys(data ? data[operationString] : null, {
    deep: true
  });

  const result = camelCaseData?.length ? camelCaseData[0] : null;

  // if (result) mergeEntities({ data: camelCaseData, schema: Schema.USER });

  return result;
};

export default findOne;
