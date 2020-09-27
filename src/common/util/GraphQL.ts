/**
 * @fileoverview Utility: GraphQL
 * - Base class for fetching/mutating capabitlies with GraphQL to the Bloom API.
 * @author Rami Abdou
 */

import axios, { AxiosRequestConfig } from 'axios';

import { APP } from '@constants';

export default class GraphQL {
  readonly options: AxiosRequestConfig = {
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    method: 'POST',
    url: `${APP.SERVER_URL}/graphql`
  };

  mutation = async (query: string): Promise<any> => {
    const { data } = await axios({
      ...this.options,
      data: { query: `mutation { ${query} }` }
    });

    const namespace = this.namespace(query);
    return data.data && data.data[`${namespace}`];
  };

  query = async (query: string): Promise<any> => {
    const { data } = await axios({
      ...this.options,
      data: { query: `{ ${query} }` }
    });

    const namespace = this.namespace(query);
    return data.data[`${namespace}`];
  };

  /**
   * Returns the namespace of the query. This means the top level function
   * that is called in the GraphQL query.
   *
   * Precondition: There is at least a space, open parenthesis, or opening
   * curly brace in the query.
   *
   * @example users { fullName } --> users
   * @example community { latestBatch name } --> community
   */
  private namespace = (query: string) => {
    const startIndex = query.indexOf(query.match(/[a-zA-Z]/)[0]);
    const lastIndex = query.length - 1;
    let index = lastIndex;

    const spaceIndex = query.indexOf(' ', startIndex);
    const parenthesisIndex = query.indexOf('(', startIndex);
    const curlyIndex = query.indexOf('{', startIndex);

    if (spaceIndex > 0 && spaceIndex < index) index = spaceIndex;
    if (parenthesisIndex > 0 && parenthesisIndex < index)
      index = parenthesisIndex;
    if (curlyIndex > 0 && curlyIndex < index) index = curlyIndex;

    return query.substring(startIndex, index);
  };
}
