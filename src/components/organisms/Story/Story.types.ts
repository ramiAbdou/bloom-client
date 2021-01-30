import {
  ChildrenProps,
  ClassNameProps,
  IdProps,
  LoadingProps,
  TitleProps
} from '@constants';

export interface StoryPageBranch extends IdProps, LoadingProps, TitleProps {
  description?: string;
  iconUrl?: string;
}

export interface StoryPageProps
  extends ChildrenProps,
    ClassNameProps,
    StoryPageBranch {
  branchId?: string;
  branches?: Record<string, StoryPageBranch>;
  confirmation?: boolean;
  confirmationClose?: boolean;
  disabled?: boolean;
  id?: string | 'CONFIRMATION';
}
