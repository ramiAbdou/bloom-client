/**
 * @fileoverview GraphQL: User
 * @author Rami Abdou
 */

import { mutation } from 'gql-query-builder';

export const LOGOUT = mutation({ operation: 'logout' }).query;
