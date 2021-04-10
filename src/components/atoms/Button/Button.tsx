import React, { forwardRef } from 'react';

import Spinner from '@components/atoms/Spinner/Spinner';
import Show from '@components/containers/Show';
import { ShowProps } from '@util/constants';
import { cx, openHref } from '@util/util';

export interface ButtonProps
  extends Partial<React.ButtonHTMLAttributes<HTMLButtonElement>>,
    ShowProps {
  href?: string;
  fill?: boolean;
  fit?: boolean;
  loading?: boolean;
  loadingText?: string;
  large?: boolean;
  openTab?: boolean;
  primary?: boolean;
  red?: boolean;
  secondary?: boolean;
  stopPropagation?: boolean;
  tertiary?: boolean;
}

const ButtonLoadingContainer: React.FC<
  Pick<ButtonProps, 'loading' | 'loadingText' | 'secondary'>
> = React.memo(({ loading, loadingText, secondary }) => (
  <Show show={!!loading}>
    <div className="c-btn-loading-ctr">
      <p>{loadingText}</p>
      <Spinner show dark={secondary} />
    </div>
  </Show>
));

const Button = forwardRef(
  (
    {
      className,
      children,
      disabled,
      fill,
      fit,
      href,
      large,
      loading,
      loadingText,
      onClick,
      openTab = true,
      primary,
      red,
      secondary,
      show,
      stopPropagation,
      type,
      tertiary,
      ...props
    }: ButtonProps,
    ref: React.MutableRefObject<any>
  ) => {
    // If the button is in it's loading state, it should be disabled.
    const showSpinner: boolean = loading && !!loadingText;
    disabled = disabled || showSpinner;

    if (show === false) return null;

    const onButtonClick = (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      if (stopPropagation) event.stopPropagation();
      if (type === 'button') event.preventDefault();
      if (disabled) return;
      if (onClick) onClick(event);
      if (href) openHref(href, openTab);
    };

    const css: string = cx(
      'c-btn ta-center',
      {
        'c-btn--fill': fill,
        'c-btn--fit': fit,
        'c-btn--lg': large,
        'c-btn--primary': primary,
        'c-btn--secondary': secondary,
        'c-btn--secondary--red': red,
        'c-btn--tertiary': tertiary
      },
      className
    );

    return (
      <button
        ref={ref}
        className={css}
        disabled={disabled}
        type={type === 'submit' ? 'submit' : 'button'}
        onClick={onButtonClick}
        {...props}
      >
        <ButtonLoadingContainer
          loading={showSpinner}
          loadingText={loadingText}
          secondary={secondary}
        />

        {!showSpinner && children}
      </button>
    );
  }
);

export default Button;
