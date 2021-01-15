import { ChildrenProps, ValueProps } from '@constants';

export interface RadioOptionProps extends ChildrenProps {
  checked?: boolean;
  description?: string;
  label: string;
  onSelect?: (value: any) => any;
  name?: string;
}

export interface RadioProps
  extends Pick<RadioOptionProps, 'name' | 'onSelect'>,
    ValueProps {
  card?: boolean;
  options: Partial<RadioOptionProps>[];
}
