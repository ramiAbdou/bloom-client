import React, {
  ButtonHTMLAttributes,
  forwardRef,
  MutableRefObject,
  useEffect,
  useState
} from 'react';

import Spinner from '@components/Loader/Spinner';
import { makeClass } from '@util/util';

export interface ButtonProps
  extends Partial<ButtonHTMLAttributes<HTMLButtonElement>> {
  href?: string;
  fill?: boolean;
  fit?: boolean;
  loading?: boolean;
  loadingText?: string;
  large?: boolean;
  outline?: boolean;
  primary?: boolean;
  underline?: boolean;
}

/**
 * Returns true if the Button's loading state should be shown, and false
 * otherwise. Ensures that the loading state of a Button doesn't show unless
 * the operation takes more than 100ms.
 */
const useLoadingState = (loading: boolean): boolean => {
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

const LoadingState = ({
  loadingText,
  outline
}: Pick<ButtonProps, 'loadingText' | 'outline'>) => (
  <div className="c-btn-loading-ctr">
    <p>{loadingText}</p>
    <Spinner dark={outline} />
  </div>
);

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
      outline,
      primary,
      type,
      underline,
      ...props
    }: ButtonProps,
    ref: MutableRefObject<any>
  ) => {
    // If the button is in it's loading state, it should be disabled.
    const showLoadingState = useLoadingState(loading) && !!loadingText;
    disabled = disabled || showLoadingState;

    const onButtonClick = (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      if (type === 'button') event.preventDefault();
      if (disabled || !onClick) return;
      onClick(null);
    };

    const css = makeClass([
      'c-btn',
      [large, 'c-btn--lg'],
      [fill, 'c-btn--fill'],
      [fit, 'c-btn--fit'],
      [primary, 'c-btn-primary'],
      [outline, 'c-btn-outline'],
      [underline, 'c-btn-underline'],
      className
    ]);

    return (
      <button
        ref={ref}
        className={css}
        disabled={disabled}
        type={type ?? 'button'}
        onClick={onButtonClick}
        {...props}
      >
        {showLoadingState && (
          <LoadingState loadingText={loadingText} outline={outline} />
        )}

        {!showLoadingState && children}
      </button>
    );
  }
);

export default Button;
