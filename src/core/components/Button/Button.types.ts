import { ButtonHTMLAttributes } from 'react';

export interface ButtonProps
  extends Partial<ButtonHTMLAttributes<HTMLButtonElement>> {
  href?: string;
  fill?: boolean;
  loading?: boolean;
  loadingText?: string;
  large?: boolean;
}

export interface PrimaryButtonProps extends ButtonProps {
  green?: boolean;
}
