import {
  Action,
  action,
  Computed,
  computed,
  createContextStore
} from 'easy-peasy';
import validator from 'validator';

import {
  FormItemData,
  FormNavigationPageProps,
  FormOptions
} from './Form.types';
import { validateItem, validateItems } from './Form.util';

type GetItemArgs = Pick<FormItemData, 'category' | 'id' | 'title'>;
interface UpdateItemArgs extends GetItemArgs {
  value: any;
}

export type FormModel = {
  errorMessage: string;
  getItem: Computed<FormModel, (args: GetItemArgs) => FormItemData, {}>;
  goToNextPage: Action<FormModel>;
  isCompleted: Computed<FormModel, boolean>;
  isLoading: boolean;
  isPageCompleted: Computed<FormModel, boolean>;
  isShowingErrors: boolean;
  items: FormItemData[];
  options: FormOptions;
  pageId: string;
  pages: FormNavigationPageProps[];
  removeItems: Action<FormModel, Partial<FormItemData>[]>;
  setErrorMessage: Action<FormModel, string>;
  setItem: Action<FormModel, Partial<FormItemData>>;
  setItemErrorMessages: Action<FormModel, FormItemData[]>;
  setIsLoading: Action<FormModel, boolean>;
  setPageDisabled: Action<
    FormModel,
    Pick<FormNavigationPageProps, 'disabled' | 'id'>
  >;
  setPageId: Action<FormModel, string>;
  setPages: Action<FormModel, FormNavigationPageProps[]>;
  updateItem: Action<FormModel, UpdateItemArgs>;
};

export const formModel: FormModel = {
  // Represents the error message for the entire Form, not any one element.
  errorMessage: null,

  getItem: computed(({ items }) => ({ category, id, title }: GetItemArgs) => {
    if (id) return items.find((item) => item.id === id);
    if (title) return items.find((item) => item.title === title);
    return items.find((item) => item.category === category);
  }),

  goToNextPage: action(({ pages, pageId, ...state }) => {
    const nextIndex = pages.findIndex((page) => page.id === pageId) + 1;
    const { id } = pages[nextIndex];
    window.scrollTo({ top: 0 });
    return { ...state, pageId: id, pages };
  }),

  /**
   * Returns true if the form has been completed. This is the case if:
   * - The form has validation turned off (only for forms without ANY items).
   * - All items are validated. An item is validated if:
   *  - Item is not required.
   *  - Item is required and there is non-empty value.
   */
  isCompleted: computed(({ items, options }) => {
    const { disableValidation, validateOnSubmit } = options ?? {};

    if (disableValidation) return true;
    if (!items?.length) return false;
    if (items.every(({ value }) => !value)) return false;
    if (validateOnSubmit) return true;

    return items.every(({ required, value, validate }: FormItemData) => {
      if (required && !value) return false;
      if (validateOnSubmit) return true;
      if (validate === 'IS_EMAIL') return validator.isEmail(value);
      if (validate === 'IS_URL') return validator.isURL(value);
      return true;
    });
  }),

  // Used to ensure that the submit button is disabled.
  isLoading: false,

  isPageCompleted: computed(({ items, pageId }) => {
    const pageItems = items?.filter((item) => item.page === pageId);
    if (!pageItems?.length) return true;

    return validateItems(pageItems)?.every(({ errorMessage }) => {
      return !errorMessage;
    });
  }),

  isShowingErrors: false,

  items: [],

  options: null,

  pageId: null,

  pages: [],

  removeItems: action(({ items, ...state }, itemsToRemove) => {
    items = items.filter((element) => {
      return itemsToRemove.some(
        (item) =>
          (item.category && element.category === item.category) ||
          (item.id && element.id === item.id) ||
          (item.title && element.title === item.title)
      );
    });

    return { ...state, items };
  }),

  setErrorMessage: action((state, errorMessage: string) => ({
    ...state,
    errorMessage
  })),

  // Typically set when a form is submitting an async function.
  setIsLoading: action((state, isLoading: boolean) => ({
    ...state,
    isLoading
  })),

  setItem: action(({ items, ...state }, item: Partial<FormItemData>) => {
    const isFound = items.find(
      (element) =>
        (item.category && element.category === item.category) ||
        (item.id && element.id === item.id) ||
        (item.title && element.title === item.title)
    );

    return {
      ...state,
      items: isFound ? items : [...items, item]
    };
  }),

  setItemErrorMessages: action((state, items: FormItemData[]) => ({
    ...state,
    items
  })),

  setPageDisabled: action(
    (
      { pages, ...state },
      { disabled, id }: Pick<FormNavigationPageProps, 'disabled' | 'id'>
    ) => {
      const index = pages.findIndex((page) => page.id === id);
      pages[index].disabled = disabled;
      return { ...state, pages };
    }
  ),

  setPageId: action((state, pageId: string) => {
    window.scrollTo({ top: 0 });
    return { ...state, pageId };
  }),

  setPages: action((state, pages) => ({
    ...state,
    pageId: pages[0]?.id,
    pages
  })),

  updateItem: action(
    (state, { category, id, title, value }: UpdateItemArgs) => {
      const { items, options } = state;
      const { validateOnSubmit } = options ?? {};

      let index: number;

      if (id) index = items.findIndex((item) => item.id === id);
      else if (title) index = items.findIndex((item) => item.title === title);
      else if (category) {
        index = items.findIndex((item) => item.category === category);
      }

      const updatedItem = { ...items[index], value };

      items[index] =
        validateOnSubmit && !updatedItem.errorMessage
          ? updatedItem
          : validateItem(updatedItem);

      return { ...state, items, validateOnSubmit };
    }
  )
};

const FormStore = createContextStore<FormModel>(
  ({ options, pages, ...runtimeModel }: FormModel) => ({
    ...runtimeModel,
    options,
    pageId: pages?.length && pages[0]?.id,
    pages: pages?.map((page, i) => ({ ...page, disabled: !!i }))
  }),
  { disableImmer: true }
);

export default FormStore;
