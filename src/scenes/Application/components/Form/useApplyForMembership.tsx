import { useMutation } from 'graphql-hooks';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import FormStore, { parseValue } from '@components/Form/Form.store';
import { useStoreState } from '@store/Store';
import { getGraphQLError } from '../../../../util/util';
import { APPLY_FOR_MEMBERSHIP } from '../../Application.gql';
import Application from '../../Application.store';

export default (): VoidFunction => {
  const name = useStoreState(({ db }) => db.community?.encodedUrlName);
  const storedEmail = Application.useStoreState((store) => store.email);
  const setEmail = Application.useStoreActions((store) => store.setEmail);

  const dataToSubmit = FormStore.useStoreState(({ items }) =>
    items.map(({ id, value }) => ({ questionId: id, value: parseValue(value) }))
  );

  const email = FormStore.useStoreState(
    ({ items }) =>
      items.filter(({ category }) => category === 'EMAIL')[0]?.value
  );

  const setIsLoading = FormStore.useStoreActions((store) => store.setIsLoading);

  const setErrorMessage = FormStore.useStoreActions(
    (store) => store.setErrorMessage
  );

  const { push } = useHistory();

  useEffect(() => {
    if (email !== storedEmail) setEmail(email);
  }, [email]);

  const [applyForMembership, result] = useMutation(APPLY_FOR_MEMBERSHIP, {
    variables: { data: dataToSubmit, email, encodedUrlName: name }
  });

  useEffect(() => {
    const { error, data, loading } = result;

    // Handle the error message by setting the Form's error message.
    const errorMessage = getGraphQLError(error);
    if (errorMessage) setErrorMessage(errorMessage);

    // Handle the loading state of the Form.
    setIsLoading(loading);

    if (data && !error && !loading) push(`/${name}/apply/confirmation`);
  }, [result]);

  return () => applyForMembership();
};
