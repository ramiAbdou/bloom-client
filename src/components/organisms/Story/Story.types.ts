import {
  ChildrenProps,
  ClassNameProps,
  IdProps,
  LoadingProps,
  TitleProps
} from '@constants';

export interface StoryPageBranch
  extends ClassNameProps,
    IdProps,
    LoadingProps,
    TitleProps {
  description?: string;
  iconUrl?: string;
}

export interface StoryPageProps extends ChildrenProps, ClassNameProps {
  branchId?: string;
  branches?: Record<string, StoryPageBranch>;
  disabled?: boolean;
  disableValidation?: boolean;
  id?: string | 'CONFIRMATION';
}
