/**
 * @fileoverview GraphQL: User

 */

import { mutation } from 'gql-query-builder';

export const LOGOUT = mutation({ operation: 'logout' }).query;
