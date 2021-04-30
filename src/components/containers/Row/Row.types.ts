import { Breakpoint } from '@hooks/useBreakpoint';
import { BaseProps, Spacing } from '@util/constants';

type RowAlign = 'baseline' | 'center' | 'end' | 'start';

type RowJustifyContent = 'center' | 'sb';

export interface RowProps extends BaseProps {
  align?: RowAlign;
  equal?: boolean;
  fillBreakpoint?: Breakpoint;
  gap?: Spacing;
  justify?: RowJustifyContent;
  noMarginBottom?: boolean;
  spacing?: Spacing;
  wrap?: boolean;
  style?: React.CSSProperties;
}
