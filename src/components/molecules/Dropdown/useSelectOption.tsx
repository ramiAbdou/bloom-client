import { useDropdown } from './Dropdown.state';

const useSelectOption = (option: string): VoidFunction => {
  const [
    { filteredValues, onSelect, options, selectedValues },
    dropdownDispatch
  ] = useDropdown();

  const selectOption = () => {
    const wasNonePreviouslySelected: boolean = selectedValues.some((element) =>
      ['None', 'None of the Above', 'N/A'].includes(element)
    );

    const isNoneSelected: boolean = [
      'None',
      'None of the Above',
      'N/A'
    ].includes(option);

    let updatedValue: string | string[];

    if (options.multiple) {
      if (wasNonePreviouslySelected || isNoneSelected) updatedValue = [option];
      else updatedValue = [...selectedValues, option];
    } else updatedValue = option;

    onSelect(updatedValue);
    dropdownDispatch({ searchString: '', type: 'SET_SEARCH_STRING' });

    const updatedOptions = filteredValues.filter((element: string) => {
      if (Array.isArray(updatedValue)) return !updatedValue?.includes(element);
      return element === updatedValue;
    });

    if (
      !options.multiple ||
      isNoneSelected ||
      !updatedOptions.length ||
      (updatedOptions.length === 1 &&
        ['None', 'None of the Above', 'N/A'].includes(updatedOptions[0]))
    ) {
      dropdownDispatch({ open: false, type: 'SET_OPEN' });
    }
  };

  return selectOption;
};

export default useSelectOption;
