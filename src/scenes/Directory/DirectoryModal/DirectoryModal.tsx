import React from 'react';

import Separator from '@atoms/Separator';
import { IdProps } from '@constants';
import QuestionValueList, {
  QuestionValueItemProps
} from '@molecules/QuestionValueList';
import Modal from '@organisms/Modal/Modal';
import { IMemberData, IQuestion } from '@store/entities';
import { useStoreState } from '@store/Store';
import DirectoryCard from '../DirectoryCard/DirectoryCard.store';
import UserInformationContainer from './UserInformation';

const DirectoryModalData: React.FC = () => {
  const data = DirectoryCard.useStoreState((store) => store.data);

  const items: QuestionValueItemProps[] = useStoreState(({ db }) => {
    const { byId: byQuestionId } = db.entities.questions;
    return db.community?.questions.map((questionId: string) => {
      const { id, title, type }: IQuestion = byQuestionId[questionId];

      const value = data?.find(({ question }: IMemberData) => {
        return id === question;
      })?.value;

      return { title, type, value };
    });
  });

  if (items.every(({ value }) => value === undefined)) return null;

  return (
    <>
      <Separator marginBottom={24} />
      <QuestionValueList handleNull="HIDE_ALL" items={items} />
    </>
  );
};

const DirectoryModal: React.FC<IdProps> = ({ id }) => (
  <Modal className="s-directory-modal" id={id}>
    <UserInformationContainer />
    <DirectoryModalData />
  </Modal>
);

export default DirectoryModal;
