/**
 * @fileoverview GraphQL: Signup
 * @author Rami Abdou
 */

import { mutation, query } from 'gql-query-builder';

import { FormData } from '@constants';
import { gql } from '@util/util';

export const getMembershipForm = async (community: string) => {
  const operation = 'getCommunity';
  const options = query({
    fields: [
      'id',
      {
        membershipForm: [
          'title',
          'description',
          {
            questions: [
              'category',
              'description',
              'required',
              'options',
              'title',
              'type'
            ]
          }
        ]
      }
    ],
    operation,
    variables: { encodedURLName: { required: true, value: community } }
  });

  return (await gql(options))[operation];
};

export const createMembership = async (
  communityId: string,
  data: FormData
): Promise<string> => {
  const operation = 'createMembership';
  const options = mutation({
    fields: ['id'],
    operation,
    variables: {
      communityId: { type: 'String!', value: communityId },
      data: { type: '[FormValueInput!]!', value: data }
    }
  });

  return (await gql(options)).id;
};
