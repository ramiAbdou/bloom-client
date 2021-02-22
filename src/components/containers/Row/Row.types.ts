import { BaseProps, Spacing } from '@constants';

type RowAlign = 'baseline' | 'center' | 'end' | 'start';
type RowJustifyContent = 'center' | 'sb';

export interface RowProps extends BaseProps {
  align?: RowAlign;
  equal?: boolean;
  gap?: Spacing;
  justify?: RowJustifyContent;
  spacing?: Spacing;
  wrap?: boolean;
}
