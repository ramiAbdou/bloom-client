/**
 * @fileoverview GraphQL: Signup
 * @author Rami Abdou
 */

import { FormData } from '@constants';
import { mutation, query } from '@util/util';

export const getMembershipForm = async (community: string) =>
  query({
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
    operation: 'getCommunity',
    variables: { encodedURLName: { required: true, value: community } }
  });

export const createMembership = async (
  communityId: string,
  data: FormData
): Promise<string> =>
  (
    await mutation({
      fields: [{ user: ['id'] }],
      operation: 'createMembership',
      variables: {
        communityId: { type: 'String!', value: communityId },
        data: { type: '[FormValueInput!]!', value: data }
      }
    })
  ).user.id;
