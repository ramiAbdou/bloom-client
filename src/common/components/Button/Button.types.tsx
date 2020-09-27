/**
 * @fileoverview Types: Button
 * - Controls the interface logic so we can follow DRY and not repeat ourself.
 * @author Rami Abdou
 */

type ButtonProps = {
  className?: string;
  onClick?: VoidFunction;
  title?: string;
};

type ButtonDisabledProps = { disabled?: boolean };

export interface PrimaryButtonProps extends ButtonProps, ButtonDisabledProps {}
