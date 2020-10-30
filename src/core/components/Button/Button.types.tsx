/**
 * @fileoverview Types: Button
 * - Controls the interface logic so we can follow DRY and not repeat ourself.
 * @author Rami Abdou
 */

export type ButtonProps = {
  className?: string;
  isLoading?: boolean;
  loadingText?: string;
  onClick?: VoidFunction;
  primaryColor?: string;
  small?: boolean;
  title: string;
};

export type ButtonDisabledProps = { disabled?: boolean };
export type ButtonLoadingProps = { text: string };
