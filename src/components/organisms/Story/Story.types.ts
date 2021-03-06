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
  confirmationClose?: boolean;
  disabled?: boolean;
  id?: string | 'CONFIRMATION';
}
