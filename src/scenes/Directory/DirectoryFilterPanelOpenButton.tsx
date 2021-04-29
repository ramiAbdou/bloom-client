import React from 'react';
import { IoFilter } from 'react-icons/io5';

import Button from '@components/atoms/Button/Button';
import { showPanel } from '@components/organisms/Panel/Panel.state';
import { PanelType } from '@components/organisms/Panel/Panel.types';
import useTooltip from '@hooks/useTooltip';

const DirectoryFilterPanelOpenButton: React.FC = () => {
  const ref: React.MutableRefObject<HTMLElement> = useTooltip('Filter');

  const onClick = (): void => {
    showPanel({ id: PanelType.FILTER_DIRECTORY });
  };

  return (
    <Button
      ref={ref}
      className="ml-auto o-table-action o-table-filter-active-tag"
      id={PanelType.FILTER_DIRECTORY}
      onClick={onClick}
    >
      <IoFilter />
    </Button>
  );
};

export default DirectoryFilterPanelOpenButton;
