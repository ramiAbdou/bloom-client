import camelCaseKeys from 'camelcase-keys';
import { snakeCase } from 'change-case';

import { DocumentNode, gql } from '@apollo/client';
import { MutateResult, MutationArgs } from './gql.types';
import { buildArgsString, buildFieldsString } from './gql.util';

async function mutate<T>({
  client,
  fields,
  operation,
  mergeEntities,
  mutationName: mutationNameString,
  schema,
  set,
  where
}: MutationArgs): Promise<MutateResult<T>> {
  const argsString: string = buildArgsString({ set, where });
  const fieldsString: string = buildFieldsString(fields);
  const operationString: string = snakeCase(operation);

  const mutation: DocumentNode = gql`
      mutation ${mutationNameString} {
        ${operationString} ${argsString} {
          returning {
            ${fieldsString}
          }
        }
      }
    `;

  const { data, errors } = await client.mutate({ mutation });

  const camelCaseData: T = camelCaseKeys(
    data ? data[operationString]?.returning : null,
    { deep: true }
  );

  if (camelCaseData && schema) mergeEntities({ data: camelCaseData, schema });

  return { data: camelCaseData, error: errors?.length && errors[0]?.message };
}

export default mutate;
