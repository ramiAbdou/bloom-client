/**
 * @fileoverview Types: Button
 * - Controls the interface logic so we can follow DRY and not repeat ourself.
 * @author Rami Abdou
 */

export type ButtonProps = {
  className?: string;
  onClick?: VoidFunction;
  title?: string;
};

export type ButtonDisabledProps = { disabled?: boolean };
export type ButtonLoadingProps = { isLoading?: boolean; loadingText?: string };
