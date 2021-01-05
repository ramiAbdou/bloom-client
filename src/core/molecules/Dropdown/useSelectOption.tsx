import Dropdown from './Dropdown.store';

export default function useSelectOption(option: string) {
  const allFilteredOptions = Dropdown.useStoreState(
    ({ filteredOptions, value }) => {
      return filteredOptions.filter((element1: string) => {
        return !value?.includes(element1);
      });
    }
  );

  const multiple = Dropdown.useStoreState((store) => store.multiple);
  const value = Dropdown.useStoreState((store) => store.value);
  const onUpdate = Dropdown.useStoreState((store) => store.onUpdate);
  const setIsOpen = Dropdown.useStoreActions((store) => store.setIsOpen);

  const setSearchString = Dropdown.useStoreActions(
    (store) => store.setSearchString
  );

  const selectOption = () => {
    const wasNonePreviouslySelected = value?.some((element) =>
      ['None', 'None of the Above', 'N/A'].includes(element)
    );

    const isNoneSelected = ['None', 'None of the Above', 'N/A'].includes(
      option
    );

    const result =
      !multiple || wasNonePreviouslySelected || isNoneSelected
        ? [option]
        : [...value, option];

    onUpdate(result);
    setSearchString('');

    const updatedOptions = allFilteredOptions.filter(
      (opt: string) => !result?.includes(opt)
    );

    if (
      !multiple ||
      isNoneSelected ||
      !updatedOptions.length ||
      (updatedOptions.length === 1 &&
        ['None', 'None of the Above', 'N/A'].includes(updatedOptions[0]))
    ) {
      setIsOpen(false);
    }
  };

  return selectOption;
}
