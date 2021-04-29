export interface DropdownOptions {
  attribute?: boolean;
  multiple?: boolean; // True if the dropdown is a multiple select.
}

// ## new stuff

export interface DropdownInitialState {
  onSelect?: (value: string | string[]) => void;
  options?: DropdownOptions;
  selectedValues: string[];
  values: string[];
}

export interface DropdownState {
  filteredValues: string[];
  onSelect?: (value: string | string[]) => void;
  open: boolean;
  options: DropdownOptions;
  searchString: string;
  selectedValues: string[];
  values: string[];
  width: number;
}

export type DropdownAction =
  | { type: 'SET_OPEN'; open: boolean }
  | { type: 'SET_SEARCH_STRING'; searchString: string }
  | { type: 'SET_SELECTED_VALUES'; selectedValues: string[] }
  | { type: 'SET_VALUES'; values: string[] }
  | { type: 'SET_WIDTH'; width: number };
