import { useState } from 'react';
import { createContainer } from 'react-tracked';

interface IdState {
  id: string;
}

const useIdValue = ({ id }: IdState) => useState<IdState>({ id });

export const {
  Provider: IdProvider,
  useSelector: useIdSelector
} = createContainer(useIdValue);

export const useId = (): string => useIdSelector((state: IdState) => state.id);
