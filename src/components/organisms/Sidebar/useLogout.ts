import { useHistory } from 'react-router-dom';

import useMutation from '@hooks/useMutation';
import { useStoreActions } from '@store/Store';
import { MutationEvent } from '@util/constants.events';

const useLogout = (): VoidFunction => {
  const clearEntities = useStoreActions(({ db }) => db.clearEntities);
  const { push } = useHistory();
  const [logout] = useMutation<boolean>({ operation: MutationEvent.LOGOUT });

  return async () => {
    const { error } = await logout();

    if (error) return;

    // Clear the entities that we've ever fetched.
    clearEntities();

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
