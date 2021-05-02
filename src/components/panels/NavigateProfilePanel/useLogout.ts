import { useHistory } from 'react-router-dom';
import { setCommunityId, setMemberId, userIdVar } from 'src/App.reactive';

import {
  DocumentNode,
  gql,
  useApolloClient,
  useMutation
} from '@apollo/client';

const LOGOUT: DocumentNode = gql`
  mutation Logout {
    logout
  }
`;

const useLogout = (): VoidFunction => {
  const [logout] = useMutation<boolean>(LOGOUT);

  const { push } = useHistory();
  const apolloClient = useApolloClient();

  return async () => {
    await logout();

    // Clear the entities that we've ever fetched.
    apolloClient.resetStore();

    setCommunityId(null);
    setMemberId(null);
    userIdVar(null);

    // Reset all of the document colors to Bloom colors.
    const { style } = document.documentElement;

    style.setProperty('--primary', '#f58023');
    style.setProperty('--primary-hex', `245, 128, 35`);
    style.setProperty('--primary-hue', `27`);
    style.setProperty('--gray-1', `hsl(27, 5%, 20%)`);
    style.setProperty('--gray-2', `hsl(27, 5%, 31%)`);
    style.setProperty('--gray-3', `hsl(27, 5%, 51%)`);
    style.setProperty('--gray-4', `hsl(27, 5%, 74%)`);
    style.setProperty('--gray-5', `hsl(27, 5%, 88%)`);
    style.setProperty('--gray-6', `hsl(27, 5%, 96%)`);

    push('/login');
  };
};

export default useLogout;
