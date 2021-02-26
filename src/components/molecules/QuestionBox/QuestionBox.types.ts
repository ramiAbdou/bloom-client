import { QuestionType, ShowProps, ValueProps } from '@util/constants';

export type QuestionBoxItemHandleNull = 'HIDE_ALL' | 'HIDE_VALUE';

export interface QuestionBoxItemProps extends ShowProps, ValueProps {
  handleNull?: QuestionBoxItemHandleNull;
  title: string;
  type: QuestionType;
}
