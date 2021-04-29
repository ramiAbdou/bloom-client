import { FormItemData } from '@components/organisms/Form/Form.types';
import {
  ClassNameProps,
  IdProps,
  LoadingProps,
  ShowProps,
  TitleProps
} from '@util/constants';

export interface StoryPageBranch extends IdProps, LoadingProps, TitleProps {
  description?: string;
  iconUrl?: string;
}

export interface StoryPageProps
  extends ClassNameProps,
    ShowProps,
    StoryPageBranch {
  branchId?: string;
  branches?: Record<string, StoryPageBranch>;
  confirmation?: boolean;
  disabled?: boolean;
  id?: string | 'CONFIRMATION';
}

// new stuff

export interface StoryState {
  items: Record<string, FormItemData>;
  pageId: string;
  pages: StoryPageProps[];
}

export type StoryAction =
  | { type: 'GO_FORWARD' }
  | {
      type: 'SET_CURRENT_PAGE';
      branchId: string;
      pageId: string;
    }
  | { type: 'SET_PAGE'; page: Partial<StoryPageProps> }
  | { type: 'SET_PAGE_DISABLED'; disabled: boolean; pageId: string };
