import React, { forwardRef } from 'react';

import Spinner from '@atoms/Spinner/Spinner';
import { ShowProps } from '@constants';
import Show from '@containers/Show';
import { cx } from '@util/util';

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
  tertiary?: boolean;
}

const ButtonLoadingContainer: React.FC<
  Pick<ButtonProps, 'loading' | 'loadingText' | 'secondary'>
> = React.memo(({ loading, loadingText, secondary }) => {
  return (
    <Show show={!!loading}>
      <div className="c-btn-loading-ctr">
        <p>{loadingText}</p>
        <Spinner show dark={secondary} />
      </div>
    </Show>
  );
});

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
      if (type === 'button') event.preventDefault();
      if (disabled) return;
      if (onClick) onClick(event);

      if (href) {
        if (!href?.startsWith('http')) href = `http://${href}`;
        // If the browser is Safari, just change the location of the current
        // tab, but if not, open a new window with the URL.
        if (navigator.vendor === 'Apple Computer, Inc.' || !openTab) {
          window.location.href = href;
        } else window.open(href);
      }
    };

    const css = cx('c-btn', {
      'c-btn--fill': fill,
      'c-btn--fit': fit,
      'c-btn--lg': large,
      'c-btn--primary': primary,
      'c-btn--secondary': secondary,
      'c-btn--secondary--red': red,
      'c-btn--tertiary': tertiary,
      [className]: className
    });

    return (
      <button
        ref={ref}
        className={css}
        disabled={disabled}
        type={type ?? 'button'}
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
