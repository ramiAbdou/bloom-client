import React, {
  ButtonHTMLAttributes,
  forwardRef,
  MutableRefObject,
  useEffect,
  useState
} from 'react';

import Spinner from '@components/Loader/Spinner';
import { cx } from '@util/util';

export interface ButtonProps
  extends Partial<ButtonHTMLAttributes<HTMLButtonElement>> {
  href?: string;
  fill?: boolean;
  fit?: boolean;
  loading?: boolean;
  loadingText?: string;
  large?: boolean;
  secondary?: boolean;
  primary?: boolean;
  tertiary?: boolean;
}

/**
 * Returns true if the Button's loading state should be shown, and false
 * otherwise. Ensures that the loading state of a Button doesn't show unless
 * the operation takes more than 100ms.
 */
const useIsLoading = (loading: boolean): boolean => {
  const [showLoadingState, setShowLoadingState] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (!loading && showLoadingState) setShowLoadingState(false);
    else {
      timeout = setTimeout(() => {
        if (loading && !showLoadingState) setShowLoadingState(true);
      }, 100);
    }

    return () => clearTimeout(timeout);
  }, [loading, showLoadingState]);

  return showLoadingState;
};

const LoadingContainer = ({
  loading,
  loadingText,
  secondary
}: Pick<ButtonProps, 'loading' | 'loadingText' | 'secondary'>) => {
  if (!loading) return null;

  return (
    <div className="c-btn-loading-ctr">
      <p>{loadingText}</p>
      <Spinner dark={secondary} />
    </div>
  );
};

const Button = forwardRef(
  (
    {
      className,
      children,
      disabled,
      fill,
      fit,
      large,
      loading,
      loadingText,
      onClick,
      primary,
      secondary,
      type,
      tertiary,
      ...props
    }: ButtonProps,
    ref: MutableRefObject<any>
  ) => {
    // If the button is in it's loading state, it should be disabled.
    const showSpinner = useIsLoading(loading) && !!loadingText;
    disabled = disabled || showSpinner;

    const onButtonClick = (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      if (type === 'button') event.preventDefault();
      if (disabled || !onClick) return;
      onClick(null);
    };

    const css = cx({
      'c-btn': true,
      'c-btn--fill': fill,
      'c-btn--fit': fit,
      'c-btn--lg': large,
      'c-btn--primary': primary,
      'c-btn--secondary': secondary,
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
        <LoadingContainer
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
