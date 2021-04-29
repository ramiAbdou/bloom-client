import { useReducer } from 'react';
import { createContainer } from 'react-tracked';

import {
  DropdownAction,
  DropdownInitialState,
  DropdownState
} from './Dropdown.types';

const setOpen = (state: DropdownState, open: boolean) => {
  return { ...state, open };
};

const setSearchString = (
  state: DropdownState,
  searchString: string
): DropdownState => {
  const lowerCaseSearchString: string = searchString.toLowerCase();

  const filteredValues: string[] = state.values.filter((value: string) => {
    const lowerCaseValue: string = value?.toLowerCase();
    return lowerCaseValue.startsWith(lowerCaseSearchString);
  });

  return { ...state, filteredValues, searchString };
};

const setSelectedValues = (state: DropdownState, selectedValues: string[]) => {
  return { ...state, selectedValues };
};

const setValues = (state: DropdownState, values: string[]) => {
  return { ...state, filteredValues: values, values };
};

const setWidth = (state: DropdownState, width: number) => {
  return { ...state, width };
};

const dropdownReducer = (
  state: DropdownState,
  action: DropdownAction
): DropdownState => {
  switch (action.type) {
    case 'SET_OPEN':
      return setOpen(state, action.open);

    case 'SET_SEARCH_STRING':
      return setSearchString(state, action.searchString);

    case 'SET_SELECTED_VALUES':
      return setSelectedValues(state, action.selectedValues);

    case 'SET_VALUES':
      return setValues(state, action.values);

    case 'SET_WIDTH':
      return setWidth(state, action.width);

    default:
      return state;
  }
};

const useDropdownValue = ({
  onSelect,
  options,
  selectedValues,
  values
}: DropdownInitialState) => {
  const state: DropdownState = {
    filteredValues: values ?? [],
    onSelect,
    open: false,
    options: { attribute: true, multiple: false, ...options },
    searchString: '',
    selectedValues: selectedValues ?? [],
    values: values ?? [],
    width: 0
  };

  return useReducer(dropdownReducer, state);
};

export const {
  Provider: DropdownProvider,
  useTracked: useDropdown,
  useSelector: useDropdownSelector
} = createContainer(useDropdownValue);
