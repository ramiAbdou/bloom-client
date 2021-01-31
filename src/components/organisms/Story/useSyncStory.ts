import { OnFormSubmitArgs } from '@organisms/Form/Form.types';

/**
 * Updates the Story's items store with the Form's items to save it across
 * multiple pages.
 */
const useSyncStory = () => {
  const onSubmit = async ({ goForward, items, setItems }: OnFormSubmitArgs) => {
    setItems(items);
    goForward();
  };

  return onSubmit;
};

export default useSyncStory;
