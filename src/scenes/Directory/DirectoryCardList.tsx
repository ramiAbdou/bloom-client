import React from 'react';

import MasonryList from '@components/organisms/List/MasonryList';
import { IMember } from '@core/db/db.entities';
import DirectoryCard from './DirectoryCard/DirectoryCard';

interface DirectoryCardListProps {
  data: IMember[];
}

const DirectoryCardList: React.FC<DirectoryCardListProps> = ({
  data: members
}) => (
  <MasonryList
    className="s-directory-card-ctr"
    items={members}
    render={DirectoryCard}
  />
);

export default DirectoryCardList;
