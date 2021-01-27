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
import { getFormItem, getFormItemIndex, validateItem } from './Form.util';

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

  getItem: computed(({ items }) => (args: GetItemArgs) => {
    return getFormItem({ ...args, items });
  }),

  goToNextPage: action(({ pages, pageId, ...state }) => {
    window.scrollTo({ top: 0 });
    const nextIndex = pages.findIndex((page) => page.id === pageId) + 1;
    const { id } = pages[nextIndex];
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
    const { disableValidation } = options ?? {};

    if (disableValidation) return true;
    if (!items?.length) return false;
    if (items.every(({ value }) => !value)) return false;

    return items.every(({ required, value, validate }: FormItemData) => {
      if (required && !value) return false;
      if (validate === 'IS_EMAIL') return validator.isEmail(value);
      if (validate === 'IS_URL') return validator.isURL(value);
      return true;
    });
  }),

  // Used to ensure that the submit button is disabled.
  isLoading: false,

  /**
   * Returns true if all items on the page have been validated. Follows all
   * the rules from isCompleted.
   */
  isPageCompleted: computed(({ items, pageId, pages }) => {
    const page: FormNavigationPageProps = pages.find((p) => p.id === pageId);
    if (page?.disableValidation) return true;

    const validatedPageItems = items
      ?.filter((item) => item.pageId === pageId)
      ?.map(validateItem);

    return (
      validatedPageItems?.length &&
      validatedPageItems.every(({ errorMessage }) => {
        return !errorMessage;
      })
    );
  }),

  isShowingErrors: false,

  items: [],

  options: null,

  pageId: null,

  pages: [],

  /**
   * Removes all the items from the array of items.
   */
  removeItems: action(({ items, ...state }, itemsToRemove) => {
    items = items.filter((item: FormItemData) => {
      const isItemInRemoveList = !!getFormItem({
        items: itemsToRemove,
        ...item
      });

      return !isItemInRemoveList;
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
    const isFound = getFormItem({ items, ...item });

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
      const index = pages.findIndex(
        (page) => page.aliases?.includes(id) || page.id === id
      );

      pages[index].disabled = disabled;
      return { ...state, pages };
    }
  ),

  setPageId: action((state, pageId: string) => {
    window.scrollTo({ top: 0 });
    return { ...state, pageId };
  }),

  setPages: action(({ pageId, ...state }, pages) => ({
    ...state,
    pageId: pageId ?? pages[0]?.id,
    pages: pages.map((page, i: number) => ({ ...page, disabled: !!i }))
  })),

  /**
   * Updates the form item value based on the query arguments.
   *
   * Also validates the item in the process in case there is an error. In
   * effect, creates a "dirty" form value validation process.
   */
  updateItem: action(
    ({ items, ...state }, { value, ...args }: UpdateItemArgs) => {
      const index: number = getFormItemIndex({ items, ...args });
      const updatedItem = { ...items[index], value };
      items[index] = validateItem(updatedItem);
      return { ...state, items };
    }
  )
};

const FormStore = createContextStore<FormModel>(
  ({ options, ...runtimeModel }: FormModel) => ({
    ...runtimeModel,
    options
  }),
  { disableImmer: true }
);

export default FormStore;
