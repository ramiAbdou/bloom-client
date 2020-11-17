/**
 * @fileoverview Types: Button
 * - Controls the interface logic so we can follow DRY and not repeat ourself.
 * @author Rami Abdou
 */

export type ButtonProps = {
  className?: string;
  disabled?: boolean;
  href?: string;
  fill?: boolean;
  isLoading?: boolean;
  green?: boolean;
  loadingText?: string;
  large?: boolean;
  onClick?: VoidFunction;
  title?: string;
};

export type ButtonLoadingProps = { isLoading?: boolean; loadingText?: string };
