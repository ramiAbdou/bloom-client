/**
 * @fileoverview Hook: useActiveTo
 * @author Rami Abdou
 */

import { useHistory } from 'react-router-dom';

import { useStoreState } from '@store/Store';

export default () => {
  const encodedUrlName = useStoreState(
    ({ community }) => community.encodedUrlName
  );
  const { location } = useHistory();
  const { pathname } = location;

  // The index after the / following the community's name.
  const startIndex =
    pathname.indexOf(`${encodedUrlName}/`) + encodedUrlName.length + 1;

  // If there is another / in the URL then just go up until then. Otherwise,
  // take the entire rest of the string.
  const finalIndex = pathname.includes('/', startIndex)
    ? pathname.lastIndexOf('/')
    : pathname.length;

  return pathname.substring(startIndex, finalIndex);
};
