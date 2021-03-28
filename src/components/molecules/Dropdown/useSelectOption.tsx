import Dropdown from './Dropdown.store';
import { DropdownValue } from './Dropdown.types';

const useSelectOption = (option: string): VoidFunction => {
  const filteredValues = Dropdown.useStoreState((state) => {
    return state.filteredValues;
  });

  const multiple = Dropdown.useStoreState((state) => {
    return state.options.multiple;
  });

  const value = Dropdown.useStoreState((state) => {
    return state.value;
  });

  const onSelect = Dropdown.useStoreState((state) => {
    return state.onSelect;
  });

  const setIsOpen = Dropdown.useStoreActions((state) => {
    return state.setIsOpen;
  });

  const setSearchString = Dropdown.useStoreActions((state) => {
    return state.setSearchString;
  });

  const selectOption = () => {
    let wasNonePreviouslySelected: boolean;

    if (Array.isArray(value)) {
      wasNonePreviouslySelected = (value as string[])?.some((element) => {
        return ['None', 'None of the Above', 'N/A'].includes(element);
      });
    }

    const isNoneSelected = ['None', 'None of the Above', 'N/A'].includes(
      option
    );

    let updatedValue: DropdownValue;

    if (multiple) {
      if (wasNonePreviouslySelected || isNoneSelected) updatedValue = [option];
      else updatedValue = [...(value as string[]), option];
    } else updatedValue = option;

    onSelect(updatedValue);
    setSearchString('');

    const updatedOptions = filteredValues.filter((element: string) => {
      if (Array.isArray(updatedValue)) return !updatedValue?.includes(element);
      return element === updatedValue;
    });

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
};

export default useSelectOption;
