import { useHistory } from 'react-router-dom';

/**
 * Returns the path (without a backslash) at the very end of the pathname.
 *
 * @example /colorstack/database/members => members
 * @example /onereq/directory => directory
 * @example /me => me
 */
const useFinalPath = (): string => {
  const { pathname } = useHistory().location;
  return pathname.substring(pathname.lastIndexOf('/') + 1);
};

export default useFinalPath;
