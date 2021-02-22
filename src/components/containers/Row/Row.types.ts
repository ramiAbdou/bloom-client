import { BaseProps, Spacing } from '@constants';
import { Breakpoint } from '@hooks/useBreakpoint';

type RowAlign = 'baseline' | 'center' | 'end' | 'start';
type RowJustifyContent = 'center' | 'sb';

export interface RowProps extends BaseProps {
  align?: RowAlign;
  equal?: boolean;
  fillBreakpoint?: Breakpoint;
  gap?: Spacing;
  justify?: RowJustifyContent;
  spacing?: Spacing;
  wrap?: boolean;
}
