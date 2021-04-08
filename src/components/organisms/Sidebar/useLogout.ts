import { useHistory } from 'react-router-dom';

import { useApolloClient } from '@apollo/client';
import useBloomMutation from '@gql/useBloomMutation';
import { MutationEvent } from '@util/constants.events';

const useLogout = (): VoidFunction => {
  const { push } = useHistory();
  const apolloClient = useApolloClient();

  const [logout] = useBloomMutation<boolean>({
    operation: MutationEvent.LOGOUT
  });

  return async () => {
    const { error } = await logout();

    if (error) return;

    // Clear the entities that we've ever fetched.
    apolloClient.clearStore();

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
