import { OnFormSubmitArgs } from '@organisms/Form/Form.types';
import StoryStore from './Story.store';

/**
 * Updates the Story's items store with the Form's items to save it across
 * multiple pages.
 */
const useSyncStory = () => {
  const goForward = StoryStore.useStoreActions((store) => store.goForward);
  const setItems = StoryStore.useStoreActions((store) => store.setItems);

  const onSubmit = async ({ items }: OnFormSubmitArgs) => {
    setItems(items);
    goForward();
  };

  return onSubmit;
};

export default useSyncStory;
