import React from 'react';

interface SidebarSectionContainerProps {
  title: string;
}

const SidebarSectionContainer: React.FC<SidebarSectionContainerProps> = ({
  children,
  title
}) => (
  <div className="mt-sm mr-ss">
    <h5 className="c-gray-3 mb-xs ml-sm">{title}</h5>
    <ul>{children}</ul>
  </div>
);

export default SidebarSectionContainer;
