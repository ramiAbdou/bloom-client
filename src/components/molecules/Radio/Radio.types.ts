import { ValueProps } from '@util/constants';

export interface RadioOptionProps {
  checked?: boolean;
  description?: string;
  label: string;
  onSelect?: (value: unknown) => unknown;
  name?: string;
}

export interface RadioProps
  extends Pick<RadioOptionProps, 'name' | 'onSelect'>,
    ValueProps {
  card?: boolean;
  options: Partial<RadioOptionProps>[];
}
