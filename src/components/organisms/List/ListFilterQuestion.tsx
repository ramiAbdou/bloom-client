import React from 'react';
import { IoAdd } from 'react-icons/io5';

import Button from '@atoms/Button/Button';
import Checkbox from '@atoms/Checkbox/Checkbox';
import { BaseProps, IdProps } from '@constants';
import Row from '@containers/Row/Row';
import Show from '@containers/Show';
import IdStore from '@store/Id.store';
import { useStoreState } from '@store/Store';
import { cx } from '@util/util';
import ListFilterQuestionStore from './ListFilterQuestion.store';

interface IsOpenProps {
  isOpen: boolean;
}

const ListFilterOptionList: React.FC<BaseProps> = ({ show }) => {
  const questionId: string = IdStore.useStoreState((store) => store.id);

  const options: string[] = useStoreState(
    ({ db }) => db.byQuestionId[questionId]?.options
  );

  const onChange = () => null;

  return (
    <Show show={show}>
      <ul className="my-xs">
        {options.map((option: string) => {
          return <Checkbox key={option} title={option} onChange={onChange} />;
        })}
      </ul>
    </Show>
  );
};

const ListFilterQuestionHeader: React.FC<IsOpenProps> = ({ isOpen }) => {
  const questionId: string = IdStore.useStoreState((store) => store.id);

  const title: string = useStoreState(
    ({ db }) => db.byQuestionId[questionId]?.title
  );

  const onTertiaryClick = () => {};

  return (
    <Row className="w-fill" justify="sb">
      <h4>{title}</h4>
      {!isOpen && <IoAdd />}

      <Button stopPropagation tertiary show={isOpen} onClick={onTertiaryClick}>
        Done
      </Button>
    </Row>
  );
};

const ListFilterQuestionContent: React.FC = () => {
  const isOpen = ListFilterQuestionStore.useStoreState((state) => state.isOpen);

  const setIsOpen = ListFilterQuestionStore.useStoreActions(
    (state) => state.setIsOpen
  );

  const onClick = () => !isOpen && setIsOpen(!isOpen);

  const css = cx('o-list-filter-question', {
    'o-list-filter-question--active': isOpen
  });

  return (
    <div className={css} onClick={onClick}>
      <ListFilterQuestionHeader isOpen={isOpen} />
      <ListFilterOptionList show={isOpen} />
    </div>
  );
};

const ListFilterQuestion: React.FC<IdProps> = ({ id: questionId }) => {
  return (
    <IdStore.Provider runtimeModel={{ id: questionId }}>
      <ListFilterQuestionStore.Provider>
        <ListFilterQuestionContent />
      </ListFilterQuestionStore.Provider>
    </IdStore.Provider>
  );
};

export default ListFilterQuestion;
