/**
 * @fileoverview Component: ScreenHeader
 * - In a Flow, this is the header of the screen which includes a back button,
 * title and a next button.
 * @author Rami Abdou
 */

import { useStoreState } from 'easy-peasy';
import React from 'react';
import { IoMdArrowBack } from 'react-icons/io';

import PrimaryButton from '@components/Button/PrimaryButton';
import Form from '@components/Form/Form.store';
import { useStoreActions } from '@store/Store';

// This header is common for both the ScreenEditor and the ModalEditor, so we
// follow DRY by keeping it here.

type BackButtonProps = { onPreviousClick?: VoidFunction };

const BackButton = ({ onPreviousClick }: BackButtonProps) => {
  const currentScreen = useStoreState(({ flow }) => flow.currentScreen);
  const closeFlow = useStoreActions(({ flow }) => flow.closeFlow);
  const goBack = useStoreActions(({ flow }) => flow.goBack);

  const onClick = () => {
    if (onPreviousClick) onPreviousClick();

    // After the given onPreviousClick is executed if it is specified, then
    // either close the flow if there's no other screens or just go back one
    // screen.
    if (!currentScreen) closeFlow();
    else goBack();
  };

  return (
    <button className="c-screen__hdr-btn--back" onClick={onClick}>
      <IoMdArrowBack />
    </button>
  );
};

type TitleProps = { title: string };

const Title = ({ title }: TitleProps) => <h4>{title}</h4>;

type NextButtonProps = {
  buttonText: string;
  onNextClick?: VoidFunction;
};

const NextButtonContent = ({ buttonText, onNextClick }: NextButtonProps) => {
  const currentScreen = useStoreState(({ flow }) => flow.currentScreen);
  const closeFlow = useStoreActions(({ flow }) => flow.closeFlow);
  const goForward = useStoreActions(({ flow }) => flow.goForward);
  const screens = useStoreState(({ flow }) => flow.screens);
  const isCompleted = Form.useStoreState((store) => store.isCompleted);
  const submitForm = Form.useStoreActions((store) => store.submitForm);

  const onClick = async () => {
    // After the given onNextClick is executed if it is specified, then
    // either close the flow if there's no other screens or just go forward one
    // screen.
    if (currentScreen === screens.length - 1) {
      // @ts-ignore b/c we know submitForm is callable.
      await submitForm();
      closeFlow();
    } else goForward();

    if (onNextClick) onNextClick();
  };

  return (
    <PrimaryButton
      disabled={!isCompleted}
      title={buttonText}
      onClick={onClick}
    />
  );
};

const NextButton = (props: NextButtonProps) => <NextButtonContent {...props} />;

export interface ScreenHeaderProps
  extends BackButtonProps,
    TitleProps,
    NextButtonProps {}

export default ({
  buttonText,
  onNextClick,
  onPreviousClick,
  title
}: ScreenHeaderProps) => (
  <div className="c-flow__hdr">
    <BackButton onPreviousClick={onPreviousClick} />
    <Title title={title} />
    <NextButton buttonText={buttonText} onNextClick={onNextClick} />
  </div>
);
