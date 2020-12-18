import React, {
  forwardRef,
  MutableRefObject,
  useEffect,
  useState
} from 'react';

import Spinner from '@components/Loader/Spinner';
import { makeClass } from '@util/util';
import { ButtonProps } from './Button.types';

/**
 * Returns true if the Button's loading state should be shown, and false
 * otherwise. Ensures that the loading state of a Button doesn't show unless
 * the operation takes moer than 100ms.
 */
const useLoadingState = (loading: boolean): boolean => {
  const [showLoadingState, setShowLoadingState] = useState(false);

  useEffect(() => {
    if (!loading && showLoadingState) setShowLoadingState(false);
    else {
      setTimeout(() => {
        if (loading && !showLoadingState) setShowLoadingState(true);
      }, 100);
    }
  }, [loading, showLoadingState]);

  return showLoadingState;
};

const LoadingState = ({ loadingText }: Pick<ButtonProps, 'loadingText'>) => (
  <div className="c-btn-loading-ctr">
    <p>{loadingText}</p>
    <Spinner />
  </div>
);

export default forwardRef(
  (
    {
      className,
      children,
      disabled,
      fill,
      large,
      loading,
      loadingText,
      onClick,
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
      if (props.type === 'button') event.preventDefault();
      if (disabled || !onClick) return;
      onClick(null);
    };

    const css = makeClass([
      'c-btn',
      [large, 'c-btn--lg'],
      [fill, 'c-btn--fill'],
      className
    ]);

    return (
      <button
        ref={ref}
        className={css}
        disabled={disabled}
        onClick={onButtonClick}
        {...props}
      >
        {showLoadingState && <LoadingState loadingText={loadingText} />}
        {!showLoadingState && children}
      </button>
    );
  }
);
