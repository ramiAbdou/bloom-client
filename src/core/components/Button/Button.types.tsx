/**
 * @fileoverview Types: Button
 * - Controls the interface logic so we can follow DRY and not repeat ourself.
 * @author Rami Abdou
 */

export type ButtonProps = {
  className?: string;
  disabled?: boolean;
  onClick?: VoidFunction;
  title?: string;
};

export type ButtonLargeProps = { large?: boolean };
export type ButtonLoadingProps = { isLoading?: boolean; loadingText?: string };
